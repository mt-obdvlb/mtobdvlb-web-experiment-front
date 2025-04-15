import type {Contact, ContactPageQuery, ContactPageQueryResponse, User, UserLogin, UserPageQuery} from './type'
import request from "@/utils/request";

const base = '/contact'

enum API {
    Save = '/save',
    Update = '',
    GetById = '/',
    Page = '/page',
    Delete = '/'
}

export const reqContactSave = (data: Contact): Response => request.post(base + API.Save, data)

export const reqContactUpdate = (data: Contact): Response => request.put(base + API.Update, data)

export const reqContactGetById = (id: number): Response<Contact> => request.get(base + API.GetById + id)

export const reqContactPage = (data: ContactPageQuery): Response<PageResponse<ContactPageQueryResponse>> => request.get(base + API.Page, {params:data})

export const reqContactDelete = (id: number): Response => request.delete(base + API.Delete + id)

export const reqContactAddOrUpdate = (data: Contact): Response => {
    if (data.id) {
        return reqContactUpdate(data)
    } else {
        return reqContactSave(data)
    }
}