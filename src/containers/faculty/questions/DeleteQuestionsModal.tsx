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
import {
  delete_exam_question_multiple,
  delete_student,
} from "@/lib/server_api/faculty";
import { StudentUser } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteQuestionsModal({
  variant = "default",
  question_ids,
  exam_id,
}: {
  variant?: "default" | "icon";
  question_ids: number[];
  exam_id: number;
}) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: ({ question_ids }: { question_ids: number[] }) =>
      delete_exam_question_multiple({ question_ids }),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {variant === "icon" ? (
          <Button variant="ghost" className="text-destructive" size="icon">
            <Trash />
          </Button>
        ) : (
          <Button variant="destructive">
            <Trash />
            Delete
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <b>{question_ids.length}</b> question(s) and remove their data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                toast.promise(
                  () =>
                    deleteMutation
                      .mutateAsync({ question_ids })
                      .then((response) => {
                        if (response.status) {
                          queryClient.invalidateQueries({
                            queryKey: [
                              "faculty",
                              "exam_types",
                              exam_id,
                              "questions",
                            ],
                          });
                          return response.message;
                        }
                        throw new Error(response.message);
                      }),
                  {
                    loading: "Deleting questions...",
                    success: (message) => message,
                    error: (err) => "Error: " + err.message,
                  },
                );
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
