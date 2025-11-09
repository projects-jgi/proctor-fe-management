import HeroBanner from '@/components/HeroBanner';
import PageContainer from '@/containers/faculty/proctoring/exam/PageContainer';
import React from 'react'

async function page({ params }: { params: { exam_id: string } }) {
    const { exam_id } = await params;

  return (
    <>
        <HeroBanner title='Exam Results' description='View and analyze student performance' />
        <div className="container">
            <PageContainer exam_id={parseInt(exam_id)} />
        </div>
    </>
  )
}

export default page