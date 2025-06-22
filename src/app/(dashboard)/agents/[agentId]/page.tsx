import AgentIdView, { AgentIdViewError, AgentIdViewLoading } from '@/modules/agents/ui/views/AgentIdView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React, { Suspense } from 'react'

type Props = {
    params: Promise<{ agentId: string }>
}

async function page({ params }: Props) {

    const { agentId } = await params

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentIdViewLoading />}>
                <ErrorBoundary errorComponent={AgentIdViewError}>
                    <AgentIdView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary >
    )
}

export default page