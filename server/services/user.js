import { User } from "../models";

export default class UserService {
    static async getUser(id) {
        const user = await User.findById(id);
        return user;
    }
}