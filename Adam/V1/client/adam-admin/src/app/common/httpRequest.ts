import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * http请求
 *
 * @export
 * @class HttpRequest
 * @param {object} requestParams 包含请求的参数形如：
 * {
 *   url:"",
 *   data:{},
 *   header:{ 'Content-Type': 'application/json' }
 *   type:('get'|'post'|'put'|'delete'|'patch')
 * }
 */
@Injectable()
export class HttpRequest {
    private requestParams: object = {
        url: '',
        data: {},
        header: httpOptions,
        type: 'get',
    };
    private http: HttpClient;
    /**
     *Creates an instance of HttpRequest.
     * @param {object} requestParams 包含请求的参数形如：
    * {
    *   url:"",
    *   data:{},
    *   header:{ 'Content-Type': 'application/json' }
    *   type:('get'|'post'|'put'|'delete'|'patch')
    * }
     * @param {HttpClient} http
     * @memberof HttpRequest
     */
    constructor(requestParams: object, http: HttpClient) {
        this.requestParams = requestParams;
        this.http = http;
    }

    get() {
        if (!this.requestParams || !this.requestParams['url']) {
            return null;
        }
        if (!this.requestParams['header']) {
            this.requestParams['header'] = httpOptions;
        }
        if (this.requestParams['data']) {
            let urlReq = '?';
            Object.keys(this.requestParams['data']).forEach(k => {
                urlReq += `${k}=${encodeURI(this.requestParams['data'][k])}&`;
            });
            urlReq = urlReq.substr(0, urlReq.length - 1);
            this.requestParams['url'] += urlReq;
        }
        return this.http.get(this.requestParams['url'], this.requestParams['header']);
    }

    post() {
        if (!this.requestParams || !this.requestParams['url']) {
            return null;
        }
        if (!this.requestParams['data']) {
            this.requestParams['data'] = {};
        }
        if (!this.requestParams['header']) {
            this.requestParams['header'] = httpOptions;
        }
        return this.http.post(this.requestParams['url'], this.requestParams['data'], this.requestParams['header']);
    }

    put() {
        if (!this.requestParams || !this.requestParams['url']) {
            return null;
        }
        if (!this.requestParams['data']) {
            this.requestParams['data'] = {};
        }
        if (!this.requestParams['header']) {
            this.requestParams['header'] = httpOptions;
        }
        return this.http.put(this.requestParams['url'], this.requestParams['data'], this.requestParams['header']);
    }
    delete() {
        if (!this.requestParams || !this.requestParams['url']) {
            return null;
        }
        if (!this.requestParams['header']) {
            this.requestParams['header'] = httpOptions;
        }
        if (this.requestParams['data']) {
            let urlReq = '?';
            Object.keys(this.requestParams['data']).forEach(k => {
                urlReq += `${k}=${encodeURI(this.requestParams['data'][k])}&`;
            });
            urlReq = urlReq.substr(0, urlReq.length - 1);
            this.requestParams['url'] += urlReq;
        }
        return this.http.delete(this.requestParams['url'], this.requestParams['header']);
    }
    patch() {
        if (!this.requestParams || !this.requestParams['url']) {
            return null;
        }
        if (!this.requestParams['data']) {
            this.requestParams['data'] = {};
        }
        if (!this.requestParams['header']) {
            this.requestParams['header'] = httpOptions;
        }
        return this.http.patch(this.requestParams['url'], this.requestParams['data'], this.requestParams['header']);
    }
}
