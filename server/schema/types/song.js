import { GraphQLError } from "graphql";
import { Song, User } from "../../models/index.js";

export const typeDef = `#graphql
  type Song {
    id: String!
    title: String!
    lyrics: [Lyric!]
  }

  extend type Query {
    songs: [Song!]!
    song(id: String!): Song
  }
  
  type CreateSongMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    song: Song
  }
  
  type DeleteSongMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    song: Song
  }

  extend type Mutation {
    addSong(title: String!): CreateSongMutationResponse
    deleteSong(id: String!): DeleteSongMutationResponse
  }
`;

export const resolver = {
  Query: {
    songs: async () => Song.find({}),
    song: async (_, { id }) => Song.findById(id),
  },
  Mutation: {
    addSong: async (_, { title }, { user }) => {
      
      if (!user) throw new GraphQLError("Not Authenticated", {
        extensions: { code: 'UNAUTHENTICATED', http: {
          status: 401,
        }},
      });

      const song = await (new Song({ title, createdBy: user.id }).save());
      await User.addSong(user.id, song.id);

      return {
        code: "200",
        success: true,
        message: "Song created successfully",
        song
      };
    },
    deleteSong: async (_, { id }, { user }) => {

      if (!user) throw new GraphQLError("Not Authenticated", {
        extensions: { code: 'UNAUTHENTICATED', http: {
          status: 401,
        }},
      });

      const song = await Song.findOneAndDelete({ _id: id, createdBy: user?.id });
      return {
        code: "200",
        success: true,
        message: "Song deleted successfully",
        song
      };
    }
  },
  Song: {
    lyrics: async (parentValue) => {
      const song = await Song.findById(parentValue.id).populate('lyrics');
      return song?.lyrics;
    }
  }
};