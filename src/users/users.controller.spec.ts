import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let service: UsersService;
  let controller: UsersController;
  let id: string;

  beforeEach(async () => {
    service = new UsersService();
    controller = new UsersController(service);
    id = '156';
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
