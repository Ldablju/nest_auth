import { Controller, Get, Inject, UseGuards, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUserInfo(
        @Query('token') token: string,
        @Request() req: any
    ): Promise<any> {
        return this.userService.getUserInfo(req)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getAll')
    getAllUsers(
        @Query('token') token: string,
        @Request() req: any
    ): Promise<UserDto[]> {
        return this.userService.getAllUsers(req)
    }

    @ApiCreatedResponse({ type: UserDto })
    @UseGuards(AuthGuard('jwt'))
    @Get('/findById')
    getUserInfoById(
        @Query('id') id: string,
        @Query('token') token: string
    ): Promise<UserDto> {
        return this.userService.getUserInfoById(id)
    }

}
