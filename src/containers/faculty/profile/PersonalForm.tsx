"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const PersonlFormSchema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.email({
    pattern:
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@jainuniversity.ac.in$/i,
    message: "Email should be a valid college address",
  }),
});

export default function PersonalForm() {
  const form = useForm({
    resolver: zodResolver(PersonlFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function handleSubmit(data: z.infer<typeof PersonlFormSchema>) {}

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldSet>
        <FieldGroup className="grid grid-cols-2">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  aria-invalid={fieldState.invalid}
                  htmlFor={field.name}
                >
                  Full Name
                </FieldLabel>
                <Input {...field} name="name" id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  aria-invalid={fieldState.invalid}
                  htmlFor={field.name}
                >
                  Email Address
                </FieldLabel>
                <Input {...field} name="email" id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <div className="flex justify-end mt-4">
        <Button>Save Profile</Button>
      </div>
    </form>
  );
}
