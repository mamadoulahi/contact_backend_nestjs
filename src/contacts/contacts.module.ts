import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact, SchemaContact } from './entities/contact.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Contact.name,schema:SchemaContact}])
  ],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}
