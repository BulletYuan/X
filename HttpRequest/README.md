# HttpRequest

__须在RxJs依赖下__

## 使用说明

1. 在项目中执行命令 `npm i rxjs -S`

2. 在项目的 `app.component.ts` 文件中引入 `import { HttpRequest } from '...your path.../HttpRequest.service';`

3. 调用方式

支持5种请求方式 `get` | `post` | `put` | `delete`

```javascript

    const httpRequest = new HttpRequest();
    httpRequest.request({
      url: 'http://ydgf.sohu.com/schedule/index.json',
      data: {},
      header: {}
    }).subscribe(data => {
      console.log(data);
    });;

```

# NgHttpRequest

__须在angular 6+项目环境下__

## 使用说明

1. 在项目的 `app.module.ts` 文件中引入 `import { HttpClientModule } from '@angular/common/http';`，并且在 `imports` 中引入模块 `HttpClientModule`

2. 在项目的 `app.component.ts` 文件中引入 `import { HttpClient } from '@angular/common/http';`，并且在 `constructor()` 中声明 `constructor(private httpClient: HttpClient)`

3. 在项目的 `app.component.ts` 文件中引入 `import { NgHttpRequest } from '...your path.../NgHttpRequest.service';`

4. 调用方式

支持5种请求方式 `get` | `post` | `put` | `delete`

```javascript

    const httpRequest = new NgHttpRequest(this.httpClient);
    httpRequest.request({
      url: 'http://ydgf.sohu.com/schedule/index.json',
      data: {},
      header: {}
    }).subscribe(data => {
      console.log(data);
    });;

```