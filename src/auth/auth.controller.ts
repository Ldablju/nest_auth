import { UserInterface } from './dto/user.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
    ){}

    @Post('/signin')
    signInUser(
        @Body() user: UserInterface
    ): Promise<UserInterface> {
        return this.authService.loginUser(user)
    }

    @Post('/signup')
    signUpUser(
        @Body() user: UserInterface
    ): Promise<UserInterface> {
        return this.authService.createUser(user)
    }
}
