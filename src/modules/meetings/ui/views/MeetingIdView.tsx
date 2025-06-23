'use client'

import ErrorState from '@/components/ErrorState'
import LoadingState from '@/components/LoadingState'
import { useTRPC } from '@/trpc/client'
import { useMutation, useSuspenseQuery, QueryClient, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import MeetingIdViewHeader from '../components/MeetingIdViewHeader'
import useConfirm from '../../hooks/useConfirm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import UpdateMeetingDialog from '../components/UpdateMeetingDialog'
import UpcommingState from '../components/UpcommingState'
import ActiveState from '../components/ActiveState'
import CancelledState from '../components/CancelledState'
import ProcessingState from '../components/ProcessingState'

type Props = {
    meetingId: string
}

function MeetingIdView({ meetingId }: Props) {

    const trpc = useTRPC()
    const { push } = useRouter()
    const queryClient = useQueryClient()
    const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))
    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)

    const removeMeeting = useMutation(trpc.meetings.remove.mutationOptions({
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
            push('/meetings')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))

    const [RemoveConfirmation, confirmRemove] = useConfirm({
        title: "Are you sure?",
        description: `The flowing action will remove this meeting`
    })

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove()
        if (!ok) {
            return
        }
        await removeMeeting.mutateAsync({ id: meetingId })
    }

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCancelled = data.status === "cancelled";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";
    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog
                open={updateMeetingDialogOpen}
                initialValues={data}
                onOpenChange={setUpdateMeetingDialogOpen}
            />
            <div className="flex-1 py-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader meetingId={meetingId} meetingName={data.name} onEdit={() => { setUpdateMeetingDialogOpen(true) }} onRemove={handleRemoveMeeting} />
                {isCancelled && <CancelledState />}
                {isProcessing && <ProcessingState />}
                {isCompleted && <div>Completed</div>}
                {isActive && <ActiveState meetingId={meetingId} />}
                {isUpcoming && <UpcommingState
                    meetingId={meetingId}
                    onCancelMeeting={() => { }}
                    isCancelling={false} />}
            </div>
        </>
    )
}

export default MeetingIdView


export const MeetingIdViewLoading = () => {

    return (
        <LoadingState title="Loading Meeting" description="This may take a few seconds" />
    )
}

export const MeetingIdViewError = () => {

    return (
        <ErrorState title="Error Loading Meeting" description="Something went wrong" />
    )
}