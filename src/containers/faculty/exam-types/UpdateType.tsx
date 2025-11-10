import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Edit, Plus } from 'lucide-react'

import React from "react";
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

function UpdateType() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Exam Type</DialogTitle>
            <DialogDescription>
                Modify the exam type details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Exam Type Name</Label>
              <Input id="name" name="name" placeholder="e.g., Verbal, Technical, Reasoning, etc" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Type your description here." />
            </div>
            <div className="grid gap-3">
                <div className="flex items-start gap-3">
                    <Checkbox id="is_private" />
                    <div className="grid gap-2">
                        <Label htmlFor="is_private">Is Private</Label>
                        <p className="text-muted-foreground text-sm">
                            If enabled, this exam type will only be visible to you.
                        </p>
                    </div>
                </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default UpdateType;
