import { HttpRequest } from './httpRequest';
import { server } from './commonInfo';
/**
 *
 *
 * @param {httpClient} httpClient httpClient实例化类
 * @param {string} url 请求地址
 * @param {object} data  请求数据
 * @param {object} header  请求头 object:{ headers:{HttpHeaders} }
 * @memberof HeaderInnerComponent
 * @returns {Promise}
 */
const request = (httpClient, url, data, header) => {
    return new HttpRequest({
        url: `${server.host}${url}`,
        data,
        header,
    }, httpClient);
};

export {
    request,
};
