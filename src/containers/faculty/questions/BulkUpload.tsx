"use client";

import { Button } from "@/components/ui/button";
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
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { upload_exam_questions } from "@/lib/server_api/faculty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import React from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const uploadForm = z.object({
  file: z.instanceof(File).refine((file) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    return allowedTypes.includes(file.type);
  }, "File must be CSV or Excel (.xls, .xlsx)"),
});

function BulkUpload({ exam_type_id }: { exam_type_id: number }) {
  const form = useForm<z.infer<typeof uploadForm>>({
    resolver: zodResolver(uploadForm),
  });

  const query_client = useQueryClient();

  async function handleUpload(values: z.infer<typeof uploadForm>) {
    const response = await upload_exam_questions(exam_type_id, values.file);
    if (response.status) {
      toast.success("Questions uploaded successfully");
      query_client.invalidateQueries({
        queryKey: ["faculty", "exam_types", exam_type_id, "questions"],
      });
    } else {
      toast.error("Failed to upload questions: " + response.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload />
          <span>Bulk Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleUpload)}>
          <DialogHeader>
            <DialogTitle>Bulk Upload Questions</DialogTitle>
            <DialogDescription>
              Upload questions from a CSV or Excel file.
            </DialogDescription>
            <Controller
              control={form.control}
              name="file"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mt-4">
                  <Input
                    aria-invalid={fieldState.invalid}
                    type="file"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BulkUpload;
