"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { create_cohort, update_cohort } from "@/lib/server_api/faculty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const cohortSchema = z.object({
  cohort_name: z.string().min(1, "Cohort Name is required"),
});

export default function FormCard({
  defaultValues,
  cohort_id,
}: {
  defaultValues?: any;
  cohort_id?: number;
}) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(cohortSchema),
    defaultValues,
  });

  const create_mutation = useMutation({
    mutationFn: create_cohort,
  });

  const update_mutation = useMutation({
    mutationFn: update_cohort,
  });

  function onSubmit(data: z.infer<typeof cohortSchema>) {
    if (cohort_id) {
      toast.promise(
        () =>
          update_mutation.mutateAsync({ ...data, cohort_id }).then((res) => {
            if (res.status) {
              return res.message || "Cohort updated successfully";
            } else {
              return new Error(res.message);
            }
          }),
        {
          loading: "Updating Cohort...",
          success: (res: any) => {
            queryClient.invalidateQueries({
              queryKey: ["faculty", "cohorts"],
            });
            return res;
          },
          error: (err) => err.message,
        },
      );
    } else {
      toast.promise(
        () =>
          create_mutation.mutateAsync(data).then((res) => {
            if (res.status) {
              queryClient.invalidateQueries({
                queryKey: ["faculty", "cohorts"],
              });
              console.log(res.message);
              return res.message || "Cohort created successfully";
            } else {
              return new Error(res.message);
            }
          }),
        {
          loading: "Creating Cohort...",
          success: (res: any) => res,
          error: (err) => err.message,
        },
      );
    }
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <FieldGroup>
            <Controller
              control={form.control}
              name="cohort_name"
              defaultValue=""
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="cohort_name">Cohort Name</FieldLabel>
                  <Input
                    id="cohort_name"
                    placeholder="Enter Cohort Name"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>
      <Button className="float-right" type="submit">
        Submit
      </Button>
    </form>
  );
}
