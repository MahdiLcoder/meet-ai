import { auth } from '@/lib/auth'
import MeetingIdView, { MeetingIdViewError, MeetingIdViewLoading } from '@/modules/meetings/ui/views/MeetingIdView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

type Props = {
    params: Promise<{
        meetingId: string
    }>
}

async function page({ params }: Props) {

    const { meetingId } = await params
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect('/sign-in')
    }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingIdViewLoading />}>
                <ErrorBoundary errorComponent={MeetingIdViewError}>
                    <MeetingIdView meetingId={meetingId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary >
    )
}

export default page