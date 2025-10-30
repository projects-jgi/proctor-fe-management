import React from 'react'

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, HelpCircle } from 'lucide-react';

function HeroStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Categories</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Easy</CardTitle>
                    <Badge variant="secondary">Easy</Badge>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Medium/Hard</CardTitle>
                    <Badge variant="default">M/H</Badge>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{5}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default HeroStats