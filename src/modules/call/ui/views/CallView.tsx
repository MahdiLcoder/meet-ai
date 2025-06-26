'use client'

import ErrorState from '@/components/ErrorState'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CallProvider from '../components/CallProvider'

type Props = {
    meetingId: string
}

function CallView({ meetingId }: Props) {

    const trpc = useTRPC()
    const { data } = useQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))
    if (data?.status === "completed") {
        return (
            <div className="flex h-screen items-center justify-center">
                <ErrorState
                    title='Meeting has ended'
                    description='You can no longer join this meet'
                />
            </div>
        )
    }
    return (
        <CallProvider meetingId={meetingId} meetingName={data?.name ?? ''} />
    )
}

export default CallView