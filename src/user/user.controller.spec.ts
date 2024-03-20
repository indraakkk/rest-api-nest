import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as nmh from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('GET/ api/users/sample should be defined GET', () => {
    const id = '1';
    expect(controller.get(id)).toBe(`My id is ${id}`);
  });

  it('POST/ api/users should be defined POST', () => {
    expect(controller.post()).toBe('POST');
  });

  it('should return success set cookie', () => {
    const response = nmh.createResponse();
    controller.setCookie('Indra Putra', response);

    expect(response._getStatusCode()).toBe(200);
    expect(response._getData()).toBe('Success Set Cookie');
  });
});
