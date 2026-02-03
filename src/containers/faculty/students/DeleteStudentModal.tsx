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
import { delete_student } from "@/lib/server_api/faculty";
import { StudentUser } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteStudentModal({
  variant = "default",
  student_ids,
}: {
  variant?: "default" | "icon";
  student_ids: number[];
}) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: ({ student_ids }: { student_ids: number[] }) =>
      delete_student({ student_ids }),
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
            <b>{student_ids.length}</b> student(s) and remove their data from
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
                      .mutateAsync({ student_ids })
                      .then((response) => {
                        if (response.status) {
                          queryClient.invalidateQueries({
                            queryKey: ["faculty", "students"],
                          });
                          return response.message;
                        }
                        throw new Error(response.message);
                      }),
                  {
                    loading: "Deleting student...",
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
