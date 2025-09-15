import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FixtureTableData } from "@/lib/types/fixture";
import { Dispatch, SetStateAction } from "react";

type EditFixtureDialogProps = {
    dialogOpen: boolean
    setDialogOpen: Dispatch<SetStateAction<boolean>>
    selectedRow: FixtureTableData | null
}

export default function EditFixtureDialog({dialogOpen, setDialogOpen, selectedRow}: EditFixtureDialogProps) {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit {selectedRow?.homeTeam}</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    )
}