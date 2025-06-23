import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useMeetingsFilters } from '../../hooks/useMeetingsFilters'
import CommandSelect from '@/components/CommandSelect'
import GeneratedAvatar from '@/components/GeneratedAvatar'

type Props = {}

function AgentIdFilter({ }: Props) {

    const [filters, setFilters] = useMeetingsFilters()
    const trpc = useTRPC()
    const [agentSearch, setAgentSearch] = useState("")
    const { data } = useQuery(trpc.agents.getMany.queryOptions({
        pageSize: 100,
        search: agentSearch
    }))
    return (
        <CommandSelect
            className='h-9'
            placeholder='Agents'
            options={(data?.items ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className='flex items-center gap-x-2'>
                        <GeneratedAvatar
                            seed={agent.name}
                            variant='botttsNeutral'
                            className='size-4'
                        />
                        {agent.name}
                    </div>
                )
            }))}
            onSelect={(value) => setFilters({ agentId: value })}
            onSearch={setAgentSearch}
            value={filters.agentId}
        />

    )
}

export default AgentIdFilter