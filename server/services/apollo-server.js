import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { typeDefs, resolvers } from "../schema/index.js";
import { TokenService, UserService } from "./index.js";

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

export default class ApolloServerService {
	static async start(httpServer) {
		apolloServer.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));
		await apolloServer.start();
	}

	static getExpressMiddleware() {
		return expressMiddleware(apolloServer, {
			context: async ({ req }) => {
				try {
					let token = req.headers.authorization;
					token = token?.replace("Bearer ", "");

					// Decode the token
					const decodedToken = TokenService.decryptToken(token);

					// Get User using this token
					const user = await UserService.getUser(decodedToken?.id);

					return { user };
				} catch (error) {
					return {
						user: null,
					};
				}
			},
		});
	}
}
