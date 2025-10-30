import React from 'react'
import HeroStats from './HeroStats'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

function PageContainer() {
    return (
        <div className='my-8 space-y-4'>
            <HeroStats />
            <div>
                <div className="flex justify-between items-center">
                    <h2 className='text-2xl'>Your Exams</h2>
                    <Button>
                        <Link href={"/faculty/exams/new"} className='inline-flex gap-2 items-center'>
                            <Plus />
                            <span>Create Exam</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PageContainer