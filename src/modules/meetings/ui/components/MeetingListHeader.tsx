'use client'

import { Button } from "@/components/ui/button"
import { PlusIcon, } from "lucide-react"
import { useState } from "react"
import NewMeetingDialog from "./NewMeetingDialog"
import MeetingsSearchFilter from "./MeetingSearchFilter"
import StatusFilter from "./StatusFilter"
import AgentIdFilter from "./AgentIdFilter"
import { useMeetingsFilters } from "../../hooks/useMeetingsFilters"

type Props = {}

function MeetingListHeader({ }: Props) {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filters, setFilters] = useMeetingsFilters()

    const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId

    const onClearFilters = () => {
        setFilters({
            status: null,
            agentId: "",
            search: "",
            page: 1,
        });
    };
    return (
        <>
            <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button onClick={() => { setIsDialogOpen(true) }}>
                        <PlusIcon />
                        New Meeting
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    <MeetingsSearchFilter />
                    <StatusFilter />
                    <AgentIdFilter />
                    {isAnyFilterModified && (
                        <Button
                            variant={"outline"}
                            onClick={onClearFilters}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </div >
        </>
    )
}

export default MeetingListHeader