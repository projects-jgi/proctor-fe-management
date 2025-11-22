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
import { delete_exam_type } from "@/lib/server_api/faculty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteType({ exam_type_id }: { exam_type_id: number }) {
  const queryClient = useQueryClient();

  const deleteMutate = useMutation({
    mutationFn: async ({ exam_type_id }: { exam_type_id: number }) => {
      const response = await delete_exam_type({ exam_type_id });
      if (response.status) {
        return response.message;
      } else {
        return new Error(response.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["faculty", "exam-types"],
      });
      toast.success("Exam type deleted successfully");
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  async function handleDelete() {
    deleteMutate.mutate({ exam_type_id });
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
          <AlertDialogTitle>Delete Exam Type</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "verbal"? This action cannot be
            undone and may affect existing questions and exams.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
