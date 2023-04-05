import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guard/role.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsSchema } from './schemas/questions.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionsSchema }]),
    JwtModule.register({
      privateKey: process.env.TOKEN_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, { provide: APP_GUARD, useClass: RolesGuard }],
  exports: [QuestionsService],
})
export class QuestionsModule {}
