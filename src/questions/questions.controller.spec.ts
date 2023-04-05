import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './models/question.model';

describe('QuestionsController', () => {
  let service: QuestionsService;
  let controller: QuestionsController;
  let normalQuestion: Question;

  beforeEach(async () => {
    service = new QuestionsService();
    controller = new QuestionsController(service);
    normalQuestion = {
      _id: 'xpto',
      name: 'Usuario Teste',
      email: 'usuario@teste.com',
      password: 'S3nh@Dificil',
      roles: Role.ADM,
    } as Question;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve([normalQuestion]));

      expect(await controller.findAll()).toBe(normalQuestion);
    });
  });

  describe('findById', () => {
    it('should return a user', async () => {
      jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(normalQuestion));

      expect(await controller.findById(normalQuestion.id)).toBe(normalQuestion);
    });
  });
  describe('create', () => {
    it('should return a user', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(normalQuestion));

      expect(await controller.create(normalQuestion)).toBe(normalQuestion);
    });
  });
  describe('update', () => {
    it('should return a user', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(normalQuestion));

      expect(await controller.update(normalQuestion.id, normalQuestion)).toBe(
        normalQuestion,
      );
    });
  });
});
