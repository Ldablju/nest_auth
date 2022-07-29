import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class RegisterDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ required: false })
    userName: string;
}