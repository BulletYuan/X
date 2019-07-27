import { adminInfo } from '../service/AdminInfoDb.storage';
import { HttpRequest } from './httpRequest';
import { server } from './commonInfo';
import { HttpClient } from '@angular/common/http';

const authAdmin = {
    haveLocalStorage() {
        if (!adminInfo || !adminInfo.id || !adminInfo.adminToken || adminInfo.adminState !== 0) {
            return false;
        }
        return true;
    },
    async haveAuthState(httpclient: HttpClient, adminToken: string = '') {
        if (adminToken === '') {
            return false;
        }
        const http = new HttpRequest({
            url: `${server.host}`,
            data: {
                adminToken,
            }
        }, httpclient);
        await http.get().subscribe(resp => {
            console.log(resp);
            if (resp) {
                return true;
            }
            return false;
        });
    },
    navigateToLogin(router, _fn: Function = function () { }) {
        _fn();
        router.navigateByUrl('/login');
    },
    authUser(uid: number, token: string) {
        if (!uid || !token) {
            return false;
        }
        if (this.haveLocalStorage()) {
            if (adminInfo.id === uid && adminInfo.adminToken === token) {
                if (this.haveAuthState()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};

export { authAdmin };
