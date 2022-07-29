import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
          ignoreExpiration: true,
          secretOrKey: process.env.JWT_SECRET,
        });
      }
    
      async validate(user: any) {
        return user;
      }
}