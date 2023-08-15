export const typeDef = `#graphql
    type User {
        name: String!
        email: String!
        password: String!
        songs: [Song!]!
        lyrics: [Lyric!]!
    }
`;