"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Plus } from "lucide-react";

import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { create_exam_type, update_exam_type } from "@/lib/server_api/faculty";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const addTypeSchema = z.object({
  name: z.string().min(1, "Exam type name is required"),
  description: z
    .string()
    .transform((val) => val ?? "")
    .nullable()
    .optional(),
  is_private: z.boolean().nullable(),
});

function AddType({
  children,
  defaultValues,
  update_id,
}: {
  children: React.ReactNode;
  defaultValues?: Partial<z.infer<typeof addTypeSchema>>;
  update_id?: number;
}) {
  const queryClient = useQueryClient();
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  const createMutate = useMutation({
    mutationFn: create_exam_type,
  });

  const updateMutate = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: z.infer<typeof addTypeSchema>;
    }) => update_exam_type(id, data),
  });

  const form = useForm<z.infer<typeof addTypeSchema>>({
    resolver: zodResolver(addTypeSchema),
    defaultValues: {
      ...defaultValues,
      is_private: defaultValues?.is_private ? true : false,
    },
  });

  async function addExamType(values: z.infer<typeof addTypeSchema>) {
    toast.promise(
      () =>
        createMutate.mutateAsync(values).then((response) => {
          if (response.status) {
            queryClient.invalidateQueries({
              queryKey: ["faculty", "exam-types"],
            });
            form.reset();

            cancelBtnRef.current?.click();
            return response.message;
          }

          throw new Error(response.message);
        }),
      {
        loading: "Creating exam type...",
        success: (message) => message || "Exam type created successfully",
        error: (err) => "Error: " + (err.message || "Something went wrong"),
      },
    );
  }

  async function updateExamType(values: z.infer<typeof addTypeSchema>) {
    toast.promise(
      () =>
        updateMutate
          .mutateAsync({
            id: parseInt(update_id as unknown as string),
            data: values,
          })
          .then((response) => {
            if (response.status) {
              queryClient.invalidateQueries({
                queryKey: ["faculty", "exam-types"],
              });
              form.reset();
              cancelBtnRef.current?.click();
              return response.message;
            }

            throw new Error(response.message);
          }),
      {
        loading: "Updating exam type...",
        success: (message) => message || "Exam type updated successfully",
        error: (err) => "Error: " + (err.message || "Something went wrong"),
      },
    );
  }

  function handleSubmit(values: z.infer<typeof addTypeSchema>) {
    if (defaultValues) {
      updateExamType(values);
    } else {
      addExamType(values);
    }
  }

  return (
    <Dialog>
      <Form {...form}>
        <DialogTrigger asChild>
          {/* <Button variant="default">
            <Plus /> Add Exam Type
          </Button> */}
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <DialogHeader>
              <DialogTitle>
                {update_id ? "Update" : "Add"} Exam Type
              </DialogTitle>
              <DialogDescription>
                Create / Update exam type for organizing your questions and
                exams
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Exam Type Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="is_private"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id={field.name}
                  />
                  <FieldLabel htmlFor={field.name}>
                    <div>
                      Is Private
                      <p className="text-muted-foreground text-sm">
                        If enabled, this exam type will only be visible to you.
                      </p>
                    </div>
                  </FieldLabel>
                </Field>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" ref={cancelBtnRef}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={updateMutate.isPending || createMutate.isPending}
              >
                {(updateMutate.isPending || createMutate.isPending) && (
                  <Loading />
                )}{" "}
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

export default AddType;
