import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstituteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the institute' })
  readonly name: string;
  @IsString()
  @ApiProperty({ description: 'Optional, here you describe about institute.' })
  readonly about?: string;
  @IsString()
  @ApiProperty({ description: 'The oficial website of the institute' })
  readonly website?: string;
  @IsString()
  @ApiProperty({ description: 'The oficial social media of the institute' })
  readonly socialMedia?: string;
}

export class CreateDefaltInstituteDto extends CreateInstituteDto {}
