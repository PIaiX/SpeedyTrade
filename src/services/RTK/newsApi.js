import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { apiRoutes } from '../../config/api'
import { axiosBaseQuery } from '../index'

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getAllNews: builder.query({
            query: (page) => `${apiRoutes.NEWS_ACTION}${page}&limit=4&orderBy=desc`
        }),
        getOneNews: builder.query({
            query: (slug) => `${apiRoutes.NEWS_ACTION}/${slug}`
        })
    }),
})

export const { useGetAllNewsQuery, useGetOneNewsQuery } = newsApi
