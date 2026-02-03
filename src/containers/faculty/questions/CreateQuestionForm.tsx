"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  create_exam_question,
  update_question,
} from "@/lib/server_api/faculty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { use, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const booleanFromNumber = z.preprocess(
  (val) => (val === 1 ? true : val === 0 ? false : val),
  z.boolean(),
);

const questionSchema = z.object({
  question_text: z
    .string()
    .min(3, "Question text must be at least 3 characters"),
  option_1: z.string().min(1, "At least one option is required"),
  option_2: z
    .string()
    .nullable()
    .transform((val) => val ?? "")
    .optional(),
  option_3: z
    .string()
    .nullable()
    .transform((val) => val ?? "")
    .optional(),
  option_4: z
    .string()
    .nullable()
    .transform((val) => val ?? "")
    .optional(),
  option_5: z
    .string()
    .nullable()
    .transform((val) => val ?? "")
    .optional(),
  is_correct_1: booleanFromNumber,
  is_correct_2: booleanFromNumber,
  is_correct_3: booleanFromNumber,
  is_correct_4: booleanFromNumber,
  is_correct_5: booleanFromNumber,
  explanation_1: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  explanation_2: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  explanation_3: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  explanation_4: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  explanation_5: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  score: z.coerce.number().min(1),
});

const default_values = {
  question_text: "",
  option_1: "",
  option_2: "",
  option_3: "",
  option_4: "",
  option_5: "",
  is_correct_1: false,
  is_correct_2: false,
  is_correct_3: false,
  is_correct_4: false,
  is_correct_5: false,
  explanation_1: "",
  explanation_2: "",
  explanation_3: "",
  explanation_4: "",
  explanation_5: "",
  score: 1,
};

export default function CreateQuestionForm({
  defaultValues = default_values,
  exam_id,
  question_id,
}: {
  defaultValues?: any;
  question_id?: number;
  exam_id: number;
}) {
  const create_mutate = useMutation({
    mutationFn: create_exam_question,
  });

  const update_mutate = useMutation({
    mutationFn: update_question,
  });

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues,
  });

  function updateQuestion(data: z.infer<typeof questionSchema>) {
    toast.promise(
      () =>
        update_mutate
          .mutateAsync({ body: data, question_id: question_id! })
          .then((response) => {
            if (response.status) {
              return response.message;
            } else {
              throw new Error(response.message);
            }
          }),
      {
        loading: "Updating question...",
        success: (message) => message || "Question updated successfully",
        error: (err) => "Error: " + (err.message || "Something went wrong"),
      },
    );
  }

  function createQuestion(data: z.infer<typeof questionSchema>) {
    toast.promise(
      () =>
        create_mutate
          .mutateAsync({ exam_type_id: exam_id, body: data })
          .then((response) => {
            if (response.status) {
              return response.message;
            } else {
              throw new Error(response.message);
            }
          }),
      {
        loading: "Creating question...",
        success: (message) => message || "Question created successfully",
        error: (err) => "Error: " + (err.message || "Something went wrong"),
      },
    );
  }

  async function handleSubmit(data: z.infer<typeof questionSchema>) {
    if (question_id) {
      updateQuestion(data);
    } else {
      createQuestion(data);
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup className="grid grid-cols-1 lg:grid-cols-2">
                <Controller
                  control={form.control}
                  name="question_text"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel aria-invalid={fieldState.invalid}>
                        Question Text
                      </FieldLabel>
                      <Textarea
                        placeholder="Enter the question text here"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.error && (
                        <FieldContent>{fieldState.error.message}</FieldContent>
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="score"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel aria-invalid={fieldState.invalid}>
                        Score
                      </FieldLabel>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Enter the score for this question"
                        aria-invalid={fieldState.invalid}
                        value={field.value as string}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <React.Fragment key={index}>
                  <FieldSet>
                    <FieldLabel>Option {index + 1}</FieldLabel>
                    <FieldGroup>
                      <Controller
                        control={form.control}
                        name={
                          `option_${index + 1}` as keyof z.infer<
                            typeof questionSchema
                          >
                        }
                        render={({ field, fieldState }) => (
                          <Field
                            orientation="vertical"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldLabel aria-invalid={fieldState.invalid}>
                              Option Text
                            </FieldLabel>
                            <Input
                              placeholder="Option Text"
                              aria-invalid={fieldState.invalid}
                              value={
                                field.value == null
                                  ? ""
                                  : (field.value as string)
                              }
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              id={`option_${index + 1}`}
                            />
                            {fieldState.error && (
                              <FieldContent>
                                {fieldState.error.message}
                              </FieldContent>
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={
                          `explanation_${index + 1}` as keyof z.infer<
                            typeof questionSchema
                          >
                        }
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel aria-invalid={fieldState.invalid}>
                              Option explanation
                            </FieldLabel>
                            <Textarea
                              placeholder="Option Explanation"
                              value={
                                field.value === null
                                  ? ""
                                  : (field.value as string)
                              }
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                            ></Textarea>
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={
                          `is_correct_${index + 1}` as keyof z.infer<
                            typeof questionSchema
                          >
                        }
                        render={({ field, fieldState }) => (
                          <Field
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                          >
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              onBlur={field.onBlur}
                            />
                            <FieldLabel
                              htmlFor={`is_correct_${index + 1}`}
                              aria-invalid={fieldState.invalid}
                            >
                              Is Correct
                            </FieldLabel>
                            {fieldState.error && (
                              <FieldError>
                                {fieldState.error.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </FieldSet>
                  <FieldSeparator />
                </React.Fragment>
              ))}
          </FieldGroup>
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              disabled={create_mutate.isPending || update_mutate.isPending}
            >
              {create_mutate.isPending || update_mutate.isPending ? (
                <Loading />
              ) : null}{" "}
              {question_id ? "Update" : "Create"} Question
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
