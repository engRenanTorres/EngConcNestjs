import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Role } from '../users/models/role.enum';
import { UpdateQuestionDto } from './dto/update-question.dto/update-question.dto';
import { DataBaseError } from '../common/errors/types/DatabaseError';
import { NotFoundError } from '../common/errors/types/NotFoundError';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let id: string;
  beforeEach(async () => {
    service = new QuestionsService();
    id = '156';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockQuestionDTO = {
    name: 'Usuario Teste',
    email: 'usuario@teste.com',
    password: 'S3nh@Dificil',
    roles: Role.READER,
  };

  describe('create method', () => {
    it('should create a new question and return it', async () => {
      //const mockQuestion = new Question(mockQuestionDTO);
      const expectOutputQuestion = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
        roles: Role.READER,
      };

      const mockSave = jest.fn().mockResolvedValue(mockQuestionDTO);
      const mockModel = jest.fn().mockImplementation(() => ({
        save: mockSave,
      }));
      //@ts-expect-error defined part of methods
      service['questionsModel'] = mockModel;

      const result = await service.create(mockQuestionDTO);

      expect(mockModel).toHaveBeenCalledWith(mockQuestionDTO);
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(expectOutputQuestion);
    });

    it('should throw a database error if there is an error saving the question', async () => {
      await expect(service.create(mockQuestionDTO)).rejects.toThrow(
        DataBaseError,
      );
    });
  });

  describe('Updating question', () => {
    it('should call save question after update', async () => {
      const expectOutputQuestion = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
        //roles: Role.ADM,
      };

      const updateeQuestionDTO: UpdateQuestionDto = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
      };
      const mockQuestionsModel = {
        update: (dto: CreateQuestionDto) =>
          jest.fn().mockReturnValue(Promise.resolve(dto)),
        findOne: jest.fn().mockReturnValue(
          Promise.resolve({
            ...updateeQuestionDTO,
            updateOne: jest
              .fn()
              .mockReturnValue(Promise.resolve(updateeQuestionDTO)),
          }),
        ),
      };
      //@ts-expect-error defined part of methods
      service['questionsModel'] = mockQuestionsModel;
      const question = await service.update('1', updateeQuestionDTO);

      expect(mockQuestionsModel.findOne).toHaveBeenCalled();
      expect(question).toMatchObject(expectOutputQuestion);
    });

    it('should call findOne and throw error when update question that dont exist', async () => {
      const updateeQuestionDTO: UpdateQuestionDto = {
        name: 'Usuario Teste',
        email: 'usuario@teste.com',
        password: 'S3nh@Dificil',
      };
      const mockQuestionsModel = {
        updateOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        //save: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service['questionsModel'] = mockQuestionsModel;

      async function update() {
        await service.update(`${id}`, updateeQuestionDTO);
      }

      await expect(update()).rejects.toThrow();
      expect(mockQuestionsModel.findOne).toHaveBeenCalled();
      //expect(mockQuestionsModel.save).not.toHaveBeenCalled();
    });
  });

  describe('Finding questions', () => {
    it('should list questions', async () => {
      const expectOutputQuestions = [
        {
          name: 'Usuario Teste',
          email: 'usuario@teste.com',
          password: 'S3nh@Dificil',
          roles: Role.ADM,
        },
      ];
      const mockQuestionsModel = {
        findAll: jest
          .fn()
          .mockReturnValue(Promise.resolve(expectOutputQuestions)),
        find: jest.fn().mockReturnValue(Promise.resolve(expectOutputQuestions)),
      };
      //@ts-expect-error defined part of methods
      service['questionsModel'] = mockQuestionsModel;
      const questions = await service.findAll();
      expect(mockQuestionsModel.find).toHaveBeenCalled();
      expect(expectOutputQuestions).toStrictEqual(questions);
    });
    it('should get one question', async () => {
      const id = '156';
      const expectOutputQuestion = [
        {
          id: '156',
          name: 'Usuario Teste',
          email: 'usuario@teste.com',
          password: 'S3nh@Dificil',
          roles: Role.ADM,
        },
      ];
      const mockQuestionsModel = {
        findById: jest
          .fn()
          .mockReturnValue(Promise.resolve(expectOutputQuestion)),
        //findById: jest.fn().mockReturnValue(Promise.resolve(expectOutputQuestion)),
      };
      //@ts-expect-error defined part of methods
      service['questionsModel'] = mockQuestionsModel;
      const question = await service.findById(id);
      expect(mockQuestionsModel.findById).toHaveBeenCalled();
      expect(expectOutputQuestion).toStrictEqual(question);
    });
    it('should throw a notFoundError when trying to find a question by id that not exists', async () => {
      const id = 1;

      const mockQuestionsModel = {
        findById: jest.fn().mockReturnValue(Promise.resolve(null)),
        //findOneBy: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service['questionsModel'] = mockQuestionsModel;

      async function findbyId() {
        await service.findById(`${id}`);
      }

      await expect(findbyId()).rejects.toThrow(NotFoundError);
      expect(mockQuestionsModel.findById).toHaveBeenCalled();
    });
  });

  describe('Removing questions', () => {
    it('should remove one question', async () => {
      const id = 1;
      const expectOutputQuestion = [
        {
          id: 1,
          nome: 'Usuario Teste',
          email: 'usuario@teste.com',
          password: 'S3nh@Dificil',
          roles: Role.ADM,
        },
      ];
      const mockQuestionsModel = {
        findOne: jest.fn().mockReturnValue(
          Promise.resolve({
            ...expectOutputQuestion,
            deleteOne: jest
              .fn()
              .mockReturnValue(Promise.resolve(expectOutputQuestion)),
          }),
        ),
      };
      //@ts-expect-error defined part of methods
      service['questionsModel'] = mockQuestionsModel;
      const question = await service.delete(`${id}`);
      expect(mockQuestionsModel.findOne).toHaveBeenCalled();
      expect(expectOutputQuestion).toStrictEqual(question);
    });
    it('should throw a notFoundError when trying to remove a question that not exists', async () => {
      const id = 1;

      const mockQuestionsModel = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        remove: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service['questionsModel'] = mockQuestionsModel;

      async function removeById() {
        await service.delete(`${id}`);
      }

      await expect(removeById()).rejects.toThrow(NotFoundError);
      expect(mockQuestionsModel.remove).not.toHaveBeenCalled();
    });
  });
});
