import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import mongoose, { Types } from "mongoose";
import { User } from "src/users/entities/user.entity";


@Schema()
export class Contact {
    @Prop({ type: String, default: () => new Types.ObjectId().toString() })
    _id: string;
    
    @Prop()
    name:string;

    @Prop()
    surname:string;

    @Prop()
    phone:string;

    @Prop()
    emailcontact:string

    @Prop({type:User,ref:'User'})
    user:User
}

export const SchemaContact = SchemaFactory.createForClass(Contact)
