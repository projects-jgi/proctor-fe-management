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
import { Edit, Plus } from "lucide-react";

import React from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { create_exam_type } from "@/lib/server_api/faculty";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";

const addTypeSchema = z.object({
  name: z.string().min(1, "Exam type name is required"),
  description: z.string().min(1, "Description is required"),
  is_private: z.boolean().optional(),
});

function UpdateType({
  defaultValues,
}: {
  defaultValues: Partial<z.infer<typeof addTypeSchema>>;
}) {
  const queryClient = useQueryClient();

  const submitMutate = useMutation({
    mutationFn: async (values: z.infer<typeof addTypeSchema>) => {
      const response = await create_exam_type(values);
      if (response.status) {
        queryClient.invalidateQueries({
          queryKey: ["faculty", "exam-types"],
        });
        return response.data;
      } else {
        throw new Error(response.message);
      }
    },
    onSuccess: (data) => {
      toast.success("Exam type updated successfully");
    },
    onError: (error: any) => {
      toast.error("Error: " + error);
    },
  });

  const form = useForm<z.infer<typeof addTypeSchema>>({
    resolver: zodResolver(addTypeSchema),
    defaultValues: {
      ...defaultValues,
      is_private: defaultValues.is_private ? true : false,
    },
  });

  async function handleSubmit(values: z.infer<typeof addTypeSchema>) {
    submitMutate.mutate(values);
  }

  return (
    <Dialog>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <DialogHeader>
              <DialogTitle>Update Exam Type</DialogTitle>
              <DialogDescription>
                Update an existing exam type for organizing your questions and
                exams
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Exam Type Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      {...field}
                      placeholder="e.g., Verbal, Technical, Reasoning, etc"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      onChange={field.onChange}
                      placeholder="Type your description here."
                      defaultValue={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_private"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Checkbox
                      defaultChecked={field.value}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="is_private"
                    />
                  </FormControl>
                  <FormLabel htmlFor="is_private">
                    <div>
                      Is Private
                      <p className="text-muted-foreground text-sm">
                        If enabled, this exam type will only be visible to you.
                      </p>
                    </div>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={submitMutate.isPending}>
                {submitMutate.isPending && <Loading />} Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

export default UpdateType;
