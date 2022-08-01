import { Controller, Get, Inject, UseGuards, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UsersResponse, UserInfoResponse } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {}

    @ApiCreatedResponse({ type: UserInfoResponse })
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUserInfo(
        @Query('token') token: string,
        @Request() req: any
    ): Promise<UserInfoResponse> {
        return this.userService.getUserInfo(req)
    }

    @ApiCreatedResponse({ type: [UsersResponse] })
    @UseGuards(AuthGuard('jwt'))
    @Get('/getAll')
    getAllUsers(
        @Query('token') token: string
    ): Promise<UsersResponse[]> {
        return this.userService.getAllUsers()
    }

    @ApiCreatedResponse({ type: UsersResponse })
    @UseGuards(AuthGuard('jwt'))
    @Get('/findById')
    getUserInfoById(
        @Query('id') id: string,
        @Query('token') token: string
    ): Promise<UsersResponse> {
        return this.userService.getUserInfoById(id)
    }

}
