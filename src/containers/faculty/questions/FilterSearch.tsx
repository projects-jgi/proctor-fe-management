import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import React from 'react'

function FilterSearch() {
  return (
    <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
            <Label htmlFor="search" className='mb-2'>Search Questions</Label>
              <InputGroup>
                <InputGroupInput id='search' placeholder='Search by title, content, or subject...' />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
              </InputGroup>
            </div>
            <div>
              <Label htmlFor="category-filter" className='mb-2'>Category</Label>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value={"Test 1"}>
                      Testing
                    </SelectItem>
                    <SelectItem value={"Test 1"}>
                      Verbal
                    </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
        )
}

export default FilterSearch