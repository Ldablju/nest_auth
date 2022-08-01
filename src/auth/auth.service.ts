import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginResponse, RegisterResponse } from './entities/auth.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ){}

    async loginUser(req: LoginDto): Promise<LoginResponse> {

        if(!req.email || !req.password)
            throw new BadRequestException('Fill required data')

        const user = await this.userModel.findOne({ email: req.email }).exec()

        if(!user)
            throw new UnauthorizedException('User does not exist')

        if(!(await bcrypt.compare(req.password, user.password)))
            throw new UnauthorizedException('Incorrect password')
  
        return {
            token: this.signUser(user._id, user.userName, user.isAdmin)
        }
    }

    async createUser(req: RegisterDto): Promise<RegisterResponse> {

        if(!req.userName || !req.email || !req.password)
            throw new BadRequestException('Fill required data')

        const hashPassword = await bcrypt.hash(req.password, 10);

        const checkUserExist = await this.userModel.findOne({ email: req.email })

        if(checkUserExist)
            throw new UnauthorizedException('This email is already in use')

        const newUser = await this.userModel.create({
            userName: req.userName,
            email: req.email,
            password: hashPassword,
        })

        return newUser.save().then(docs => {
            return {
                _id: docs._id,
                userName: docs.userName,
                email: docs.email,
                isAdmin: docs.isAdmin,
                createdAt: docs.createdAt,
            }
        })
    }

    signUser(userId: string, userName: string, isAdmin: boolean){
        return this.jwtService.sign({
            _id: userId,
            userName,
            isAdmin,
        })
    }
}
