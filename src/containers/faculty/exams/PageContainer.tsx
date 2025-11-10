import React from 'react'
import HeroStats from './HeroStats'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Edit, Eye, EyeOff, Globe, Plus } from 'lucide-react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DeleteExam } from './DeleteExam'

function PageContainer() {
    return (
        <div className='my-8 space-y-4'>
            <HeroStats />
            <section>
                <div className="flex justify-between items-center">
                    <h2 className='text-xl font-semibold'>Your Exams</h2>
                    <Button>
                        <Link href={"/faculty/exams/new"} className='inline-flex gap-2 items-center'>
                            <Plus />
                            <span>Create Exam</span>
                        </Link>
                    </Button>
                </div>
                {
                    Array(5).fill(0).map((_, index) => (
                        <Card className='mt-4'>
                            <CardHeader>
                                <div className="flex gap-2 items-center">
                                    <div className="p-2 bg-success text-success-foreground rounded">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <CardTitle className='mb-2'>
                                            first_test
                                        </CardTitle>
                                        <CardDescription>
                                            <Badge>Draft</Badge>
                                        </CardDescription>
                                    </div>
                                </div>
                                <CardAction>
                                    <Button variant="default">Publish</Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-8 items-start text-sm">
                                    <div>
                                        <p className='text-muted-foreground mb-1'>Duration</p>
                                        <p>56 Min</p>
                                    </div>
                                    <div>
                                        <p className='text-muted-foreground mb-1'>Total Students</p>
                                        <p>60</p>
                                    </div>
                                    <div>
                                        <p className='text-muted-foreground mb-1'>Start Date & time</p>
                                        <p>11/04/2023 10:00 AM</p>
                                    </div>
                                    <div>
                                        <p className='text-muted-foreground mb-1'>End Date & time</p>
                                        <p>11/04/2023 11:00 AM</p>
                                    </div>
                                </div>
                                <div className='mt-6 text-sm'>
                                    <div className="flex justify-between">
                                        <p className='text-muted-foreground'>Created At: 11/05/2003</p>
                                        <div className="flex gap-2 items-center">
                                            <Button variant="outline"><Edit /></Button>
                                            <DeleteExam />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </section>
        </div>
    )
}

export default PageContainer