"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import {
  create_exam,
  create_exam_type_mapping,
  get_exam_types,
} from "@/lib/server_api/faculty";
import { ExamType } from "@/types/exam";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Percent } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { fi } from "zod/v4/locales";

const examSchema = z.object({
  name: z.string().min(1, "Exam title is required"),
  description: z.string().min(1, "Description is required"),
  exam_types: z.array(z.string()).optional(),
  duration_in_minutes: z.coerce
    .number()
    .min(1, "Duration must be at least 1 minute"),
  start_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time",
  }),
  end_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid end time",
  }),
  max_violation_count: z.coerce
    .number()
    .min(1, "Max violation must be at least 1"),
  passing_percentage: z.coerce.number().min(0).max(100),
  instructions: z.string().optional(),
  show_answers: z.coerce.boolean().default(true),
  is_proctored: z.boolean().default(true),
  // TODO: Add max_attempt field
});

function toLocalInputFormat(dateString: string) {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function FormCard({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof examSchema>;
}) {
  const [examTypeValues, setExamTypeValues] = useState<string[]>([]);

  const examTypes = useQuery<{ [key: string]: ExamType[] }>({
    queryKey: ["faculty", "exam-types"],
    queryFn: async () => {
      const response = await get_exam_types();
      if (response.status) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    },
  });

  useEffect(() => {
    setExamTypeValues(
      defaultValues?.exam_type_mappings.map((m) => String(m.exam_type_id))
    );
  }, []);

  const form = useForm({
    resolver: zodResolver(examSchema),
    defaultValues: {
      ...defaultValues,
      exam_types: defaultValues?.exam_type_mappings
        ? defaultValues.exam_type_mappings.map((m) => String(m.exam_type_id))
        : [],
      start_time: toLocalInputFormat(defaultValues?.start_time || ""),
      end_time: toLocalInputFormat(defaultValues?.end_time || ""),
      is_proctored: defaultValues ? Boolean(defaultValues.is_proctored) : true,
      show_answers: defaultValues ? Boolean(defaultValues.show_answers) : true,
    },
  });

  async function onSubmit(data: z.infer<typeof examSchema>) {
    console.log(data);

    if (!examTypeValues || examTypeValues.length == 0) {
      console.log("Exam Types: ", examTypeValues);
      form.setError("exam_types", {
        message: "Please select at least one exam type",
      });
      return;
    }

    const exam_type_mappings = [];

    for (const types of data.exam_types || []) {
      // TODO: Replace hardcoded limit_questions_to value
      exam_type_mappings.push({
        exam_type_id: Number(types),
        limit_questions_to: 15,
      });
    }

    data.start_time = new Date(data.start_time).toISOString();
    data.end_time = new Date(data.end_time).toISOString();

    const response = await create_exam(data);
    if (response.status) {
      const exam_id = response.data.id;

      const mapping_response = await create_exam_type_mapping(exam_id, {
        mappings: exam_type_mappings,
      });

      if (!mapping_response.status) {
        toast.error(
          mapping_response.message || "Unable to create exam type mappings"
        );
        return;
      }
      toast.success(response.message || "Exam created successfully");
      form.reset();
    } else {
      toast.error(response.message || "Unable to create exam");
    }
  }

  return (
    <>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="name"
                      aria-invalid={fieldState.invalid}
                    >
                      Exam Title *
                    </FieldLabel>
                    <Input
                      id="name"
                      placeholder="Enter exam title"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="description"
                      aria-invalid={fieldState.invalid}
                    >
                      Description *
                    </FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the exam"
                      rows={3}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      value={field.value}
                    >
                      {/* {field.value} */}
                    </Textarea>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="exam_types"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="exam_types"
                      aria-invalid={fieldState.invalid}
                    >
                      Exam Type Mapping *
                    </FieldLabel>
                    <MultiSelect
                      {...field}
                      values={examTypeValues}
                      onValuesChange={(values) => {
                        setExamTypeValues(values);
                        field.onChange(values);
                      }}
                    >
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Search Exam Type..." />
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        <MultiSelectGroup>
                          {examTypes.data &&
                            Object.values(examTypes.data)
                              .flat()
                              .map((type: ExamType) => (
                                <MultiSelectItem
                                  key={type.id}
                                  value={String(type.id)}
                                >
                                  {type.name}
                                </MultiSelectItem>
                              ))}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exam Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                control={form.control}
                name="duration_in_minutes"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-span-2"
                  >
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor="duration_in_minutes"
                    >
                      Duration (minutes) *
                    </FieldLabel>
                    <Input
                      id="duration_in_minutes"
                      type="number"
                      min="1"
                      {...field}
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
                name="start_time"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor="start_time"
                    >
                      Start Time *
                    </FieldLabel>
                    <Input
                      id="start_time"
                      aria-invalid={fieldState.invalid}
                      type="datetime-local"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="end_time"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor="end_time"
                    >
                      End Time *
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id="end_time"
                      type="datetime-local"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="max_violation_count"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-span-2"
                  >
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor="max_violation_count"
                    >
                      Max Violation *
                    </FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id="max_violation_count"
                      type="number"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="passing_percentage"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-span-2"
                  >
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor="passing_percentage"
                    >
                      Passing Percentage *
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        aria-invalid={fieldState.invalid}
                        {...field}
                        id="passing_percentage"
                        type="number"
                      />
                      <InputGroupAddon align="inline-end">
                        <Percent />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="instructions"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-span-2"
                  >
                    <FieldLabel
                      htmlFor="instructions"
                      aria-invalid={fieldState.invalid}
                    >
                      Instructions
                    </FieldLabel>
                    <Textarea
                      id="instructions"
                      placeholder="Exam instructions for students"
                      rows={4}
                      aria-invalid={fieldState.invalid}
                      onChange={field.onChange}
                    >
                      {field.value}
                    </Textarea>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                control={form.control}
                name="show_answers"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                    >
                      <Checkbox
                        defaultChecked={true}
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          Show Results Immediately
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Display results after completion
                        </p>
                      </div>
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="is_proctored"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      data-invalid={fieldState.invalid}
                      className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                    >
                      <Checkbox
                        defaultChecked={true}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          Add Proctoring
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Enables proctoring for student exam
                        </p>
                      </div>
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>
        <Button type="submit" className="float-right">
          Submit
        </Button>
      </form>
    </>
  );
}
