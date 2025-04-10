export interface User {
    id?: number | string;
    username: string;
    password?: string;
    birthTime?: string;
    email?: string;
    avatar?: string;
}

export type UserList = User[];

export interface UserForgetPassword {
    email: string,
    password: string,
    username: string,
    passwordConfirmation: string
}

export interface UserPageQuery {
    page: number,
    pageSize: number,
    username?: string,
    begin?: string,
    end?: string
}

export interface UserLoginRes {
    id: number | string,
    username: string,
    token: string,
    birthTime: string,
    email: string,
    avatar: string
}
