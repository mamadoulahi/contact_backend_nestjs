import { User } from "src/users/entities/user.entity";

export interface Icontact{

    emailcontact:string


    user:User;
    
    name:string;


    surname:string;


    phone:string;
}