import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus } from 'lucide-react'
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
                                <TableBody>
                                    {Array(10).fill(0).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">01</TableCell>
                                            <TableCell>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, reprehenderit.</TableCell>
                                            <TableCell>10</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="verbal">
                <div className="w-full">
                    <div className="flex justify-end gap-2 mb-4">
                        <Button variant="outline">
                            <Plus />
                            <span>Bulk Upload</span>
                        </Button>
                        <Button variant={'outline'}>
                            <Plus />
                            <span>Add Exam Type</span>
                        </Button>
                        <Button>
                            <Plus />
                            <span>Create Question</span>
                        </Button>
                    </div>
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
                                <TableBody>
                                    {Array(10).fill(0).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">01</TableCell>
                                            <TableCell>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, reprehenderit.</TableCell>
                                            <TableCell>10</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    )
}

export default QuestionsSection