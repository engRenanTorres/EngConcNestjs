import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './models/role.enum';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { DataBaseError } from '../common/errors/types/DatabaseError';
import { NotFoundError } from '../common/errors/types/NotFoundError';

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

  const mockUserDTO = {
    name: 'Usuario Teste',
    email: 'usuario@teste.com',
    password: 'S3nh@Dificil',
    roles: Role.READER,
  };

  describe('create method', () => {
    it('should create a new user and return it', async () => {
      //const mockUser = new User(mockUserDTO);
      const expectOutputUser = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
        roles: Role.READER,
      };

      const mockSave = jest.fn().mockResolvedValue(mockUserDTO);
      const mockModel = jest.fn().mockImplementation(() => ({
        save: mockSave,
      }));
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockModel;

      const result = await service.create(mockUserDTO);

      expect(mockModel).toHaveBeenCalledWith(mockUserDTO);
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(expectOutputUser);
    });

    it('should throw a database error if there is an error saving the user', async () => {
      const mockError = new Error('Database error');
      const mockModel = jest.fn().mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(mockError),
      }));

      await expect(service.create(mockUserDTO)).rejects.toThrow(DataBaseError);
    });
  });

  describe('Updating user', () => {
    it('should call save user after update', async () => {
      const expectOutputUser = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
        //roles: Role.ADM,
      };

      const updateeUserDTO: UpdateUserDto = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
      };
      const mockUsersModel = {
        update: (dto: CreateUserDto) =>
          jest.fn().mockReturnValue(Promise.resolve(dto)),
        findOne: jest.fn().mockReturnValue(
          Promise.resolve({
            ...updateeUserDTO,
            updateOne: jest
              .fn()
              .mockReturnValue(Promise.resolve(updateeUserDTO)),
          }),
        ),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;
      const user = await service.update('1', updateeUserDTO);

      expect(mockUsersModel.findOne).toHaveBeenCalled();
      expect(user).toMatchObject(expectOutputUser);
    });

    it('should call findOne and throw error when update user that dont exist', async () => {
      const updateeUserDTO: UpdateUserDto = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
      };
      const mockUsersModel = {
        updateOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        //save: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;

      async function update() {
        await service.update(`${id}`, updateeUserDTO);
      }

      await expect(update()).rejects.toThrow();
      expect(mockUsersModel.findOne).toHaveBeenCalled();
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
    it('should throw a notFoundError when trying to find a user by id that not exists', async () => {
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

      await expect(findbyId()).rejects.toThrow(NotFoundError);
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
        findOne: jest.fn().mockReturnValue(
          Promise.resolve({
            ...expectOutputUser,
            deleteOne: jest
              .fn()
              .mockReturnValue(Promise.resolve(expectOutputUser)),
          }),
        ),
      };
      //@ts-expect-error defined part of methods
      service['usersModel'] = mockUsersModel;
      const user = await service.delete(`${id}`);
      expect(mockUsersModel.findOne).toHaveBeenCalled();
      expect(expectOutputUser).toStrictEqual(user);
    });
    it('should throw a notFoundError when trying to remove a user that not exists', async () => {
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

      await expect(removeById()).rejects.toThrow(NotFoundError);
      expect(mockUsersModel.remove).not.toHaveBeenCalled();
    });
  });
});
