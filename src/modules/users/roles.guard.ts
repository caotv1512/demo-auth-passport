// import { JwtAuthGuard } from './../auth/jwt.auth.guard';
// import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role } from 'src/helper/config/enum';
// import { User } from './database/users.entity';

// @Injectable()

// export class RolesGuard implements CanActivate {
//     constructor(private reflector: Reflector) { }

//     canActivate(context: ExecutionContext): boolean {

//         const requireRoles = this.reflector.getAllAndOverride<Role[]>('roleId', [
//             context.getHandler(),
//             context.getClass()
//         ]);

//         const { user } = context.switchToHttp().getRequest();
//         // console.log(user, "======================");
//         if (!requireRoles) {
//             return true;
//         }

//         return requireRoles.some((role)=>  user.roleId.includs(role)
//         );
//     }
// }


import { Role } from 'src/helper/config/enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
// import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
 
export const RolesGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
 
      const request = context.switchToHttp().getRequest();
      const user = request.user;
 
      return user?.roleId.includes(role);
    }
  }
 
  return mixin(RoleGuardMixin);
}
 
//   RoleGuard;
 

