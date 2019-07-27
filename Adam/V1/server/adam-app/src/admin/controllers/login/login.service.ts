import { Injectable, HttpService } from '@nestjs/common';
import { ReturnResponse } from 'utils/return/return-response.service';
import { SigninDto } from 'admin/data/login/login.dto';
import { isMail, isPhone } from 'utils/common/commonUtils';

@Injectable()
export class LoginService {
    returnResponse: ReturnResponse = new ReturnResponse();

    constructor(private readonly httpService: HttpService) {
    }

    async getSigninObj(signinObj: SigninDto) {
        if (signinObj.name && signinObj.pwd) {
            if (isMail(signinObj.name)) {
                return await this.mailSignin(signinObj).toPromise()
                    .then(res => {
                        return this.returnResponse.Data(res.data);
                    })
                    .catch(err => {
                        return this.returnResponse.Error({}, err.error || '请求错误');
                    });
            } else if (isPhone(signinObj.name)) {
                return await this.phoneSignin(signinObj).toPromise()
                    .then(res => {
                        return this.returnResponse.Data(res.data);
                    })
                    .catch(err => {
                        return this.returnResponse.Error({}, err.error || '请求错误');
                    });
            } else {
                return this.returnResponse.Error({}, '只能使用邮箱或手机号登录');
            }
        } else {
            return this.returnResponse.Error({}, '登录名或密码不能为空');
        }
    }
    private mailSignin(signinObj: SigninDto) {
        return this.httpService.get(
            `http://localhost:3000/login?email=${signinObj.name}&password=${signinObj.pwd}&timestamp=${new Date().getTime()}`,
        );
    }
    private phoneSignin(signinObj: SigninDto) {
        return this.httpService.get(
            `http://localhost:3000/login/cellphone?phone=${signinObj.name}&password=${signinObj.pwd}&timestamp=${new Date().getTime()}`,
        );
    }

    async refreshSignin(){
        
    }

}