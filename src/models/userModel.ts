import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
// interface is used to help me in the code completion
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
//schema is how the data is structured in the database
const userSchema=new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

export const UserModel = mongoose.model<IUser>('User', userSchema);