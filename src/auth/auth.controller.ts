import { AuthDto } from './dto/auth.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse, RegisterResponse } from './entities/auth.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
    ){}

    @ApiCreatedResponse({ type: LoginResponse })
    @Post('/signin')
    signInUser(
        @Body() user: AuthDto
    ): Promise<LoginResponse> {
        return this.authService.loginUser(user)
    }

    @ApiCreatedResponse({ type: RegisterResponse })
    @Post('/signup')
    signUpUser(
        @Body() user: AuthDto
    ): Promise<RegisterResponse> {
        return this.authService.createUser(user)
    }
}
