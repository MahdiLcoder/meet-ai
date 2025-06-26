'use client'

import { authClient } from "@/lib/auth-client"
import { LoaderIcon } from "lucide-react";
import CallConnect from "./CallConnect";
import GeneratedAvatar from "@/lib/avatar";


type Props = {
    meetingId: string,
    meetingName: string
}

function CallProvider({ meetingId, meetingName }: Props) {

    const { data, isPending } = authClient.useSession();
    if (!data || isPending) {
        return (
            <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent">
                <LoaderIcon className="size-6 animate-spin text-white" />
            </div>
        )
    }
    return (
        <CallConnect
            meetingId={meetingId}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            userImage={
                data.user.image ?? GeneratedAvatar({ seed: data.user.name, variant: "initials" })
            }
        />
    )
}

export default CallProvider