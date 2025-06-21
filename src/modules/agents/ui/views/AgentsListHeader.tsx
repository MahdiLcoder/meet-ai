'use client'

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import NewAgentDialog from "./NewAgentDialog"
import { useState } from "react"

type Props = {}

function AgentsListHeader({ }: Props) {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

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
            </div>
        </>
    )
}

export default AgentsListHeader