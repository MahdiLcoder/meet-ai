'use client'

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircle, XCircleIcon } from "lucide-react"
import NewAgentDialog from "./NewAgentDialog"
import { useAgentFilters } from "../../hooks/useFilters"
import { useState } from "react"
import AgentSearchFilter from "./AgentSearchFilter"
import { DEFAULT_PAGE } from "@/constant"

type Props = {}

function AgentsListHeader({ }: Props) {

    const [filters, setFilters] = useAgentFilters()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const isAnyFilterModified = !!filters.search
    const onCLearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE
        })
    }

    return (
        <>
            <NewAgentDialog onOpenChange={setIsDialogOpen} open={isDialogOpen} />
            <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Agents</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusIcon />
                        New Agents
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    <AgentSearchFilter />
                    {isAnyFilterModified && (
                        <Button variant={"outline"} size="sm" onClick={onCLearFilters}>
                            <XCircleIcon />
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default AgentsListHeader