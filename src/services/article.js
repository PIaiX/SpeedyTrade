import { apiRoutes } from '../config/api'
import { $api } from './index'
import axios from 'axios';

const getArticles = async (data) => {

    const response = await $api.get(apiRoutes.ARTICLES, { params: data })
    return response?.data

}
const getArticle = async (data) => {

    const response = await $api.get(apiRoutes.ARTICLE, { params: data })
    return response?.data

}

export { getArticles, getArticle }
