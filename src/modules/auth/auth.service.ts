import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/database/users.entity'
import { Repository, Timestamp } from 'typeorm';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user
      return rest
    }
    return null;
  }

  async login(user: any){
    const payload = {username: user.username, id: user.id}
    console.log(payload);
    
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
