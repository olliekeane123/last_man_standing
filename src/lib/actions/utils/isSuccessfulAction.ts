import { ActionResponse, SuccessResult } from "@/lib/types/action"

export default function isSuccessfulAction<T>(
    result: ActionResponse<T>
): result is SuccessResult<T> {
    return result.success === true
}
