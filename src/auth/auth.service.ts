import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    loginUser(): string {
        return 'Route /auth/signin work!'
    }

    createUser(): string {
        return 'Route /auth/signup work!'
    }
}
