'use client';

import React, { useState } from 'react'
import { get_exam_violations } from '@/lib/server_api/faculty'
import { Query, useQuery, UseQueryResult } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pause, Play, RefreshCcw, TriangleAlert, Wifi, WifiOff } from 'lucide-react';
import { StudentExamAttemppt, StudentExamAttemptViolation, StudentUser } from '@/types/users';
import { Exam } from '@/types/exam';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type ViolationResponse = StudentExamAttemppt & {
    violations: StudentExamAttemptViolation[],
    student_user: StudentUser,
    exam: Exam
}

function PageContainer({ exam_id }: { exam_id: number }) {
    const [refreshInterval, setRefreshInterval] = useState<number | false>(10000);
    const violations: UseQueryResult<ViolationResponse[]> = useQuery({
        queryKey: ['faculty', 'exams', exam_id, 'violations'],
        queryFn: async() => {
            const response = await get_exam_violations({ exam_id });
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.message);
            }
        },
        refetchInterval: refreshInterval,
        refetchIntervalInBackground: true
    })

    function onRefreshIntervalChange(value: string){
        let number = Number(value);
        if(number > 0){
            setRefreshInterval(number);
        }else{
            setRefreshInterval(false)
        }
    }

    function toggleAutoRefresh(){
        if(refreshInterval){
            setRefreshInterval(false);
        }else{
            setRefreshInterval(10000);
        }
    }

  return (
        <div className='my-8 space-y-4'>
            <Card className='text-card-foreground border-l-4 border-l-gradient-to-r bg-gradient-to-r from-purple-500 to-blue-500 dark:from-blue-950 dark:to-purple-950'>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8 text-sm">
                            {refreshInterval ? (
                                <Badge variant="success">
                                    <Wifi />
                                    Connected
                                </Badge>
                            ) : (
                                <Badge variant="destructive">
                                    <WifiOff />
                                    Disonnected
                                </Badge>
                            )}
                            <div className="flex gap-2 items-center text-white">
                                <div className={cn('inline-block', refreshInterval && 'animate-spin')}>
                                    <RefreshCcw size={15} className='text-primary' />
                                </div>
                                <span>Auto-refresh: <span className='text-primary'>{refreshInterval ? 'ON' : 'OFF'}</span></span>
                            </div>
                            <p className='text-muted dark:text-muted-foreground'>
                                Last updated: {violations.dataUpdatedAt && new Date(Number(violations.dataUpdatedAt)).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className='flex items-center gap-8'>
                            <Select value={refreshInterval ? String(refreshInterval) : undefined} onValueChange={onRefreshIntervalChange} disabled={!refreshInterval}>
                                <SelectTrigger className="bg-secondary">
                                    <SelectValue placeholder="select a time"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='5000' defaultChecked>5s</SelectItem>
                                        <SelectItem value='10000' defaultChecked>10s</SelectItem>
                                        <SelectItem value='30000' defaultChecked>30s</SelectItem>
                                        <SelectItem value='60000' defaultChecked>1m</SelectItem>
                                        <SelectItem value='300000' defaultChecked>5m</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={toggleAutoRefresh}>
                                {refreshInterval ? <Pause /> : <Play />}
                                {refreshInterval ? 'Pause' : 'Resume'}
                            </Button>
                            <Button variant="outline" onClick={() => violations.refetch()}>
                                <RefreshCcw />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Violation Reports
                        <Badge variant={'destructive'} className='ml-2 rounded'>{violations.data ? violations.data.length : 0}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {violations.isLoading && <div className='text-center text-muted-foreground text-sm'>Loading violations...</div>}
                    {violations.isError && <div className='text-center text-muted-foreground text-sm'>Error loading violations: {violations.error?.message}</div>}
                    {violations.data && violations.data.length === 0 && <div className='text-center text-muted-foreground text-sm'>No violations found for this exam.</div>}

                    {violations.data && violations.data.map((violation: ViolationResponse, index: number) => (
                        <Card className='mb-4' key={index}>
                            <CardHeader>
                                <CardTitle>
                                    <span className='me-2'>{violation.student_user.id} - {violation.student_user.name}</span>
                                    <Badge variant={violation.ended_at ? "success" : "warning"}>{violation.ended_at ? 'Submitted' : "Ongoing"}</Badge>
                                </CardTitle>
                                <CardDescription>{violation.exam.name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {violation.violations.map((violationDetail: StudentExamAttemptViolation, index: number) => (
                                    <div className="flex justify-between items-start mb-4" key={index}>
                                        <div className='flex items-center gap-4'>
                                            <TriangleAlert size={20} className='text-destructive' />
                                            <div>
                                                <p className='text-sm'>{violationDetail.description}</p>
                                                <p className='text-xs text-muted-foreground underline'>
                                                    <a href={violationDetail.reference_url} target='_blank'>{violationDetail.reference_url}</a>
                                                </p>
                                            </div>
                                        </div>
                                        <Badge>High</Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
  )
}

export default PageContainer