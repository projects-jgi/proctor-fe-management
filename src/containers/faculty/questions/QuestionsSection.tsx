import { Card, CardContent } from '@/components/ui/card'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

function QuestionsSection() {
    return (
        <Tabs defaultValue='all'>
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="verbal">Verbal</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <div className="w-full">
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Question Text</TableHead>
                                        <TableHead>Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {Array(10).fill(0).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">01</TableCell>
                                        <TableCell>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, reprehenderit.</TableCell>
                                        <TableCell>10</TableCell>
                                    </TableRow>
                                ))}
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
    )
}

export default QuestionsSection