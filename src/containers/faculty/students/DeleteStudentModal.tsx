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
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteStudentModal({ student }: { student: StudentUser }) {
  const deleteMutation = useMutation({
    mutationFn: ({ student_id }: { student_id: number }) =>
      delete_student({ student_id }),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete student{" "}
            <b>{student.email}</b> and remove their data from our servers.
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
                      .mutateAsync({ student_id: student.id })
                      .then((response) => {
                        if (response.status) {
                          return response.message;
                        }
                        throw new Error(response.message);
                      }),
                  {
                    loading: "Deleting student...",
                    success: (message) => message,
                    error: (err) => "Error: " + err.message,
                  }
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
