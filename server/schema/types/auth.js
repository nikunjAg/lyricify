export const typeDef = `#graphql

    type AuthResponse {
        token: String
        user: User
    }

    extend type Mutation {
        login(email: String!, password: String!): AuthResponse
        signup(name: String!, email: String!, password: String!): AuthResponse
    }
`;