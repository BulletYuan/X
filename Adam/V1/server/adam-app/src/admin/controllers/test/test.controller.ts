import { Controller, Get, Post, Put, Delete, Res, Body, Param, Query, HttpStatus, HttpCode } from '@nestjs/common';

import { TestService } from './test.service';
import { TestCreateDto } from 'admin/data/test/test.dto';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) { }

    @Post()
    @HttpCode(200)
    async create(@Res() res, @Body() testCreateDto: TestCreateDto) {
        return await this.testService.create(testCreateDto);
    }

    @Get()
    @HttpCode(200)
    async findAll(@Query() query) {
        return await this.testService.findAll(query);
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id') id) {
        return await this.testService.find(Number(id));
    }

    @Put(':id')
    @HttpCode(200)
    update(@Param('id') id, @Body() testCreateDto: TestCreateDto) {
        return `this action updates one test object #${id}`;
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id') id) {
        return `this action removes one test object #${id}`;
    }
}
