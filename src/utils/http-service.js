import axios from 'axios'

// 默认超时设置
axios.defaults.timeout = 50000;

// 相对路径设置
// axios.defaults.baseURL = "";

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // 设置参数格式
        if (!config.headers['Content-Type']) {
            config.headers = {
                'Content-Type': 'application/json',
            };
        }

        // 添加token到headers
        const token = localStorage.getItem("cc_token");
        if (token) {
            config.headers.token = token
        }

        // 鉴权参数设置
        if (config.method === 'get') {
            //get请求下 参数在params中，其他请求在data中
            config.params = config.params || {};
        } else {
            config.data = config.data || {};
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // 同一code的返回处理
        if (response.data.code === 500) {}

        return response;
    },
    error => {
        return Promise.reject(error);
    }

);


/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                if (response.data.code == 200) {
                    resolve(response.data.data);
                } else {
                    // 错误处理
                }
            }).catch(err => {
                reject(err);
            });
    });

}

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    axios.post(url, data)
        .then(response => {
            if (response.data.code == 200) {
                resolve(response.data.data);
            } else {
                // 错误处理
            }
        }, err => {
            reject(err);
        });
};

/**
 * 封装put方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    axios.put(url, data)
        .then(response => {
            if (response.data.code == 200) {
                resolve(response.data.data);
            } else {}
        }, err => {
            reject(err);
        });
};

/**
 * 封装patch方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    axios.patch(url, data)
        .then(resonse => {
            if (resonse.data.code == 200) {
                resolve(resonse.data.data);
            } else {}
        }, err => {
            reject(err);
        });
};