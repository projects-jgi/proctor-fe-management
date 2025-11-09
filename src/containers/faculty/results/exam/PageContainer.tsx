import React from 'react'
import HeroStats from './HeroStats'
import ResultList from './ResultList'

function PageContainer({ exam_id }: { exam_id: number }) {
    return (
        <div className='my-8 space-y-4'>
            <HeroStats />
            <ResultList exam_id={exam_id} />
        </div>
    )
}

export default PageContainer