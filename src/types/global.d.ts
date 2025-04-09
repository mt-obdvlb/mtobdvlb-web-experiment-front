declare global {
    interface Response<T = any> {
        code: number,
        message: string,
        data: T
    }

    interface PageResponse<T> {
        total: number,
        records: T[]
    }
}