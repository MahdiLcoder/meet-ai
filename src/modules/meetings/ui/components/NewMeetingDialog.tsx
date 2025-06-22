import ResponsiveDialog from '@/components/ResponsiveDialog';
import React from 'react'
import MeetingForm from './MeetingForm';
import { useRouter } from 'next/navigation';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void
}

function NewMeetingDialog({ open, onOpenChange }: Props) {

    const router = useRouter()
    return (
        <ResponsiveDialog title='New Meeting' description='Create a new Meeting' open={open} onOpenChange={onOpenChange}>
            <MeetingForm onSucces={(id) => {
                onOpenChange(false)
                router.push(`/meetings/${id}`)
            }} onCancel={()=> onOpenChange} />
        </ResponsiveDialog>
    )
}

export default NewMeetingDialog