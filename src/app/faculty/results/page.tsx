import HeroBanner from '@/components/HeroBanner'
import PageContainer from '@/containers/faculty/results/PageContainer'
import React from 'react'

function page() {
    return (
        <>
            <HeroBanner title='Exam Results' description='View and analyze student performance' />
            <div className="container">
                <PageContainer />
            </div>
        </>
    )
}

export default page