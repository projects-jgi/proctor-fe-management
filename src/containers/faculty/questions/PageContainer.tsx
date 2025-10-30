'use client';

import React from 'react'
import HeroStats from './HeroStats';
import FilterSearch from './FilterSearch';
import QuestionsSection from './QuestionsSection';

function PageContainer() {
    return (
        <div className='my-8 space-y-4'>
            <HeroStats />
            <FilterSearch />
            <QuestionsSection />
        </div>
    )
}

export default PageContainer