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
import { publish_exam } from "@/lib/server_api/faculty";
import { toast } from "sonner";

export default function PublishDialog({ exam_id }: { exam_id: number }) {
  async function onPublish() {
    const response = await publish_exam({ exam_id });
    if (response.status) {
      toast.success(response.message || "Exam published successfully");
    } else {
      toast.error(response.message || "Failed to publish exam");
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">Publish Exam</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Exam</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to publish this exam? Once published, students
            will be able to access it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onPublish}>Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
