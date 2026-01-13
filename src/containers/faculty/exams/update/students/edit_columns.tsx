import { Checkbox } from "@/components/ui/checkbox";
import { StudentUser } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";

export const edit_columns: ColumnDef<StudentUser>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row, getValue }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        value={String(getValue())}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
