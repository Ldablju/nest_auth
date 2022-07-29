import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
    @ApiProperty()
    token: string;
}

export class RegisterResponse {

    @ApiProperty()
    _id: string;
    
    @ApiProperty()
    userName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    isAdmin: boolean;

    @ApiProperty()
    createdAt: Date; 
}