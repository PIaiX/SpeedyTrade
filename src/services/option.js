import {$api} from '.'
import {apiRoutes} from '../config/api'

const projectName = require('../../app.json')?.expo?.android?.package

/*
versionAndroid - Актуальная версия для Android
versionIos - Актуальная версия для ios
phone - Номер телефона в контактах
email - Почта в контактах
pointRegistration - Начисление баллов за регистрацию
cashbackOrder - Кешбек с заказов
*/

const getOptions = async () => {
    const response = await $api.get(apiRoutes.OPTIONS, {params: {projectName}})
    return response?.data
}

export {getOptions}
