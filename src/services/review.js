import { apiRoutes } from '../config/api'
import { $authApi } from './index'
import axios from 'axios';

const getReview = async (data) => {

    const response = await $authApi.get(apiRoutes.REVIEWS, { params: data })
    return response?.data

}
const editReview = async (data) => {
    const response = await $authApi.post(apiRoutes.REVIEWS, data);
    return response?.data;
};

export { getReview, editReview }
