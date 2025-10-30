import HeroBanner from '@/components/HeroBanner'
import PageContainer from '@/containers/faculty/exams/PageContainer'
import React from 'react'

function page() {
    return (
        <>
            <HeroBanner title='Exam Management' description='Create and manage exams for your students' />
            <div className="container">
                <PageContainer />
            </div>
        </>
    )
}

export default page