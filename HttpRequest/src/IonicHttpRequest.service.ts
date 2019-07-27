import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IonicHttpRequest {
    constructor(private http: Http) {
    }
    public get(obj) {
        obj = obj || {};
        obj['url'] = obj['url'] || "";
        let options = {};
        if (obj['header'] && typeof obj['header'] === 'object') {
            let headers = new Headers();
            Object.keys(obj['header']).forEach(el => {
                headers.append(el, obj['header'][el]);
            });
            options['headers'] = headers;
        }
        if (obj['data'] && typeof obj['data'] === 'object') {
            let data = [];
            Object.keys(obj['data']).forEach(el => {
                data.push(`${el}=${obj['data'][el]}`);
            });
            obj['url'] = obj['url'] + "?" + data.join('&');
        }
        let optionObj = new RequestOptions(options);
        return this.http.get(obj['url'], optionObj).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }
    public post(obj) {
        obj = obj || {};
        obj['url'] = obj['url'] || "";
        obj['data'] = obj['data'] || "";
        let options = {};
        if (obj['header'] && typeof obj['header'] === 'object') {
            let headers = new Headers();
            Object.keys(obj['header']).forEach(el => {
                headers.append(el, obj['header'][el]);
            });
            options['headers'] = headers;
        }
        let optionObj = new RequestOptions(options);
        return this.http.post(obj['url'], obj['data'], optionObj).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }


    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
