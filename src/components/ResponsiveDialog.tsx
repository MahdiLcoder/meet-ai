import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

type Props = {
    title: string;
    description: string;
    children: ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void
}

function ResponsiveDialog({ children, description, onOpenChange, open, title }: Props) {
return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
    )
}

export default ResponsiveDialog