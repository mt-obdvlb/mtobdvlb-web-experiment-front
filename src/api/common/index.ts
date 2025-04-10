import request from "@/utils/request";

const base = '/common'

enum API {
    Upload = '/upload'
}

export const reqUpload = (data: FormData): Response<String> => request.post(base + API.Upload, data)