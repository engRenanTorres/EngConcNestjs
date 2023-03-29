import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Role } from '../../src/users/models/role.enum';
import { CreateDefaltUserDto } from '../../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/users/dto/update-user.dto/update-user.dto';
import { AppModule } from '../../src/app.module';

//Por enquanto é preciso criar um user adm no bd

describe('Users: /users (e2e)', () => {
  let app: INestApplication;
  let id: string;
  let auth: string;

  const user: CreateDefaltUserDto = {
    name: 'Rodrigo',
    password: 'TestBolado3!',
    email: 'rod@rod.com.br',
  };

  const login = {
    email: 'adm@test.com.br',
    password: 'TestBolado3!',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  /* O acesso a criação de usuários está liberado
  it('should denny access to Create (POST) /users', async () => {
    const createTest = async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/api/users')
        .send(user);
      expect(createResponse.status).toStrictEqual(400);
    };
    return await createTest();
  });*/

  it('should Create (POST) /users', async () => {
    const createTest = async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/api/users')
        .send(user);
      //.set('Authorization', `Bearer ${auth}`);
      id = createResponse.body._id;
      console.log(createResponse.body);

      const expectedUser = {
        name: 'Rodrigo',
        roles: Role.READER,
        email: 'rod@rod.com.br',
      };

      expect(createResponse.status).toStrictEqual(HttpStatus.CREATED);
      expect(createResponse.body).toMatchObject(expectedUser);
    };
    return await createTest();
  });

  it.todo('should deny to create user when it send incorrect params');

  it('should denny access to update (PUT) /users', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(login);

    auth = response.body.token;

    const updateUser: UpdateUserDto = {
      ...user,
      name: 'Augusto',
      password: undefined,
    };

    const updateTest = async () => {
      return await request(app.getHttpServer())
        .patch('/api/users/' + id)
        .send(updateUser)
        .expect(400);
    };
    return await updateTest();
  });

  it('should update (PATCH) /users', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(login);

    auth = response.body.token;

    const updateUser: UpdateUserDto = {
      ...user,
      name: 'Augusto',
      password: undefined,
    };

    const updateTest = async () => {
      return await request(app.getHttpServer())
        .patch('/api/users/' + id)
        .send(updateUser)
        .set('Authorization', `Bearer ${auth}`)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedResponse = {
            acknowledged: true,
            matchedCount: 1,
            modifiedCount: 1,
            upsertedCount: 0,
          };

          expect(body).toMatchObject(expectedResponse);
        });
    };
    return await updateTest();
  });
  it.todo('should (GET) /users');
  it('should denny access to remove (DELETE) /', async () => {
    const deleteTeste = async () => {
      return await request(app.getHttpServer())
        .delete(`/api/users/` + id)
        .expect(400);
    };
    return await deleteTeste();
  });

  it('should remove (DELETE) /', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(login);

    auth = response.body.token;
    const deleteTeste = async () => {
      return await request(app.getHttpServer())
        .delete(`/api/users/` + user.email)
        .set('Authorization', `Bearer ${auth}`)
        .expect(HttpStatus.NO_CONTENT);
    };
    return await deleteTeste();
  });
});
