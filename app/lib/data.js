import mongoose from 'mongoose';
import { User } from "./models";
import { connectToDb } from './utils';

export const fetchUsers = async (q) => {
    
    try {
        connectToDb();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
