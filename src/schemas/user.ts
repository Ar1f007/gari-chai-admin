import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const phoneNumberSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((val) => isValidPhoneNumber(val, "BD"), {
    message: "Please enter a valid Bangladeshi phone number",
  });

const socialProvider = z.object({
  name: z.string(),
  id: z.string(),
  token: z.string(),
  email: z.string().email(),
  username: z.string(),
});

const userLocal = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
});

const UserRoleEnum = z.enum([
  "admin",
  "editor",
  "moderator",
  "super-admin",
  "support",
  "user",
]);

export const userBasicInfoAPIResponseSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  local: userLocal,
  address: z.string().optional(),
  additionalInfo: z
    .object({ email: z.string().optional(), phone: z.string().optional() })
    .optional(),
  social: z.object({ providers: z.array(socialProvider) }),
  role: z.array(UserRoleEnum).default(["user"]),
  isVerified: z.boolean(),
  isAccountActive: z.boolean(),
  isBanned: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  profilePicture: z.string(),
});

export type TAuthBasicUserInfo = z.infer<typeof userBasicInfoAPIResponseSchema>;

// ========================================================
export const userProfileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  additionalInfo: z.object({
    phone: z.optional(
      z.string().refine(
        (val) => {
          if (val.length > 0) {
            return phoneNumberSchema.safeParse(val).success;
          }

          return true;
        },
        {
          message: "Please enter a valid Bangladeshi phone number",
        }
      )
    ),
    email: z.string().refine(
      (val) => {
        if (val.length > 0) {
          return z.string().email().safeParse(val).success;
        } else {
          return true;
        }
      },
      {
        message: "Please enter a valid email address",
      }
    ),
  }),

  address: z.string().optional(),
});

export type TUserProfileSchema = z.infer<typeof userProfileFormSchema>;

// ======================================================
// AUTH
// ======================================================

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

export type LoginSchema = z.infer<typeof loginSchema>;

export type LoginWithEmailSchema = z.infer<typeof loginWithEmailSchema>;
export type LoginWithPhoneSchema = z.infer<typeof loginWithPhoneSchema>;
