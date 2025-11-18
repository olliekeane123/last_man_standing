import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useTableParams } from "./hooks/useTableParams"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    FixturesFiltersFormSchema,
    FixturesFiltersFormData,
} from "@/lib/types/schemas/fixturesSchema"
import { Checkbox } from "@/components/ui/checkbox"
import { ALL_FIXTURE_STATUSES, FixtureStatus } from "@/lib/types/fixture"

export default function FiltersBar() {
    const { params, updateParams } = useTableParams()

    function onSubmit(data: FixturesFiltersFormData) {
        updateParams({ status: data.statuses })
    }

    const form = useForm<FixturesFiltersFormData>({
        resolver: zodResolver(FixturesFiltersFormSchema),
        defaultValues: {
            statuses: (params.status && Array.isArray(params.status)
                ? params.status
                : []) as FixtureStatus[],
        },
    })

    return (
        <div className="flex items-center py-4 ml-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Filters</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col">
                                <p className="text-muted-foreground text-sm">
                                    Set the filters for the fixtures.
                                </p>

                                <FormField
                                    control={form.control}
                                    name="statuses"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <div className="space-y-2">
                                                {ALL_FIXTURE_STATUSES.map(
                                                    (status) => (
                                                        <FormField
                                                            key={status}
                                                            control={
                                                                form.control
                                                            }
                                                            name="statuses"
                                                            render={({
                                                                field,
                                                            }) => {
                                                                const currentValues =
                                                                    (field.value as
                                                                        | FixtureStatus[]
                                                                        | undefined) ??
                                                                    []
                                                                const isChecked =
                                                                    currentValues.includes(
                                                                        status
                                                                    )

                                                                // Format the status for display (e.g., IN_PLAY -> In Play)
                                                                const displayStatus =
                                                                    status
                                                                        .toLowerCase()
                                                                        .replace(
                                                                            "_",
                                                                            " "
                                                                        )

                                                                return (
                                                                    <FormItem className="flex items-center space-x-2">
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={
                                                                                    isChecked
                                                                                }
                                                                                onCheckedChange={(
                                                                                    checked
                                                                                ) => {
                                                                                    if (
                                                                                        checked
                                                                                    ) {
                                                                                        field.onChange(
                                                                                            [
                                                                                                ...currentValues,
                                                                                                status,
                                                                                            ]
                                                                                        )
                                                                                    } else {
                                                                                        field.onChange(
                                                                                            currentValues.filter(
                                                                                                (
                                                                                                    s
                                                                                                ) =>
                                                                                                    s !==
                                                                                                    status
                                                                                            )
                                                                                        )
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="capitalize">
                                                                            {
                                                                                displayStatus
                                                                            }
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit">Apply filters</Button>
                        </form>
                    </Form>
                </PopoverContent>
            </Popover>
        </div>
    )
}
