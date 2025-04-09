export interface User {
    id?: number | string;
    username: string;
    password?: string;
    birth_time?: string;
    email?: string;
    avatar?: string;
}

export interface UserLogin {
    id: number | string,
    username: string,
    token: string,
    birth_time: string,
    email: string,
}

export interface UserForgetPassword {
    email: string,
    password: string,
    username: string,
    password_confirmation: string
}