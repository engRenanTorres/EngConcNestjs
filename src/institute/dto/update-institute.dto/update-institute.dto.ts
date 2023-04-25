import { PartialType } from '@nestjs/swagger';
import { CreateDefaltInstituteDto } from '../create-institute.dto';

//PartialTypes copia os mesmo campos da classe referenciada, mas deixa os campos como opcionais
export class UpdateInstituteDto extends PartialType(CreateDefaltInstituteDto) {}
