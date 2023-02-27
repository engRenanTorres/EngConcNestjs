import { Module } from '@nestjs/common';
import { InstituteService } from './institute.service';
import { InstituteController } from './institute.controller';
import { instituteProviders } from './institute.providers';

@Module({
  imports: [],
  controllers: [InstituteController],
  providers: [InstituteService, ...instituteProviders],
})
export class InstituteModule {}
