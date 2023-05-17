import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './database/role.entity';
import { Repository, Timestamp } from 'typeorm';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) { }
  
  
  async findAll() {
    const data = await this.roleRepo.find();
    console.log(data);

    return data;
  }

  // async findOne(rolename: string) {
  //   const user = await this.userRepo.findOne({ where: { username: username } });
  //   if (!user) {
  //     throw new NotFoundException('Rolename not found.');
  //   }
  //   try {
  //     return user;
  //   } catch (err) {
  //     throw new BadRequestException({ action: 'find user data' });
  //   }
  // }

  async create(data: RoleDto) {
    const role = {
      name: data.name,
    }
    // console.log(role);
    
    try {
      this.roleRepo.create(data);
      await this.roleRepo.save(data);
    } catch (error) {
      console.log(error);
      
      throw new HttpException('Error creating role', HttpStatus.BAD_REQUEST);
    }
    return role;
  }

  async findOnly(id: number) {
    const role = await this.roleRepo.findOne({ where: { id: id } });

    if (!role) {
      throw new NotFoundException('Id not found.');
    }
    try {
      return role;
    } catch (err) {
      throw new BadRequestException({ action: 'find role data' });
    }
  }

  async update(id: number, data: RoleDto) {
    let role = await this.roleRepo.findOne({ where: { id: id } });
    if (!role) {
      throw new NotFoundException('Id not found.');
    }
    try {
      role.name = data.name;

      await this.roleRepo.update({ id }, role);
      return {
        statusCode: HttpStatus.OK,
        message: 'Role updated successfully',
        data: role,
      };
    } catch (err) {
      throw new BadRequestException({ action: 'find role data' });
    }
  }

  async delete(id: number): Promise<any> {
    const role = await this.roleRepo.findOne({ where: { id: id } });
    if (!role) {
      throw new NotFoundException('RoleId not found.');
    }
    try {
      this.roleRepo.delete({ id: id });
      return {
        statusCode: HttpStatus.OK,
        message: `Deleted role id:${id} successfully`,
      };
    } catch (error) {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }
}
