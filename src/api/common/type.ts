export interface Province {
    id: number,
    name: string
}

export interface City {
    id: number,
    name: string,
    provinceId: number
}