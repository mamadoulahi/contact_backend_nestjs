import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose/dist/factories";
import { Types } from "mongoose";

@Schema()
export class User {

    @Prop({ type: String, default: () => new Types.ObjectId().toString() })
    _id: string;
    
    @Prop()
    name:string;

    @Prop()
    email:string;

    @Prop()
    password:string;


}

export const UserSchema = SchemaFactory.createForClass(User)
