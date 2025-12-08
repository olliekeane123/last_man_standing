export type SuccessResult<T> = {
    success: true
    data: T
}

export type FailureResult = {
    success: false
    error: string
}

export type ActionResponse<T> = SuccessResult<T> | FailureResult
