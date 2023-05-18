import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './database/users.entity';
import { Repository, Timestamp } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }
  
  
  async findAll() {
    const data = await this.userRepo.find();
    console.log(data);

    return data;
  }

  async findOne(username: string) {
    const user = await this.userRepo.findOne({ where: { username: username } });
    if (!user) {
      throw new NotFoundException('Username not found.');
    }
    try {
      return user;
    } catch (err) {
      throw new BadRequestException({ action: 'find user data' });
    }
  }

  async create(data: UserDto) {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
      roleId: data.roleId,
    }
    // console.log(user);
    
    try {
      this.userRepo.create(data);
      await this.userRepo.save(data);
    } catch (error) {
      console.log(error);
      
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async findOnly(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('Id not found.');
    }
    try {
      return user;
    } catch (err) {
      throw new BadRequestException({ action: 'find user data' });
    }
  }

  async update(id: number, data: UserDto) {
    let user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('Id not found.');
    }
    try {
      user.username = data.username;
      user.email = data.email;
      user.password = data.password;
      // user.roleId = data.roleId;
      await this.userRepo.update({ id }, user);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: user,
      };
    } catch (err) {
      throw new BadRequestException({ action: 'find user data' });
    }
  }

  async delete(id: number): Promise<any> {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('ProductId not found.');
    }
    try {
      this.userRepo.delete({ id: id });
      return {
        statusCode: HttpStatus.OK,
        message: `Deleted user id:${id} successfully`,
      };
    } catch (error) {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }
}
