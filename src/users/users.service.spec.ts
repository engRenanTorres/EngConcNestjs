import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './models/role.enum';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let id: string;
  beforeEach(async () => {
    service = new UsersService();
    id = '156';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*it('should create a user', async () => {
    const expectOutputUser = {
      name: 'Usuario Teste',
      email: 'usuario@teste.com',
      password: 'S3nh@Dificil',
      roles: Role.ADM,
    };

    const createUserDTO: CreateUserDto = {
      name: 'Usuario Teste',
      email: 'usuario@teste.com',
      password: 'S3nh@Dificil',
      roles: Role.ADM,
    };
    const mockUsersModel = {
      create: (dto: CreateUserDto) =>
        jest.fn().mockReturnValue(Promise.resolve(createUserDTO)),
      save: jest.fn().mockReturnValue(Promise.resolve(createUserDTO)),
    };
    /@ts-expect-error defined part of methods
    service['usersModel'] = mockUsersModel;
    const newUser = await service.create(createUserDTO);

    expect(mockUsersModel.save).toHaveBeenCalled();
    expect(newUser).toMatchObject(expectOutputUser);
  });*/
  describe('Updating user', () => {
    it('should call save user after update', async () => {
      const expectOutputUser = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
        roles: Role.ADM,
      };

      const updateeUserDTO: UpdateUserDto = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
        roles: Role.ADM,
      };
      const mockUsersModel = {
        update: (dto: CreateUserDto) =>
          jest.fn().mockReturnValue(Promise.resolve(updateeUserDTO)),
        findByIdAndUpdate: jest
          .fn()
          .mockReturnValue(Promise.resolve(updateeUserDTO)),
        //save: jest.fn().mockReturnValue(Promise.resolve(updateeUserDTO)),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;
      const user = await service.update('1', updateeUserDTO);

      expect(mockUsersModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(user).toMatchObject(expectOutputUser);
    });
    it('should throw a notFoundExeption when dont exists user with the selected id', async () => {
      const updateeUserDTO: UpdateUserDto = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
        roles: Role.ADM,
      };
      const mockUsersModel = {
        update: jest.fn().mockReturnValue(Promise.resolve(null)),
        findByIdAndUpdate: jest.fn().mockReturnValue(Promise.resolve(null)),
        //save: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;

      async function update() {
        await service.update(`${id}`, updateeUserDTO);
      }

      await expect(update()).rejects.toThrow();
      expect(mockUsersModel.findByIdAndUpdate).toHaveBeenCalled();
      //expect(mockUsersModel.save).not.toHaveBeenCalled();
    });
  });

  describe('Finding users', () => {
    it('should list users', async () => {
      const expectOutputUsers = [
        {
          name: 'Usuario Teste',
          email: 'usuario@teste.com',
          password: 'S3nh@Dificil',
          roles: Role.ADM,
        },
      ];
      const mockUsersModel = {
        findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
        find: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;
      const users = await service.findAll();
      expect(mockUsersModel.find).toHaveBeenCalled();
      expect(expectOutputUsers).toStrictEqual(users);
    });
    it('should get one user', async () => {
      const id = '156';
      const expectOutputUser = [
        {
          id: '156',
          name: 'Usuario Teste',
          email: 'usuario@teste.com',
          password: 'S3nh@Dificil',
          roles: Role.ADM,
        },
      ];
      const mockUsersModel = {
        findById: jest.fn().mockReturnValue(Promise.resolve(expectOutputUser)),
        //findById: jest.fn().mockReturnValue(Promise.resolve(expectOutputUser)),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;
      const user = await service.findById(id);
      expect(mockUsersModel.findById).toHaveBeenCalled();
      expect(expectOutputUser).toStrictEqual(user);
    });
    it('should throw a notFoundExeption when trying to find a user by id that not exists', async () => {
      const id = 1;

      const mockUsersModel = {
        findById: jest.fn().mockReturnValue(Promise.resolve(null)),
        //findOneBy: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;

      async function findbyId() {
        await service.findById(`${id}`);
      }

      await expect(findbyId()).rejects.toThrow(NotFoundException);
      expect(mockUsersModel.findById).toHaveBeenCalled();
    });
  });

  describe('Removing users', () => {
    it('should remove one user', async () => {
      const id = 1;
      const expectOutputUser = [
        {
          id: 1,
          nome: 'Usuario Teste',
          email: 'usuario@teste.com',
          password: 'S3nh@Dificil',
          roles: Role.ADM,
        },
      ];
      const mockUsersModel = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputUser)),
        remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputUser)),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;
      const user = await service.delete(`${id}`);
      expect(mockUsersModel.remove).toHaveBeenCalled();
      expect(expectOutputUser).toStrictEqual(user);
    });
    it('should throw a notFoundExeption when trying to remove a user that not exists', async () => {
      const id = 1;

      const mockUsersModel = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        remove: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;

      async function removeById() {
        await service.delete(`${id}`);
      }

      await expect(removeById()).rejects.toThrow(NotFoundException);
      expect(mockUsersModel.remove).not.toHaveBeenCalled();
    });
  });
});
