import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { apiRoutes } from '../../config/api'
import { axiosBaseQuery } from '../index'

export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getAllGames: builder.query({
            query: () => `game`
        })
    }),
})

export const { useGetAllGamesQuery } = gamesApi
