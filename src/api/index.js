import {get, post } from '../utils/http-service.js';
import apiConfig from '../../config/api.config';

const baseUrl = apiConfig.baseUrl;
export default {
    getTest(params) {
        return get(baseUrl + "/tqProject/queryAll", params)
    },
    postTest(params) {
        return post(baseUrl + "/login", params)
    }
}