import { auth } from '@/lib/auth'
import { loadSearchParams } from '@/modules/agents/params'
import MeetingListHeader from '@/modules/meetings/ui/components/MeetingListHeader'
import MeetingsView, { MeetingsViewError, MeetingsViewLoading } from '@/modules/meetings/ui/views/MeetingsView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SearchParams } from 'nuqs'
import React, { Suspense } from 'react'

type Props = {
    searchParams: Promise<SearchParams>
}

async function page({ searchParams }: Props) {


    const filters = await loadSearchParams(searchParams)
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({
            ...filters
        })
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