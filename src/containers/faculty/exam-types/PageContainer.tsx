import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddType from './AddType'
import UpdateType from './UpdateType'
import { DeleteType } from './DeleteType'
import HeroStats from './HeroStats'

function PageContainer() {
  return (
    <div className='my-8 space-y-4'>
        <section>
            <HeroStats />
        </section>
        <section>
            <div className="flex items-center justify-between">
                <h2 className='text-xl font-semibold'>Manage Exam Types</h2>
                <AddType />
            </div>
            {Array(10).fill(0).map((_, index) => (
                <Card key={index} className='mt-4'>
                    <CardHeader className='gap-6'>
                        <CardTitle>Lorem, ipsum.</CardTitle>
                        <CardAction>
                            <div className="flex items-center gap-2">
                                <UpdateType />
                                <DeleteType />
                            </div>
                        </CardAction>
                        <CardDescription>
                            <div className="flex gap-6 text-sm">
                                <div className=''>
                                    <p className='font-semibold'>Created At</p>
                                    <p>01 Jan 2024</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Status</p>
                                    <p>Active</p>
                                </div>
                                <div>
                                    <p className='font-semibold'>Mode</p>
                                    <p>Private</p>
                                </div>
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </section>
    </div>
  )
}

export default PageContainer