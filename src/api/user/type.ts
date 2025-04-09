export interface User {
    id?: number | string;
    username: string;
    password?: string;
    birth_time?: string;
}

export interface UserLogin {
    id: number | string,
    username: string,
    token: string
}

