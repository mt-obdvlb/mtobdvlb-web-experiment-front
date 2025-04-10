import type {User, UserLogin, UserPageQuery} from './type'
import request from "@/utils/request";

const base = '/user'

enum API {
    Logout = '/logout',
    Login = '/login',
    Save = '/save',
    Update = '',
    GetById = '/',
    ForgetPassword = '/forget-password',
    Page = '/page',
    Delete = '/'
}

export const reqLogin = (data: User): Response<UserLogin> => request.post(base + API.Login, data)

export const reqLogout = (): Response => request.post(base + API.Logout)

export const reqSave = (data: User): Response => request.post(base + API.Save, data)

export const reqUpdate = (data: User): Response => request.put(base + API.Update, data)

export const reqGetById = (id: number): Response<User> => request.get(base + API.GetById + id)

export const reqForgetPassword = (data: User): Response => request.post(base + API.ForgetPassword, data)

export const reqPage = (data: UserPageQuery): Response<PageResponse<User>> => request.get(base + API.Page, {params:data})

export const reqDelete = (id: number): Response => request.delete(base + API.Delete + id)

export const reqAddOrUpdate = (data: User): Response => {
    console.log(data)
    if(data.id) {
        return reqUpdate(data)
    } else {
        return reqSave(data)
    }
}