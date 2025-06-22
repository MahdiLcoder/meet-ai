import MeetingsView, { MeetingsViewError, MeetingsViewLoading } from '@/modules/meetings/ui/views/MeetingsView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React, { Suspense } from 'react'

type Props = {}

function page({ }: Props) {

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading />}>
                <ErrorBoundary errorComponent={MeetingsViewError}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page