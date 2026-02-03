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
import { delete_exam } from "@/lib/server_api/faculty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteExam({ exam_id }: { exam_id: number }) {
  const queryClient = useQueryClient();

  const delete_mutate = useMutation({
    mutationFn: delete_exam,
  });

  function onDelete() {
    toast.promise(
      () =>
        delete_mutate.mutateAsync(exam_id).then((res) => {
          if (res.status) {
            queryClient.invalidateQueries({
              queryKey: ["faculty", "exams"],
            });
            return res.message;
          }

          return new Error(res.message);
        }),
      {
        loading: "Deleting exam...",
        success: (msg) => msg,
        error: (err) => err.message,
      },
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Exam</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "first_test"? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
