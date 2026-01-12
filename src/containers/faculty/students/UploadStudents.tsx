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
import {
  upload_department_students,
  upload_exam_questions,
} from "@/lib/server_api/faculty";
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

function UploadStudents() {
  const closeBtn = React.useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof uploadForm>>({
    resolver: zodResolver(uploadForm),
  });

  const query_client = useQueryClient();

  async function handleUpload(values: z.infer<typeof uploadForm>) {
    closeBtn.current?.click();
    toast.promise(
      () => {
        return upload_department_students(values.file).then((response) => {
          if (response.status) {
            query_client.invalidateQueries({
              queryKey: ["faculty", "students"],
            });

            return response.message;
          }

          return new Error(response.message);
        });
      },
      {
        loading: "Uploading students...",
        success: (message) => message,
        error: (err) => "Error: " + err.message,
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload />
          <span>Upload Students</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Students</DialogTitle>
          <DialogDescription>
            Upload students from a CSV or Excel file.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleUpload)}>
          <Controller
            control={form.control}
            name="file"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  aria-invalid={fieldState.invalid}
                  type="file"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" ref={closeBtn}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadStudents;
