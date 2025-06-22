'use client'

import React from 'react';

import ErrorState from '@/components/ErrorState';
import LoadingState from '@/components/LoadingState';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

type Props = {}

function MeetingsView({ }: Props) {

    const trpc = useTRPC()
    const { data } = useQuery(trpc.meetings.getMany.queryOptions({}))
    return (
        <div>
            Meeting page
        </div>
    )
}

export default MeetingsView


export const MeetingsViewLoading = () => {

    return (
        <LoadingState title="Loading Meetings" description="This may take a few seconds" />
    )
}

export const MeetingsViewError = () => {

    return (
        <ErrorState title="Error Loading Meetings" description="Something went wrong" />
    )
}