import HeroBanner from '@/components/HeroBanner'
import FormCard from '@/containers/faculty/exams/new/FormCard'

import React from 'react'

function page() {
    return (
        <>
            <HeroBanner title='Create New Exam' description='Create a new exam for your specialization' />
            <FormCard />
        </>
    )
}

export default page