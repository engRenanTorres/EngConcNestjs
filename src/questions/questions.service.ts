import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto/update-question.dto';
import { Question } from './models/question.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { DataBaseError } from '../common/errors/types/DatabaseError';
import { ReqHeaders } from '../auth/models/req-headers.model';
import { getCurrentUser } from '../helpers/getCurrentUser';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QuestionsService {
  constructor(private readonly jwtService: JwtService) {}
  @InjectModel('Question')
  private readonly questionsModel: Model<Question>;

  async findAll(): Promise<Question[]> {
    return this.questionsModel.find();
  }

  async findById(id: string): Promise<Question> {
    const question = await this.questionsModel.findById({ _id: id });
    this.checkIfQuestionExiste(question, id);
    return question;
  }

  async findByAuthor(authorId: string): Promise<Question> | null {
    const question = await this.questionsModel.findOne({ author: authorId });
    try {
      this.checkIfQuestionExiste(question, authorId);
    } catch (error) {
      throw new NotFoundError(error.message);
    }
    return question;
  }

  async create(
    createQuestionDTO: CreateQuestionDto,
    headers: ReqHeaders,
  ): Promise<Question> {
    try {
      const userData = await getCurrentUser(headers, this.jwtService);
      const newUser = {
        author: userData.sub,
        ...createQuestionDTO,
      };
      //validar se as choices recebidas contém as propriedades do Choice comparando com (Object.Keys())
      const question = new this.questionsModel(newUser); // Cria o objeto sem salvar no bd
      return await question.save();
      /*const question = await this.questionsModel.collection.insertOne(createQuestionDTO);
      return { ...createQuestionDTO, roles: 4, _id: question.insertedId } as Question;*/
    } catch (error) {
      throw new DataBaseError(error.message, error.code);
    }
  }

  async update(id: string, updateQuestionDTO: UpdateQuestionDto) {
    /*const question = await this.questionsModel.findByIdAndUpdate(id, {
      $set: updateQuestionDTO,
    });*/
    const question = await this.questionsModel.findOne({ _id: id });
    this.checkIfQuestionExiste(question, id);

    return question.updateOne(updateQuestionDTO);
  }

  async delete(id: string) {
    const question = await this.questionsModel.findOne({ _id: id });
    this.checkIfQuestionExiste(question, id);
    //const deleteResult = await this.questionsModel.deleteOne({ email });
    return question.deleteOne();
  }

  private checkIfQuestionExiste(question: object, id: string) {
    if (!question) {
      throw new NotFoundError(`Question not found by identifier ${id}`);
    }
  }
}
