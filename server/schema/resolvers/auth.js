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
        throw new GraphQLError(error.message || 'Unable to create user', {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                http: {
                    status: 500,
                }
            }
        });
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
        throw new GraphQLError(error.message || 'Unable to login user', {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                http: {
                    status: 500,
                }
            }
        });
    }
}

export const resolver = {
	Mutation: {
		login,
		signup,
	},
};
