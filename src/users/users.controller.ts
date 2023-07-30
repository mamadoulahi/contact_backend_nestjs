import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from './interfaces/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
@ApiTags("authentification des utilisateurs")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto,@Res() response,@Req() request) {

    try{
      const usercreated = await this.usersService.CreateUser(createUserDto);
      response.status(HttpStatus.CREATED).json({
        message:'votre utilisateur a été crée avec succes',
        usercreated
      })
   
    }catch(err){
      const response = request.res;
      const status = response.statusCode;
      response.status(HttpStatus.NOT_ACCEPTABLE).json({
        message:`Le code de statut d'erreur est : ${status}`,
        
        
      })
      
    }
    
  }


  @Post('login')
  async Login(@Body() loginUserDto: LoginUserDto,@Res() response) {

    try{
      const token = await this.usersService.LoginUser(loginUserDto);
      response.status(HttpStatus.OK).json({
        message:'logged',
        token
      })
   
    }catch(err){
      response.status(HttpStatus.NOT_FOUND).json({
        message:'utilisateur non reconnu'
      })
    }
    
  }



 
}
