import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FixtureTableData } from "@/lib/types/fixture"
import {
    EditFixtureFormData,
    EditFixtureFormSchema,
} from "@/lib/types/schemas/fixturesSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { editFixtureDataAction } from "@/lib/actions/admin.actions"

type EditFixtureDialogProps = {
    dialogOpen: boolean
    setDialogOpen: Dispatch<SetStateAction<boolean>>
    selectedRow: FixtureTableData | null
}

export default function EditFixtureDialog({
    dialogOpen,
    setDialogOpen,
    selectedRow,
}: EditFixtureDialogProps) {
    const form = useForm<EditFixtureFormData>({
        resolver: zodResolver(EditFixtureFormSchema),
        defaultValues: {
            gameweek: Number(selectedRow?.gameweek) || 0,
        },
    })

    if (!selectedRow) {
        if (dialogOpen) {
            setDialogOpen(false)
        }
        return null
    }

    function onSubmit(data: EditFixtureFormData) {
        const newFixtureData = { ...selectedRow! }
        for (const [key, value] of Object.entries(data)) {
            const formKey = key as keyof EditFixtureFormData

            if (Object.prototype.hasOwnProperty.call(newFixtureData, formKey)) {
                newFixtureData[formKey] = value
            }
        }
        editFixtureDataAction(newFixtureData)
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Fixture</DialogTitle>
                    <DialogDescription>
                        {`${selectedRow.homeTeam} vs ${selectedRow.awayTeam}`}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="gameweek"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Set Gameweek</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            value={field.value}
                                            onChange={(event) => {
                                                const value = event.target.value
                                                const numValue = Number(value)

                                                field.onChange(numValue)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
