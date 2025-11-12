import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Upload } from 'lucide-react'
import React from 'react'
import { Form, useForm } from 'react-hook-form'

function BulkUpload() {

    const form = useForm({

    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Upload />
                    <span>Bulk Upload</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bulk Upload Questions</DialogTitle>
                    <DialogDescription>Upload questions from a CSV file.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button type='submit'>Upload</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BulkUpload