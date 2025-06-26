import { StreamTheme, useCall } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import CallLobby from './CallLobby'
import CallActive from './CallActive'
import CallEnded from './CallEnded'

type Props = {
    meetingName: string
}

function CallUI({ meetingName }: Props) {

    const call = useCall()
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby")

    const handleJoin = async () => {
        if (!call) {
            return
        }
        await call.join()
        setShow("call")
    }

    const handleLeave = async () => {
        if (!call) {
            return
        }

        call.endCall();
        setShow("ended")
    }
    return (
        <StreamTheme className='h-full'>
            {show === "lobby" && <CallLobby onJoin={handleJoin} />}
            {show === "call" && <CallActive meetingName={meetingName} onLeave={handleLeave} />}
            {show === "ended" && <CallEnded />}
        </StreamTheme>
    )
}

export default CallUI