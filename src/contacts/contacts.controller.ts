import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user-decorator';
import { JwtAuthGuard } from 'src/users/guards/jwt-guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';


@ApiTags("webservices des contacts")
@ApiBearerAuth('jwt-auth')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createContactDto: CreateContactDto,@User() user) {
    return await this.contactsService.create(createContactDto,user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contactsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findbyuser(@Param('id') id: string) {
    return await this.contactsService.findAllByUser(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return await this.contactsService.update(id, updateContactDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.contactsService.remove(id);
  }
}
