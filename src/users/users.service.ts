import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel("users") private usermodel : Model<IUser>,
    private jwtservice:JwtService
    ){}



  async CreateUser(createUserDto: CreateUserDto):Promise<Partial<IUser>> {
    const salt = await bcrypt.genSalt()
    createUserDto.password = await bcrypt.hash(createUserDto.password,salt);
    const usercreated = await this.usermodel.create(createUserDto);
    const usersave = usercreated.save();

    return usersave ;
  }

  async LoginUser(loginUserDto:LoginUserDto) : Promise<Partial<IUser>>  {
    const {email,password}=loginUserDto
    const userfetch = await this.usermodel.findOne({email})
    if (!userfetch){
      throw new NotFoundException("l'utilisateur n'existe pas")
    }
    const passwordMatch = await bcrypt.compare(password,userfetch.password)
    if (!passwordMatch){
      throw new NotFoundException("l'utilisateur n'existe pas")
      

  }
  const userId = userfetch._id;
  const name = userfetch.name;
  

  const payload = {
    email,
    userId,
    name
   
  }

  const access_token = this.jwtservice.sign(payload)
  return access_token;


}}
