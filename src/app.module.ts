import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { ChatGateway } from './chat/chat.gateway';




@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[".env"]
    }),
  MongooseModule.forRoot("mongodb://127.0.0.1:27017",{dbName:"contact"}),
  ContactsModule,
  ],
  providers: [ChatGateway],

})
export class AppModule {}
