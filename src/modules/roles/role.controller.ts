import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';

@Controller('users')
export class RoleController {
    constructor(private readonly userService: RoleService) { }

    @Get('/')
    getAll() {
        return this.userService.findAll();
    }

    // @Get('/:username')
    // getOnly(@Param("username") username: string) {
    //   return this.userService.findOne(username);
    // }

    @Post('/')
    async createRoles(@Body() data: RoleDto) {
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
    async updateRole(@Param('id') id: number, @Body() data: RoleDto) {
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
