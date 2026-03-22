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
import { delete_cohort } from "@/lib/server_api/faculty";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function DeleteModal({
  cohort_id,
  variant = "default",
}: {
  cohort_id: number;
  variant?: "default" | "icon";
}) {
  const queryClient = useQueryClient();

  const delete_mutate = useMutation({
    mutationFn: delete_cohort,
  });

  function onDelete() {
    toast.promise(
      () =>
        delete_mutate.mutateAsync(cohort_id).then((response) => {
          if (response.status) {
            queryClient.invalidateQueries({
              queryKey: ["faculty", "cohorts"],
            });
            return response.message;
          } else {
            return new Error(response.message);
          }
        }),
      {
        loading: "Deleting Cohort...",
        success: (res) => res,
        error: (res) => res,
      },
    );
  }
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
            This action cannot be undone. This will permanently delete cohort
            and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" type="button" onClick={onDelete}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
