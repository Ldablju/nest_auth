import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ){}

    async loginUser(req: UserInterface): Promise<UserInterface> {
        const user = await this.userModel.findOne({ email: req.email }).exec()

        if(user == null)
            throw new UnauthorizedException('User does not exist')

        if(!(await bcrypt.compare(req.password, user.password)))
            throw new UnauthorizedException('Incorrect password')

        return user
    }

    async createUser(req: UserInterface): Promise<UserInterface> {
        const hashPassword = await bcrypt.hash(req.password, 10);

        const checkUserExist = await this.userModel.findOne({ email: req.email })

        if(checkUserExist)
            throw new UnauthorizedException('This email is already in use')

        const newUser = await this.userModel.create({
            userName: req.userName,
            email: req.email,
            password: hashPassword,
        })

        return newUser.save()
    }

    signUser(userId: string, userName: string, isAdmin: boolean){
        return this.jwtService.sign({
            id: userId,
            userName,
            isAdmin,
        })
    }
}
