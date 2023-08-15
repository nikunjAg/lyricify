import { promisify } from 'util';

import { User } from "../models/index.js";

export default class UserService {
    static async getUser(id) {
        const user = await User.findById(id);
        return user;
    }

    static async saveUser(name, email, password) {
        const user = new User({
            name,
            email,
            password,
        });

        const savedUser = await user.save();
        return savedUser;
    }

    static async loginUser(email, password) {
        const users = await User.find({ email });
        if (!users?.length) throw new Error('No such user exists');
        
        const user = users[0];
        const res = await promisify(user.comparePassword).call(user, password);
        if (!res) throw new Error('Invalid credentials');

        return user;
    }

}