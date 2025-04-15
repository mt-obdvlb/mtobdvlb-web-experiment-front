export interface Contact{
    id?: number | string,
    name: string,
    address: string,
    date: string,
    province: string,
    city: string,
    postcode: string,
    userId: number | string
}

export interface ContactPageQuery{
    page: number,
    pageSize: number,
    name?: string,
    userId: number | string
}

export interface ContactPageQueryResponse{
    name: string,
    address: string,
    date: string,
    province: string,
    city: string,
    postcode: string,
    id: number | string
}