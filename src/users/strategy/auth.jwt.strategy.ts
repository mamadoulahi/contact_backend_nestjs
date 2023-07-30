import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { PayloadInterface } from '../interfaces/paylod-jwt.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel("users") private usermodel : Model<IUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "contactonline",
    });
  }

  async validate(payload: PayloadInterface) {
    const user = await this.usermodel.findOne({email:payload.email})
    if (user) {
        const {password,...result} = user;
        return result;
    }else {
        throw new UnauthorizedException("l'utilisateur n'existe pas");
    }
  }
}