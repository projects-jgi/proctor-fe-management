import HeroBanner from '@/components/HeroBanner'
import PageContainer from '@/containers/faculty/results/exam/PageContainer'
import { parse } from 'path';
import React from 'react'

async function page({ params }: { params: { exam_id: number } }) {

    let { exam_id } = await params;
    exam_id = parseInt(exam_id as unknown as string);

    return (
        <>
            <HeroBanner title='Exam Results' description='View and analyze student performance' />
            <div className="container">
                <PageContainer exam_id={exam_id} />
            </div>
        </>
    )
}

export default page