import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CirclePlay, Eye, HatGlasses, HelpCircle, NotepadText } from 'lucide-react';

const card_data = [
    {
        title: 'Total Exam Types',
        icon: NotepadText,
        value: 5
    },
    {
        title: "Private",
        icon: HatGlasses,
        value: 3
    },
    {
        title: "Public",
        icon: Eye,
        value: 2
    },
    {
        title: "Active",
        icon: CirclePlay,
        value: 1
    }
]

function HeroStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {card_data.map((card, index) => (
            <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
            </Card>
        ))}
    </div>
  )
}

export default HeroStats