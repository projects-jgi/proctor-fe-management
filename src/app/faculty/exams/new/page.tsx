import HeroBanner from '@/components/HeroBanner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from '@/components/ui/multi-select'
import { Textarea } from '@/components/ui/textarea'
import { Percent } from 'lucide-react'
import React from 'react'

function page() {
    return (
        <>
            <HeroBanner title='Create New Exam' description='Create a new exam for your specialization' />
            <div className='container my-8 space-y-6'>
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <Label htmlFor="exam-title" className="text-sm font-medium">Exam Title *</Label>
                                <Input
                                    id="exam-title"
                                    placeholder="Enter exam title"
                                    className="mt-1"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="exam-description" className="text-sm font-medium">Description *</Label>
                                <Textarea
                                    id="exam-description"
                                    placeholder="Brief description of the exam"
                                    rows={3}
                                    className="mt-1"
                                    />
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="" className="text-sm font-medium mb-1">Exam Type Mapping</Label>
                                <MultiSelect>
                                    <MultiSelectTrigger className='w-full'>
                                        <MultiSelectValue placeholder='Search Exam Type...' />
                                    </MultiSelectTrigger>
                                    <MultiSelectContent>
                                        <MultiSelectGroup>
                                            <MultiSelectItem value='verbal'>Vebal</MultiSelectItem>
                                            <MultiSelectItem value='logical'>Logical</MultiSelectItem>
                                            <MultiSelectItem value='qt'>Quantative</MultiSelectItem>
                                        </MultiSelectGroup>
                                    </MultiSelectContent>
                                </MultiSelect>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <Label htmlFor="exam-duration" className="text-sm font-medium">Duration (minutes) *</Label>
                                <Input
                                    id="exam-duration"
                                    type="number"
                                    className="mt-1"
                                    min="1"
                                    />
                            </div>
                            <div>
                                <Label htmlFor="exam-start" className="text-sm font-medium">Start Time *</Label>
                                <Input
                                    id="exam-start"
                                    type="datetime-local"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="exam-end" className="text-sm font-medium">End Time *</Label>
                                <Input
                                    id="exam-end"
                                    type="datetime-local"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="max-violation" className="text-sm font-medium">Max Violation *</Label>
                                <Input
                                    id="max-violation"
                                    type="number"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="max-violation" className="text-sm font-medium">Max Violation *</Label>
                                <InputGroup>
                                    <InputGroupInput type='number' />
                                    <InputGroupAddon align='inline-end'>
                                        <Percent />
                                    </InputGroupAddon>

                                </InputGroup>
                            </div>
                            <div className='md:col-span-2'>
                            <Label htmlFor="exam-instructions" className="text-sm font-medium">Instructions</Label>
                            <Textarea
                                id="exam-instructions"
                                placeholder="Exam instructions for students"
                                rows={4}
                                className="mt-1"
                            />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Advanced Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                <Checkbox
                                    id="toggle-2"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                />
                                <div className="grid gap-1.5 font-normal">
                                    <p className="text-sm leading-none font-medium">
                                        Show Results Immediately
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Display results after completion
                                    </p>
                                </div>
                            </Label>
                            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                <Checkbox
                                    id="toggle-2"
                                    defaultChecked
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                />
                                <div className="grid gap-1.5 font-normal">
                                    <p className="text-sm leading-none font-medium">
                                        Add Proctoring
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Enables proctoring for student exam
                                    </p>
                                </div>
                            </Label>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default page