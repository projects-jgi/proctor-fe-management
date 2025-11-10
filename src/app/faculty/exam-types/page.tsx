import HeroBanner from '@/components/HeroBanner'
import PageContainer from '@/containers/faculty/exam-types/PageContainer'
import React from 'react'

function page() {
  return (
    <>
        <HeroBanner title='Exam Types' description='View all exam types' />
        <div className='container'>
            <PageContainer />
        </div>
    </>
  )
}

export default page