import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/models/user.models';
import { UsersResponse, UserInfoResponse } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async getUserInfo(req): Promise<UserInfoResponse> {
        return await this.userModel.findOne({ _id: req.user.id }).select('_id email userName createdAt')
    }

    async getAllUsers(): Promise<UsersResponse[]> {
        return await this.userModel.find().select('_id userName createdAt')
    }

    async getUserInfoById(id: string): Promise<UsersResponse> {

        if(id.length != 24)
            throw new BadRequestException('Bad id query')

        const user = await this.userModel.findOne({ _id: new Types.ObjectId(id) }).select('_id userName createdAt').exec()

        if(!user)
            throw new NotFoundException(`User doesn't exist`)

        return user
    }

}
