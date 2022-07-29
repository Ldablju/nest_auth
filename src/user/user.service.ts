import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/models/user.models';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async getUserInfo(req) {
        return await this.userModel.findOne({ _id: req.user.id }).select('_id email userName createdAt')
    }

    async getAllUsers(req) {
        console.log(req.user)
        return await this.userModel.find().select('_id userName createdAt')
    }

    async getUserInfoById(id: string): Promise<UserDto> {

        if(id.length != 24)
            throw new BadRequestException('Bad id query')

        const user = await this.userModel.findOne({ _id: new Types.ObjectId(id) }).select('_id userName createdAt').exec()

        if(!user)
            throw new NotFoundException(`User doesn't exist`)

        return user
    }

}
