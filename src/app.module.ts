import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from './questions/questions.module';
import { InstitutesModule } from './institute/institutes.module';

@Module({
  imports: [
    AuthModule,
    InstitutesModule,
    QuestionsModule,
    UsersModule,
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
