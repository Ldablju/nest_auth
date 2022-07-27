import { Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
    ){}

    @Post('/signin')
    signInUser(): string {
        return this.authService.loginUser()
    }

    @Post('/signup')
    signUpUser(): string {
        return this.authService.createUser()
    }
}
