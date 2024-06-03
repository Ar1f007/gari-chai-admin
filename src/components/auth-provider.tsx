"use client";

import { Loader2Icon } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSnapshot } from "valtio";
import { toast } from "sonner";
import { z } from "zod";

import {
  LoginSchema,
  LoginWithEmailSchema,
  LoginWithPhoneSchema,
  TAuthBasicUserInfo,
  loginSchema,
  loginWithEmailSchema,
  loginWithPhoneSchema,
} from "@/schemas/user";
import { getUser, login } from "@/services/user";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

import { TApiData, TApiError } from "@/types/others";
import { mapValidationErrors } from "@/utils/mapValidationError";
import TextField from "./form/text-field";
import { userActions, userStore } from "@/store";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userSnap = useSnapshot(userStore);

  const form = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function fetchUser() {
    const user = await getUser();
    userActions.setUser(user);
  }

  async function handleLoginResponse(
    res: TApiError | TApiData<TAuthBasicUserInfo>
  ) {
    if (res.status === "success") {
      userActions.setUser(res.data);
    } else if (res.status === "validationError") {
      mapValidationErrors(res.errors, form);
    } else {
      toast.error(res.message || "Something went wrong");
    }
  }

  function validateUsernameType(username: string): "email" | "phone" | null {
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

  async function onSubmit(data: LoginSchema & { usernameVerify?: string }) {
    // if usernameVerify field is present
    // means some bot has probably filled out the data
    // so we return from here
    if (data?.usernameVerify) return;

    try {
      const method = validateUsernameType(data.username);

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

  if (userSnap.status == "pending") {
    return (
      <div className="min-h-screen bg-card flex justify-center items-center">
        <Loader2Icon
          size={40}
          className="animate-spin"
        />
      </div>
    );
  }

  if (userSnap.status == "loggedIn") {
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
              <TextField
                name="usernameVerify"
                className="hidden"
                label=""
                autoComplete="off"
              />
              <div className="space-y-1">
                <TextField
                  name="username"
                  autoComplete="username"
                  label="Email / Phone"
                />
              </div>
              <div className="space-y-1">
                <TextField
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
                {form.formState.isSubmitting && (
                  <Loader2Icon className="mr-2 animate-spin" />
                )}{" "}
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
