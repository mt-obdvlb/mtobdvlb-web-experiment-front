export interface Article{
    id: number | string,
    title: string,
    content: string,
    userId: number | string,
}

export interface ArticlePageQuery{
    page: number,
    pageSize: number
}

export interface ArticlePageQueryResponse{
    username: string,
    userId: number,
    articleNumber: number
}

export interface ArticleList{
    userId: number | string,
    title: string,
}