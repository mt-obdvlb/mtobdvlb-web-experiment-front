import request from "@/utils/request";
import {Province, City} from "@/api/common/type";
import {ArticlePageQueryResponse, ArticlePageQuery, Article, ArticleList} from "@/api/article/type";

const base = '/article'

enum API {
    Save = '/save',
    Update = '',
    Delete = '/',
    Page = '/page',
    GetById = '/',
    List = '/list'
}

export const reqArticleDelete = (id: number): Response => request.delete(base + API.Delete + id)

export const reqArticleGetById = (id: number): Response<Article> => request.get(base + API.GetById + id)

export const reqArticlePage = (data: ArticlePageQuery): Response<PageResponse<ArticlePageQueryResponse>> => request.get(base + API.Page, {params:data})

export const reqArticleSave =(data: Article): Response => request.post(base + API.Save, data)

export const reqArticleUpdate = (data: Article): Response => request.put(base + API.Update, data)

export const reqArticleAddOrUpdate = (data: Article): Response => {
    if (data.id) {
        return reqArticleUpdate(data)
    } else {
        return reqArticleSave(data)
    }
}

export const reqArticleList = (data: ArticleList): Response<Array<Article>> => request.get(base + API.List, {params:data})