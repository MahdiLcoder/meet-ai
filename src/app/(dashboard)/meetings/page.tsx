import { auth } from '@/lib/auth'
import MeetingListHeader from '@/modules/meetings/ui/components/MeetingListHeader'
import MeetingsView, { MeetingsViewError, MeetingsViewLoading } from '@/modules/meetings/ui/views/MeetingsView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

type Props = {}

async function page({ }: Props) {

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect('/sign-in')
    }
    return (
        <>
            <MeetingListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<MeetingsViewLoading />}>
                    <ErrorBoundary errorComponent={MeetingsViewError}>
                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default page