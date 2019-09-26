import {get, post } from '../utils/http-service.js';
import apiConfig from '../../config/api.config';

const baseUrl = apiConfig.baseUrl;
export default {
    // 危险区域人员列表
    queryDangerousList(params) {
        return get(baseUrl + "/api/Face/GetDangerousPedestrianRealtime", params)
    },

    // 车辆品牌
    queryCarBrand(params) {
        return get(baseUrl + "/api/Face/GetCarBrand", params)
    },

    // 车辆类型
    queryCarType(params) {
        return get(baseUrl + "/api/Face/GetCarType", params)
    },

    // 车辆类型
    queryCarColor(params) {
        return get(baseUrl + "/api/Face/GetCarColor", params)
    },

    // 车辆进出记录
    queryCarListRealtime(params) {
        return get(baseUrl + "/api/Face/GetCarListRealtime", params)
    },

    // 今日车流量
    queryCarSUMbyHou(params) {
        return get(baseUrl + "/api/Face/GetCarSUMbyHou", params)
    },

    // 当月车流量
    queryCarSUMbyDay(params) {
        return get(baseUrl + "/api/Face/GetCarSUMbyDay", params)
    },

    // 来访人员类型
    queryPedestrianType(params) {
        return get(baseUrl + "/api/Face/GetPedestrianType", params)
    },

    // 来访人员人数
    queryPedestrianCount(params) {
        return get(baseUrl + "/api/Face/GetPedestrianCount", params)
    },

    // 来访人员最近列表记录
    queryPedestrianRealtime(params) {
        return get(baseUrl + "/api/Face/GetPedestrianRealtime", params);
    },

    // 查询动线
    queryUserList(params) {
        return get(baseUrl + "/api/Face/GetUserList", params);
    }
}