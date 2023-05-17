import { IsNumber, IsString, IsNotEmpty, IsUrl, IsBoolean } from 'class-validator';
import { Role } from 'src/modules/roles/database/role.entity';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

//   @IsNumber()
//   @IsNotEmpty()
//   @Exist(Role)
//   roleId: number;
}
