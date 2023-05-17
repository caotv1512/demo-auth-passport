import { IsNumber, IsString, IsNotEmpty, IsUrl, IsBoolean } from 'class-validator';

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
