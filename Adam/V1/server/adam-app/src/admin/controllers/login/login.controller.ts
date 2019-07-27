import { Controller, Get, Post, Put, Delete, Res, Req, Body, Param, Query, HttpStatus, HttpCode } from '@nestjs/common';

import { LoginService } from './login.service';
import { log } from 'util';
import { SigninDto } from 'admin/data/login/login.dto';

@Controller('admin/login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Post()
    @HttpCode(200)
    async signin(@Body() signinObj: SigninDto) {
        return await this.loginService.getSigninObj(signinObj);
    }
    @Get()
    @HttpCode(200)
    async refreshSign(@Body() signinObj: SigninDto) {
        return await this.loginService.getSigninObj(signinObj);
    }
}
