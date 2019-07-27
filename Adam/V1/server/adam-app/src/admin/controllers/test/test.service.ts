import { Injectable } from '@nestjs/common';
import { TestCreateDto } from 'admin/data/test/test.dto';
import { Test } from 'admin/data/test/test.interface';
import { ReturnResponse } from 'utils/return/return-response.service';
import { ReturnObj } from 'utils/return/retrun-object.interface';

@Injectable()
export class TestService {
    private readonly tests: Test[] = [];
    private returnResponse: ReturnResponse;

    constructor() { }

    create(testCreateDto: TestCreateDto): ReturnObj {
        if (!testCreateDto.id) { return this.returnResponse.Error(); }
        const test: Test = new Test();
        test.setId(testCreateDto.id);
        test.setName(testCreateDto.name || '');
        this.tests.push(test);
        return this.returnResponse.Success();
    }

    find(id: number): ReturnObj {
        if (this.tests[0].getId() <= 0) {
            return this.returnResponse.Error();
        } else {
            return this.returnResponse.Success({
                data: this.tests[0].toJson(),
            });
        }
    }

    findAll(query: object): ReturnObj {
        return new ReturnResponse().Success({
            data: this.tests,
        });
    }
}