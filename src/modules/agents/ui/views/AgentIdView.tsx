'use client'

import ErrorState from '@/components/ErrorState'
import LoadingState from '@/components/LoadingState'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import AgentIdViewHeader from './AgentIdViewHeader'
import GeneratedAvatar from '@/components/GeneratedAvatar'
import { Badge } from '@/components/ui/badge'
import { BookOpenIcon, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useConfirm from '../../hooks/useConfirm'
import UpdateAgentDialog from './UpdateAgentDialog'

type Props = {
    agentId: string;
}

function AgentIdView({ agentId }: Props) {

    const trpc = useTRPC()
    const { push } = useRouter()
    const queryClient = useQueryClient()
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }))
    const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false)
    const removeAgent = useMutation(trpc.agents.remove.mutationOptions({
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
            push('/agents')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))

    const [RemoveConfirmation, confirmRemove] = useConfirm({
        title: "Are you sure?",
        description: `The flowing action will remove ${data.meetingCount} associated meetings`
    })

    const handleRemoveAgent = async () => {
        const ok = await confirmRemove()
        if (!ok) {
            return
        }
        await removeAgent.mutateAsync({ id: agentId })
    }
    return (
        <>
            <RemoveConfirmation />
            <UpdateAgentDialog initialValues={data} open={updateAgentDialogOpen} onOpenChange={setUpdateAgentDialogOpen} />
            <div className="flex-1 p-6 flex flex-col gap-6 max-w-4xl mx-auto">
                <AgentIdViewHeader
                    agentId={agentId}
                    agentName={data.name}
                    onEdit={() => { setUpdateAgentDialogOpen(true) }}
                    onRemove={handleRemoveAgent}
                />

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column - Avatar Card */}
                    <div className="w-full md:w-48 flex-shrink-0">
                        <div className="bg-white rounded-xl border p-4 shadow-sm flex flex-col items-center">
                            <GeneratedAvatar
                                seed={data.name}
                                variant="botttsNeutral"
                                className="size-32 rounded-lg mb-4 border-2 border-white shadow"
                            />
                            <h2 className="text-xl font-semibold text-center text-gray-900 mb-1">
                                {data.name}
                            </h2>
                            <Badge className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-50">
                                <VideoIcon className="size-4" />
                                <span>
                                    {data.meetingCount} {data.meetingCount === 1 ? "Meeting" : "Meetings"}
                                </span>
                            </Badge>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-white rounded-xl border p-6 shadow-sm">
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <BookOpenIcon className="size-5 text-gray-500" />
                                        Instructions
                                    </h3>
                                </div>

                                <div className="prose prose-sm max-w-none text-gray-700 p-4 bg-gray-50 rounded-lg">
                                    {data.instuctions}
                                </div>
                            </div>
                        </div>

                        {/* Additional sections can be added here */}
                        <div className="bg-white rounded-xl border p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Activity & Analytics
                            </h3>
                            <div className="text-gray-500 italic">
                                Meeting history and performance metrics would appear here
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgentIdView


export const AgentIdViewLoading = () => {

    return (
        <LoadingState title="Loading Agent" description="This may take a few seconds" />
    )
}

export const AgentIdViewError = () => {

    return (
        <ErrorState title="Error Loading individual Agent" description="Something went wrong" />
    )
}