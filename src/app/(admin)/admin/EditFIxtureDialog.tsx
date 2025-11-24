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
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { editFixtureDataAction } from "@/lib/actions/admin.actions"
import { useRouter } from "next/navigation"

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
    const [isSubmissionError, setIsSubmissionError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const router = useRouter()
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

    async function onSubmit(data: EditFixtureFormData) {
        try {
            setIsSuccess(false)
            const newData: {
                id: string
                [key: string]: string | number | Date
            } = {
                id: selectedRow!.id,
            }

            Object.entries(data).forEach(([key, value]) => {
                if (Object.hasOwn(selectedRow!, key)) {
                    if (
                        selectedRow !== null &&
                        selectedRow[key as keyof FixtureTableData] !== value
                    ) {
                        newData[key] = value
                    }
                }
            })
            const result = await editFixtureDataAction(newData)
            if (!result.success) throw result.error

            router.refresh()
            setDialogOpen(false)
            setIsSuccess(true)
        } catch (error) {
            setIsSubmissionError(true)
        }
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
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
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
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? "Saving..."
                                : "Submit"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
