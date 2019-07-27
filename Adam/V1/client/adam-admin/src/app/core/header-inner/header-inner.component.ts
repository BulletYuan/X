import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interfaceUrl, errorInfo } from '../../common/commonInfo';
import { request } from '../../common/utils';
import { adminInfo } from '../../service/AdminInfoDb.storage';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent {
  adminInfo: AdminInfoObject = {
    adminName: '',
    adminToken: '',
    adminState: -1,
    adminRole: -1,
    id: 0,
  };
  httpRequest: any;
  httpOptions: object;

  constructor(private modalService: NgbModal, private httpClient: HttpClient, private router: Router) {
    adminInfo.adminRole = 0;
    this.adminInfo = adminInfo;
  }

  // 登出
  logout() {
    if (!adminInfo.adminToken) { return; }
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Authorization': adminInfo.adminToken })
    };
    const httpRequest = request(this.httpClient, interfaceUrl.logout, {}, httpOptions);
    if (httpRequest.post) {
      httpRequest.post()
        .subscribe(
          resp => {
            if (resp['data']) {
              if (resp['code'] && Number(resp['code']) === 2000001) {
                adminInfo.adminName = '';
                adminInfo.adminToken = '';
                adminInfo.adminState = -1;
                adminInfo.adminRole = -1;
                adminInfo.id = 0;
                setTimeout(() => {
                  this.router.navigate(['/login']);
                });
              } else {
                alert(resp['message'] || errorInfo.netError);
              }
            }
          },
          err => {
            if (err.error) {
              adminInfo.adminState = 0;
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
