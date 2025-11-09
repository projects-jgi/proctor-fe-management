'use client';

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { get_exam_results } from '@/lib/server_api/faculty';
import { Exam } from '@/types/exam';
import { StudentExamResult, StudentUser } from '@/types/users';
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type StudentExamResultResponse = StudentExamResult & {
    student_user: StudentUser,
    exam: Exam
}

function ResultList({ exam_id }: { exam_id: number }) {
    const results = useQuery({
        queryKey: ["faculty", 'exams', exam_id, 'results'],
        queryFn: async() => {
            const res = await get_exam_results({ exam_id });
            if(res.status){
                return res.data
            }else{
                throw new Error(res.message)
            }
        }
    })

    if(results.isLoading){
        return <div>Loading results...</div>
    }

    if(results.isError){
        return <div>Error loading results: {results.error?.message}</div>
    }
  return (
    <Card>
        <CardHeader>
            <CardTitle>Student Results</CardTitle>
            <CardDescription>View and analyze student performance across your exams</CardDescription>
        </CardHeader>
        <CardContent>
            <Table className='border'>
                <TableHeader>
                    <TableRow className="bg-secondary/50">
                        <TableHead>USN</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Exam</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.data?.map((item: StudentExamResultResponse, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{item.student_user.id}</TableCell>
                            <TableCell>{item.student_user.name}</TableCell>
                            <TableCell>{item.exam.name}</TableCell>
                            <TableCell>{item.obtained_score}/{item.total_score}</TableCell>
                            <TableCell>{item.percentage}</TableCell>
                            <TableCell>{item.result === 1 ? "Passed" : "Failed"}</TableCell>
                            <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                            <TableCell>
                                <Button variant="outline">View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

export default ResultList