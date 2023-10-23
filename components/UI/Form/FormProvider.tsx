import { FormProvider as Form } from "react-hook-form";

import type { FormEvent, ReactNode } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const FormProvider = <T extends FieldValues>({ methods, children, onSubmit }: Props<T>) => (
  <Form {...methods}>
    <form onSubmit={onSubmit}>{children}</form>
  </Form>
);
