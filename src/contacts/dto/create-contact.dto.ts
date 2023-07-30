import { ApiProperty } from "@nestjs/swagger";

export class CreateContactDto {
    @ApiProperty()
    name:string;

    @ApiProperty()
    surname:string;

    @ApiProperty()
    phone:string;

    @ApiProperty()
    emailcontact:string

    
}
