import { ApiProperty } from "@nestjs/swagger";

export class UserDto {

    @ApiProperty()
    _id: string;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    createdAt: Date;

}