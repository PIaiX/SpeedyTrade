import {createApi} from '@reduxjs/toolkit/dist/query/react'
import {apiRoutes, BASE_API_URL} from '../../config/api'
import {$authApi} from '../index'

const axiosBaseQuery =
    ({baseUrl} = {baseUrl: ''}) =>
    async ({url, method, data, params}) => {
        try {
            const result = await $authApi({url: baseUrl + url, method, data, params})
            return {data: result.data}
        } catch (axiosError) {
            let err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export const favoritesApi = createApi({
    reducerPath: 'favoritesApi',
    baseQuery: axiosBaseQuery({baseUrl: BASE_API_URL}),
    tagTypes: ['Favorites'],
    keepUnusedDataFor: 300,
    endpoints: (build) => ({
        getFavorites: build.query({
            query: (userId) => ({
                url: `${apiRoutes.FAVORITES_ACTIONS}/${userId}`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.body.map(({id}) => ({
                              type: 'Favorites',
                              id,
                          })),
                          {type: 'Favorites', id: 'LIST'},
                      ]
                    : [{type: 'Favorites', id: 'LIST'}],
        }),
        addNewFavorite: build.mutation({
            query: (payloads) => ({
                url: apiRoutes.FAVORITES_ACTIONS,
                method: 'POST',
                data: payloads,
            }),
            invalidatesTags: [{type: 'Favorites', id: 'LIST'}],
        }),
        deleteFavorite: build.mutation({
            query: (payloads) => ({
                url: apiRoutes.FAVORITES_ACTIONS,
                method: 'DELETE',
                data: payloads,
            }),
            invalidatesTags: [{type: 'Favorites', id: 'LIST'}],
        }),
    }),
})

export const {useGetFavoritesQuery, useAddNewFavoriteMutation, useDeleteFavoriteMutation} = favoritesApi
