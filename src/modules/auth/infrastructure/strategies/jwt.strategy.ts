import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '87f758870847893d8a70586b13063973e7abc7ed5a2ba2745d3b0555f32fd0e1a696ff4c2edd915e13a1e140b0120d927991af6f07c629c4bc4c5841c4a13cc0007ae1e9cc745f6c21652a88f6796bb9c866fb7d88a515fe2c6c9621a29bc5e0ac080849c5d9da2a2da14dba1491338f2974f5e30a6e5406d571a23394a87a56f045703a10843f2618c2dc3d7d3b04bd479e1fd2cf1a034466975e912c96f359bd6dbb4521b6719deb093e416d65bd4b1353be300e70d74776ad18b2a982cabe3aebaead789b2a3a0219502e05b07a81c5e644324921d9afd0ef89867249f81372d3fb1b336e92f277ffc7576df847c8b8df1827e0593f562e795e4d5912178fec40717934dd971c154bcfa684f1d94e948fa904b463dcbe0f9468bff655bbd1',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
