import type {User, UserLogin} from './type'
import request from "@/utils/request";

const base = '/user'

enum API {
    Logout = '/logout',
    Login = '/login',
    Save = '/save',
    Update = '/',
    GetById = '/',
    ForgetPassword = '/forgetPassword',
    Page = '/page',
}

export const reqLogin = (data: User): Response<UserLogin> => request.post(base + API.Login, data)