import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * angular环境下的http请求类
 *
 * @export
 * @class NgHttpRequest
 */
@Injectable()
export class NgHttpRequest {
    /**
     * 初始化请求头部参数 默认content-type为json
     *
     * @private
     * @type {*}
     * @memberof NgHttpRequest
     */
    private httpOptions: any = {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
    };
    /**
     * 初始化请求参数包
     *
     * @private
     * @type {RequestParams}
     * @memberof NgHttpRequest
     */
    private requestParams: RequestParams = {
        url: '',
        type: 'get',
        data: {},
        header: this.httpOptions,
    };
    /**
     * 初始化构造
     * @param {RequestParams} requestParams 请求参数 {url,type,data?,header?}
     * @param {HttpClient} http httpClient对象
     * @memberof NgHttpRequest
     */
    constructor(private http: HttpClient) {
    }

    /**
     * 全局筛选请求并返回订阅请求
     *
     * @returns
     * @memberof NgHttpRequest
     */
    public request(requestParams: RequestParams) {
        this.requestParams = requestParams;
        switch (this.requestParams.type.toLowerCase()) {
            case 'get':
                if (this.get()) {
                    return this.get();
                } else {
                    throw (new Error('请求创建失败！'));
                }
            case 'post':
                if (this.post()) {
                    return this.post();
                } else {
                    throw (new Error('请求创建失败！'));
                }
            case 'put':
                if (this.put()) {
                    return this.put();
                } else {
                    throw (new Error('请求创建失败！'));
                }
            case 'patch':
                if (this.patch()) {
                    return this.patch();
                } else {
                    throw (new Error('请求创建失败！'));
                }
            case 'delete':
                if (this.delete()) {
                    return this.delete();
                } else {
                    throw (new Error('请求创建失败！'));
                }
            default:
                if (this.get()) {
                    return this.get();
                } else {
                    throw (new Error('请求创建失败！'));
                }
        }
    }

    /**
     * 将传入header的参数更新至请求对象的option中
     *
     * @private
     * @param {*} header
     * @returns {*}
     * @memberof NgHttpRequest
     */
    private modifyHeader(header: any): any {
        this.httpOptions.headers = new HttpHeaders(Object.assign({ 'content-type': 'application/json' }, header));
        return this.httpOptions;
    }

    /**
     * get请求
     *
     * @returns
     * @memberof NgHttpRequest
     */
    private get() {
        if (!this.requestParams || !this.requestParams.url) {
            return null;
        }
        if (!this.requestParams.header) {
            this.requestParams.header = this.httpOptions;
        }
        if (this.requestParams.data) {
            let urlReq = '?';
            Object.keys(this.requestParams.data).forEach(k => {
                urlReq += `${k}=${encodeURI(this.requestParams.data[k])}&`;
            });
            urlReq = urlReq.substr(0, urlReq.length - 1);
            this.requestParams.url += urlReq;
        }
        return this.http.get(this.requestParams.url, this.modifyHeader(this.requestParams.header));
    }

    /**
     * post请求
     *
     * @returns
     * @memberof NgHttpRequest
     */
    private post() {
        if (!this.requestParams || !this.requestParams.url) {
            return null;
        }
        if (!this.requestParams.header) {
            this.requestParams.header = this.httpOptions;
        }
        return this.http.post(this.requestParams.url, this.requestParams.data, this.modifyHeader(this.requestParams.header));
    }

    /**
     * put请求
     *
     * @returns
     * @memberof NgHttpRequest
     */
    private put() {
        if (!this.requestParams || !this.requestParams.url) {
            return null;
        }
        if (!this.requestParams.header) {
            this.requestParams.header = this.httpOptions;
        }
        return this.http.put(this.requestParams.url, this.requestParams.data, this.modifyHeader(this.requestParams.header));
    }

    /**
     * patch请求
     *
     * @returns
     * @memberof NgHttpRequest
     */
    private patch() {
        if (!this.requestParams || !this.requestParams.url) {
            return null;
        }
        if (!this.requestParams.header) {
            this.requestParams.header = this.httpOptions;
        }
        return this.http.patch(this.requestParams.url, this.requestParams.data, this.modifyHeader(this.requestParams.header));
    }

    /**
     * delete请求
     *
     * @returns
     * @memberof NgHttpRequest
     */
    private delete() {
        if (!this.requestParams || !this.requestParams.url) {
            return null;
        }
        if (!this.requestParams.header) {
            this.requestParams.header = this.httpOptions;
        }
        if (this.requestParams.data) {
            let urlReq = '?';
            Object.keys(this.requestParams.data).forEach(k => {
                urlReq += `${k}=${encodeURI(this.requestParams.data[k])}&`;
            });
            urlReq = urlReq.substr(0, urlReq.length - 1);
            this.requestParams.url += urlReq;
        }
        return this.http.delete(this.requestParams.url, this.modifyHeader(this.requestParams.header));
    }
}
