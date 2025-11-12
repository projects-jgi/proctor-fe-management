'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import {z} from 'zod';

const addQuestionSchema = z.object({
    
})

function AddQuestionContainer({ exam_type_id }: { exam_type_id: string }) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(addQuestionSchema),
        defaultValues: {}
    })

    return (
        <div className='my-8 space-y-4'>
            <Button onClick={() => router.back()} variant="outline">
                <MoveLeft /> Back
            </Button>
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Provide the core details for your question</CardDescription>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
            </section>
        </div>
    )
}

export default AddQuestionContainer