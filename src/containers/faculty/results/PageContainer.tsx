'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { get_all_exams } from "@/lib/server_api/faculty";
import { Department, Exam } from "@/types/exam";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type ExamResponse = Exam & {
    department: Department
}

function exam_type(start_time: string, end_time: string): number{
    const now = new Date();
    const start = new Date(start_time);
    const end = new Date(end_time);

    if(now < start){
        return 0; // Upcoming
    }else if(now >= start && now <= end){
        return 1; // Ongoing
    }else{
        return 2; // Completed
    }
}

function PageContainer() {
    const exams = useQuery({
        queryKey: ["faculty", "exams"],
        queryFn: async () => {
            const response = await get_all_exams();
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.message);
            }
        }
    })

    if(exams.isLoading){
        return <div>Loading exams...</div>;
    }

    if(exams.isError){
        return <div>Error loading exams: {exams.error?.message}</div>;
    }

    return (
        <div className='my-8 space-y-4'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exams.data?.map((exam: ExamResponse, index: number) => {
                    const exam_type_value = exam_type(exam.start_time, exam.end_time);
                    const exam_type_string = exam_type_value === 0 ? "Upcoming" : exam_type_value === 1 ? "Ongoing" : "Completed";
                    
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    <Badge variant={exam_type_value === 0 ? "destructive" : exam_type_value === 1 ? "warning" : "success"}>{exam_type_string}</Badge>
                                </CardTitle>
                                <Button>
                                    <Link href={`/faculty/results/${exam.id}`}>View Result</Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                            <div className="text-2xl font-bold">{exam.name}</div>
                            <p className="text-xs text-muted-foreground">{exam.department.name}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}

export default PageContainer;
