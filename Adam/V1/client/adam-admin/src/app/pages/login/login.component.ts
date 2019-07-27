import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interfaceUrl, errorInfo } from '../../common/commonInfo';
import { request } from '../../common/utils';
import { adminInfo } from '../../service/AdminInfoDb.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginName: string;
  loginPwd: string;
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (!this.loginName || !this.loginPwd || this.loginName.length !== 11) {
      alert('请完善登录信息！');
      return;
    }
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const httpRequest = request(this.httpClient, interfaceUrl.login.cell
      + `?phone=${this.loginName}&password=${this.loginPwd}`, {
      }, httpOptions);
    if (httpRequest.get) {
      httpRequest.get()
        .subscribe(
          resp => {
            console.log(resp);
            if (resp['data']) {
              if (resp['code'] && Number(resp['code']) === 200) {
                adminInfo.adminName = resp['data']['profile']['nickname'];
                adminInfo.adminAvatar = resp['data']['profile']['avatarUrl'];
                adminInfo.adminToken = resp['data']['profile']['birthday'].toString();
                adminInfo.adminState = 1;
                adminInfo.id = Number(resp['data']['profile']['userId']) || 0;
                // setTimeout(() => {
                //   self.router.navigate(['/']);
                // });
              } else {
                alert(resp['message'] || errorInfo.netError);
              }
            }
          },
          err => {
            if (err.error) {
              console.error(err.error);
              adminInfo.adminState = -1;
              alert(err.error['message'] || errorInfo.netError);
            }
          }
        );
    } else {
      alert(errorInfo.netError);
      return;
    }
  }

}
