import request from "@/utils/request";
import {Province, City} from "@/api/common/type";

const base = '/common'

enum API {
    Upload = '/upload',
    Provinces = '/provinces',
    Cities = '/cities',
}

export const reqUpload = (data: FormData): Response<String> => request.post(base + API.Upload, data)

export const reqProvinces = (): Response<Array<Province>> => request.get(base + API.Provinces)

export const reqCities = (provinceId: number): Response<Array<City>> => request.get(base + API.Cities + '/' + provinceId)