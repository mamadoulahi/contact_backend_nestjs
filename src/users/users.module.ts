import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/auth.jwt.strategy';

@Module({
  imports:[MongooseModule.forFeature([{name:"users",schema:UserSchema}]), PassportModule,
JwtModule.register({
  secret:"contactonline",
  signOptions : { expiresIn: '1y' },
})],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy ]
})

export class UsersModule {}
