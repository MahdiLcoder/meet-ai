'use client'

import ErrorState from "@/components/ErrorState"
import LoadingState from "@/components/LoadingState"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { DataTable } from "./DataTable"
import { columns } from "./Columns"
import EmptyState from "@/components/EmptyState"
import { useAgentFilters } from "../../hooks/useFilters"
import DataPagination from "../../../../components/DataPagination"
import { useRouter } from "next/navigation"

type Props = {}


function AgentsView({ }: Props) {

    const [filters, setFilters] = useAgentFilters()
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }))
    const router = useRouter()

    return (
        <div className="flex-1 pb-4 px-4 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns} onRowClick={(row) => {
                router.push(`/agents/${row.id}`)
            }} />
            <DataPagination
                page={filters.page}
                totalPages={data.total}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 && (
                <EmptyState title="Create your first agent" description="create your agent to join our your meetings" />
            )}
        </div>
    )
}

export default AgentsView


export const AgentsViewLoading = () => {

    return (
        <LoadingState title="Loading Agents" description="This may take a few seconds" />
    )
}

export const AgentsViewError = () => {

    return (
        <ErrorState title="Error Loading Agents" description="Something went wrong" />
    )
}