import { Injectable, CanActivate, ExecutionContext, Inject  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor (private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roles = this.reflector.get<string[]>('roles',context.getHandler());

        const request = context.switchToHttp().getRequest();

        const role_rq = request.user.role;

        if (!role_rq) return false;

        return roles.some((role) => {
            return role === role_rq
        })

    }

    
}