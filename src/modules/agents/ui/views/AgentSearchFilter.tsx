import React from 'react'
import { useAgentFilters } from '../../hooks/useFilters'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

type Props = {}

function SearchFilter({ }: Props) {

    const [filters, setFilters] = useAgentFilters()
    return (
        <div className='relative'>
            <Input
                placeholder='Filter by name'
                className='h-9 bg-white w-[200px] pl-7'
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
            />
            <SearchIcon className='size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground' />
        </div>
    )
}

export default SearchFilter