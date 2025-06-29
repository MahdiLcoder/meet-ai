import ResponsiveDialog from '@/components/ResponsiveDialog';
import React from 'react'
import MeetingForm from './MeetingForm';
import { MeetingtGetOne } from '@/modules/agents/types';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: MeetingtGetOne
}

function UpdateMeetingDialog({ open, onOpenChange, initialValues }: Props) {
    return (
        <ResponsiveDialog title='Edit Meeting' description='Edit the meeting details' open={open} onOpenChange={onOpenChange}>
            <MeetingForm onSucces={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} initialValue={initialValues} />
        </ResponsiveDialog>
    )
}

export default UpdateMeetingDialog