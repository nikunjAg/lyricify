import { GraphQLError } from 'graphql';
import { TokenService, UserService } from "../../services/index.js";

async function signup(_, { name, email, password }) {
	try {
        const user = await UserService.saveUser(name, email, password);
    
        const token = TokenService.createToken({
            id: user.id,
        });
    
        return {
            token,
            user,
        };
    } catch (error) {
        throw new GraphQLError(error.message || 'Unable to create user');
    }
}

async function login(_, { email, password }) {
	try {
        const user = await UserService.loginUser(email, password);
    
        const token = TokenService.createToken({
            id: user.id,
        });
    
        return {
            token,
            user,
        };
    } catch (error) {
        throw new GraphQLError(error.message || 'Unable to login user');
    }
}

export const resolver = {
	Mutation: {
		login,
		signup,
	},
};
