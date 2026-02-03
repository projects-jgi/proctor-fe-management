"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { publish_exam, unpublish_exam } from "@/lib/server_api/faculty";
import { useMutation } from "@tanstack/react-query";
import { on } from "events";
import { EyeOff, Globe } from "lucide-react";
import { toast } from "sonner";

export default function PublishDialog({
  exam_id,
  unpublish = false,
}: {
  exam_id: number;
  unpublish?: boolean;
}) {
  const publish_mutate = useMutation({
    mutationFn: publish_exam,
  });

  const unpublish_mutate = useMutation({
    mutationFn: unpublish_exam,
  });

  function onUnpublish() {
    toast.promise(
      () =>
        unpublish_mutate.mutateAsync(exam_id).then((res) => {
          if (res.status) {
            return res.message;
          }

          return new Error(res.message);
        }),
      {
        loading: "Unpublishing exam...",
        success: (msg) => msg,
        error: (err) => err.message,
      },
    );
  }

  function onPublish() {
    toast.promise(
      () =>
        publish_mutate.mutateAsync(exam_id).then((res) => {
          if (res.status) {
            return res.message;
          }

          return new Error(res.message);
        }),
      {
        loading: "Publishing exam...",
        success: (msg) => msg,
        error: (err) => err.message,
      },
    );
  }

  function onSubmit() {
    if (unpublish) {
      onUnpublish();
      return;
    }

    onPublish();
    return;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {unpublish ? (
          <Button variant="outline">
            <EyeOff />
            Unpublish Exam
          </Button>
        ) : (
          <Button variant="default">
            <Globe />
            Publish Exam
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {unpublish ? "Unpublish" : "Publish"} Exam
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {unpublish ? "unpublish" : "publish"} this
            exam? Once {unpublish ? "unpublished" : "published"}, students will{" "}
            {unpublish ? "not be able" : "be able"} to access it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
