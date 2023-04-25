import { Module } from '@nestjs/common';
import { InstitutesController } from './institutes.controller';
import { InstitutesService } from './institutes.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guard/role.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutesSchema } from './schemas/institute.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Institute', schema: InstitutesSchema },
    ]),
  ],
  controllers: [InstitutesController],
  providers: [InstitutesService, { provide: APP_GUARD, useClass: RolesGuard }],
  exports: [InstitutesService],
})
export class InstitutesModule {}
