import HeroBanner from '@/components/HeroBanner';
import AddQuestionContainer from '@/containers/faculty/questions/AddQuestionContainer';
import React from 'react'

async function page({ params }: { params: { exam_type_id: string } }) {
    const { exam_type_id } = await params;

    return (
        <>
            <HeroBanner title='Create New Question' description='Design a question for your question bank' />
            <div className="container">
                <AddQuestionContainer exam_type_id={exam_type_id} />
            </div>
        </>
    )
}

export default page