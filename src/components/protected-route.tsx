"use client";

import { TAuthBasicUserInfo, phoneNumberSchema } from "@/schemas/user";
import { getUser, login } from "@/services/user";
import { Loader2Icon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { TApiData, TApiError } from "@/types/others";
import { mapValidationErrors } from "@/utils/mapValidationError";
import TextField from "./form/text-field";

let authenticated = true;

export const loginWithEmailSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export const loginWithPhoneSchema = z.object({
  phone: phoneNumberSchema,
  password: z.string().min(1, "Password is required"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Please enter your email or phone number"),
  password: z.string().min(1, "Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export type LoginWithEmailSchema = z.infer<typeof loginWithEmailSchema>;
export type LoginWithPhoneSchema = z.infer<typeof loginWithPhoneSchema>;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<TAuthBasicUserInfo | null>(null);

  const [showLogin, setShowLogin] = useState(false);

  const form = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function fetchUser() {
    try {
      const user = await getUser();

      if (user) {
        setUser(user);
      } else {
        setShowLogin(true);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function handleLoginResponse(
    res: TApiError | TApiData<TAuthBasicUserInfo>
  ) {
    if (res.status === "success") {
      // userActions.setUser(res.data);

      // router.replace(redirectPath());
      setUser(res.data);
      setShowLogin(false);

      return;
    }

    if (res.status === "validationError") {
      mapValidationErrors(res.errors, form);
      return;
    }

    // status is either error or fail, so display the message
    toast.error(res.message || "Something went wrong");
    return;
  }

  function validateUsername(username: string): "email" | "phone" | null {
    const parsedEmail = loginWithEmailSchema.shape.email.safeParse(username);
    const parsedPhone = loginWithPhoneSchema.shape.phone.safeParse(username);

    if (parsedEmail.success) {
      return "email";
    }

    if (parsedPhone.success) {
      return "phone";
    }

    return null;
  }

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      const method = validateUsername(data.username);

      if (!method) {
        form.setError("username", { message: "Invalid email or phone number" });
        return;
      }

      const payload = {
        [method]: data.username,
        password: data.password,
      } as LoginWithEmailSchema | LoginWithPhoneSchema;

      const res = await login({ loginMethod: method, payload });
      handleLoginResponse(res);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (showLogin) {
    return (
      <div className="min-h-screen bg-card flex py-10 lg:py-0 lg:justify-center items-center px-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-5 w-full max-w-lg"
          >
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <TextField name="username" />
                </div>
                <div className="space-y-1">
                  <TextField
                    name="password"
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  size="lg"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="text-lg"
                >
                  {form.formState.isSubmitting ? "Login..." : "Login"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-card flex justify-center items-center">
        <Loader2Icon
          size={40}
          className="animate-spin"
        />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return (
    <div className="min-h-screen bg-card flex py-10 lg:py-0 lg:justify-center items-center px-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-5 w-full max-w-lg"
        >
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <TextField name="username" />
              </div>
              <div className="space-y-1">
                <TextField
                  name="password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                type="submit"
                disabled={form.formState.isSubmitting}
                className="text-lg"
              >
                {form.formState.isSubmitting ? "Login..." : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
