import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { IUserRepository } from "src/modules/users/domain/repositories/user.repository";
import { USER_REPOSITORY } from "src/common/constants/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor (
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
                                 private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findById(payload.sub);
        
        if (!user) {
            return new UnauthorizedException();
        }

        return {userId: user.id, username: user.username};
    }
}