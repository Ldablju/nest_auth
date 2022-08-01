import { ApiProperty } from "@nestjs/swagger";

export class UsersResponse {

    @ApiProperty()
    _id: string;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    createdAt: Date;

}

export class UserInfoResponse {

    @ApiProperty()
    _id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    createdAt: Date;

}