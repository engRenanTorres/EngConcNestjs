import { Injectable } from '@nestjs/common';
import { CreateDefaltUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { DataBaseError } from '../common/errors/types/DatabaseError';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  @InjectModel('User')
  private readonly usersModel: Model<User>;

  async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersModel.findById({ _id: id });
    this.checkIfUserExiste(user, id);
    return user;
  }

  async findByEmail(email: string): Promise<User> | null {
    const user = await this.usersModel.findOne({ email });
    try {
      this.checkIfUserExiste(user, email);
    } catch (error) {
      throw new NotFoundError(error.message);
    }
    return user;
  }

  async create(createUserDTO: CreateDefaltUserDto): Promise<User> {
    try {
      const user = new this.usersModel(createUserDTO); // Cria o objeto sem salvar no bd
      return await user.save();
      /*const user = await this.usersModel.collection.insertOne(createUserDTO);
      return { ...createUserDTO, roles: 4, _id: user.insertedId } as User;*/
    } catch (error) {
      throw new DataBaseError(error.message, error.code);
    }
  }

  async update(id: string, updateUserDTO: UpdateUserDto) {
    /*const user = await this.usersModel.findByIdAndUpdate(id, {
      $set: updateUserDTO,
    });*/
    const user = await this.usersModel.findOne({ _id: id });
    this.checkIfUserExiste(user, id);
    if (!updateUserDTO.password) {
      return user.updateOne(updateUserDTO);
    }
    const userWithHashPwd = {
      ...updateUserDTO,
      password: await bcrypt.hash(updateUserDTO.password, 10),
    };
    return user.updateOne(userWithHashPwd);
  }

  async delete(email: string) {
    const user = await this.usersModel.findOne({ email });
    this.checkIfUserExiste(user, email);
    //const deleteResult = await this.usersModel.deleteOne({ email });
    return user.deleteOne();
  }

  private checkIfUserExiste(user: object, id: string) {
    if (!user) {
      throw new NotFoundError(`User not found by identifier ${id}`);
    }
  }
}
