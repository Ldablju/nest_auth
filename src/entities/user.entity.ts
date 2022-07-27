import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    id: string;

    @Prop({ required: true })
    userName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isAdmin: boolean;

    @Prop({ default: Date.now() })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)