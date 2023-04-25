import { Injectable } from '@nestjs/common';
import { CreateDefaltInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto/update-institute.dto';
import { Institute } from './models/institute.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { DataBaseError } from '../common/errors/types/DatabaseError';

@Injectable()
export class InstitutesService {
  @InjectModel('Institute')
  private readonly institutesModel: Model<Institute>;

  async findAll(): Promise<Institute[]> {
    return this.institutesModel.find();
  }

  async findById(id: string): Promise<Institute> {
    const institute = await this.institutesModel.findById({ _id: id });
    this.checkIfInstituteExiste(institute, id);
    return institute;
  }

  async findByName(name: string): Promise<Institute> | null {
    const institute = await this.institutesModel.findOne({ name });
    try {
      this.checkIfInstituteExiste(institute, name);
    } catch (error) {
      throw new NotFoundError(error.message);
    }
    return institute;
  }

  async create(
    createInstituteDTO: CreateDefaltInstituteDto,
  ): Promise<Institute> {
    try {
      const institute = new this.institutesModel(createInstituteDTO); // Cria o objeto sem salvar no bd
      return await institute.save();
      /*const institute = await this.institutesModel.collection.insertOne(createInstituteDTO);
      return { ...createInstituteDTO, roles: 4, _id: institute.insertedId } as Institute;*/
    } catch (error) {
      throw new DataBaseError(error.message, error.code);
    }
  }

  async update(id: string, updateInstituteDTO: UpdateInstituteDto) {
    /*const institute = await this.institutesModel.findByIdAndUpdate(id, {
      $set: updateInstituteDTO,
    });*/
    const institute = await this.institutesModel.findOne({ _id: id });
    this.checkIfInstituteExiste(institute, id);
    return institute.updateOne(updateInstituteDTO);
  }

  async delete(name: string) {
    const institute = await this.institutesModel.findOne({ name });
    this.checkIfInstituteExiste(institute, name);
    //const deleteResult = await this.institutesModel.deleteOne({ name });
    return institute.deleteOne();
  }

  private checkIfInstituteExiste(institute: object, id: string) {
    if (!institute) {
      throw new NotFoundError(`Institute not found by identifier ${id}`);
    }
  }
}
