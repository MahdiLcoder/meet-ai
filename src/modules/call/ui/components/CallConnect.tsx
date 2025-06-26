'use client'

import React, { useEffect, useState } from 'react'
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { Call, CallingState, StreamCall, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { LoaderIcon } from 'lucide-react';
import CallUI from './CallUI';
type Props = {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage?: string
}

function CallConnect({ meetingId, meetingName, userId, userName, userImage }: Props) {

    const trpc = useTRPC()
    const { mutateAsync: generateTokenAsync } = useMutation(trpc.meetings.generateToken.mutationOptions())
    const [client, setClient] = useState<StreamVideoClient>()
    useEffect(() => {
        const tokenProvider = async () => {
            return await generateTokenAsync();
        };

        const _client = new StreamVideoClient({
            apiKey: process.env.NEXT_STREAM_VIDEO_API_KEY!,
            user: {
                id: userId,
                name: userName,
                image: userImage,
            },
            tokenProvider
        })
        setClient(_client)

        return () => {
            _client.disconnectUser()
            setClient(undefined)
        }
    }, [userId, userName, userImage, generateTokenAsync])

    const [call, setCall] = useState<Call>()
    useEffect(() => {
        if (!client) return

        const _call = client.call("default", meetingId)
        _call.camera.disable()
        _call.microphone.disable()
        setCall(_call)

        return () => {
            if (_call.state.callingState !== CallingState.LEFT) {
                _call.leave()
                _call.endCall()
                setCall(undefined)
            }
        }
    }, [client, meetingId])

    if (!client || !call) {
        return (
            <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent">
                <LoaderIcon className="size-6 animate-spin text-white" />
            </div>
        )
    }
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <CallUI meetingName={meetingName} />
            </StreamCall>
        </StreamVideo>
    )
}

export default CallConnect