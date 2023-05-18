import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Role } from 'src/helper/config/enum';
import { Roles } from './roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('/')
    @Roles(Role.USER)
    getAll() {
        return this.userService.findAll();
    }

    @Get('/:username')
    getOnly(@Param("username") username: string) {
      return this.userService.findOne(username);
    }

    @Post('/')
    // @SetMetadata('roleId', [Role.ADMIN])
    @Roles(Role.USER)
    async createUsers(@Body() data: UserDto) {
      const user = await this.userService.create(data);
      return {
        statusCode: HttpStatus.OK,
        message: 'user created successfully',
        user,
      };
    }

    @Get('/:id')
    async getOne(@Param("id") id: number) {
      return this.userService.findOnly(id);
    }
  
    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() data: UserDto) {
      return await this.userService.update(id, data);
    }
  
    @Delete('/:id')
    async delete(@Param('id') id) {
      await this.userService.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'user deleted',
      };
    }
}
