import { ReturnMsg } from './return-msg.interface';
import { ReturnCode } from './return-code.interface';
import { ReturnObj } from './retrun-object.interface';

export class ReturnResponse {

    private return: ReturnObj = {
        statusCode: 0,
        data: {},
        message: '',
    };

    constructor() {
    }

    /**
     * 返回数据json
     *
     * @param {object} [data={}]
     * @returns {object}
     * @memberof ReturnResponse {statusCode:200,data,message:"请求完成"}
     */
    Data(data: object = {}, msg: string = new ReturnMsg().defaultMsg): object {
        this.return.statusCode = new ReturnCode().successCode;
        this.return.data = data;
        this.return.message = msg;
        return this.return;
    }

    /**
     * 返回成功json
     *
     * @param {object} [data={}]
     * @returns
     * @memberof ReturnResponse {statusCode:200,data,message:"请求成功"}
     */
    Success(data: object = {}, msg: string = new ReturnMsg().successMsg) {
        this.return.statusCode = new ReturnCode().successCode;
        this.return.data = data;
        this.return.message = msg;
        return this.return;
    }

    /**
     * 返回错误json
     *
     * @param {object} [data={}] 数据信息
     * @returns
     * @memberof ReturnResponse {statusCode:500,data,message:"请求出错"}
     */
    Error(data: object = {}, msg: string = new ReturnMsg().errorMsg) {
        this.return.statusCode = new ReturnCode().errorCode;
        this.return.data = data;
        this.return.message = msg;
        return this.return;
    }

    /**
     * 返回失败json
     *
     * @param {object} [data={}]
     * @returns
     * @memberof ReturnResponse {statusCode:500,data,message:"请求失败"}
     */
    Fail(data: object = {}, msg: string = new ReturnMsg().failureMsg) {
        this.return.statusCode = new ReturnCode().otherCode;
        this.return.data = data;
        this.return.message = msg;
        return this.return;
    }

    /**
     * 返回警告json
     *
     * @param {object} [data={}]
     * @returns
     * @memberof ReturnResponse {statusCode:300,data,message:"出现警告"}
     */
    Warn(data: object = {}, msg: string = new ReturnMsg().warnMsg) {
        this.return.statusCode = new ReturnCode().warnCode;
        this.return.data = data;
        this.return.message = msg;
        return this.return;
    }
}