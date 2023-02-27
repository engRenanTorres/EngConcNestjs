import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import {
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoError } from 'typeorm';

@Injectable()
export class UsersService {
  @InjectModel('User')
  private readonly usersModel: Model<User>;

  async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersModel.findById({ id: Number(id) });
    this.checkIfUserExiste(user, id);
    return user;
  }

  async findByEmail(email: string): Promise<User> | null {
    const user = await this.usersModel.findOne({ email });
    try {
      this.checkIfUserExiste(user, email);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return user;
  }

  async create(createUserDTO: CreateUserDto): Promise<User> {
    try {
      const user = new this.usersModel(createUserDTO); // Cria o objeto sem salvar no bd
      return await user.save();
    } catch (error) {
      if (error.message.includes('E11000'))
        throw new NotAcceptableException(error.message);
      throw new Error(error.message);
    }
  }

  async update(id: string, updateUserDTO: UpdateUserDto) {
    const user = await this.usersModel.findByIdAndUpdate(id, {
      $set: updateUserDTO,
    });
    this.checkIfUserExiste(user, id);
    return user;
  }

  async delete(email: string) {
    const user = await this.usersModel.findOne({ email });
    this.checkIfUserExiste(user, email);
    const deleteResult = await this.usersModel.deleteOne({ email });
    return deleteResult.acknowledged;
  }

  private checkIfUserExiste(user: object, id: string) {
    if (!user) {
      throw new NotFoundException(`User not found by id ${id}`);
    }
  }
}
