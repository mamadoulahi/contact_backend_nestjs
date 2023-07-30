import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { Icontact } from './interfaces/contact.interface';

@Injectable()
export class ContactsService {

  constructor(
    @InjectModel(Contact.name) private contactmodel:Model<Icontact>
  ){}

  async create(createContactDto: CreateContactDto,user) {
    const usercreated=await this.contactmodel.create(createContactDto)
    usercreated.user = user
    const usersaved = usercreated.save()
    return usersaved;
  }

  async findAllByUser(userId:string):Promise<Icontact[]> {
    return await this.contactmodel.find({"user._id":userId});
  }

  async findOne(id: string):Promise<Icontact> {
    return  await this.contactmodel.findById(id)
  }

  async update(id: string, updateContactDto: UpdateContactDto):Promise<Icontact> {
    return await this.contactmodel.findByIdAndUpdate(id,updateContactDto)
  }

  async remove(id: string):Promise<Icontact> {
    return await this.contactmodel.findByIdAndRemove(id)
  }
}
