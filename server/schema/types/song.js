import { Song } from "../../models/index.js";

export const typeDef = `#graphql
  type Song {
    id: String!
    title: String!
    lyrics: [Lyric!]
  }

  extend type Query {
    songs: [Song!]!
  }
  
  type CreateSongMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    song: Song
  }

  extend type Mutation {
    addSong(title: String!): CreateSongMutationResponse
  }
`;

export const resolver = {
  Query: {
    songs: async () => Song.find({}),
  },
  Mutation: {
    addSong: async (_, { title }) => {
      const song = await (new Song({ title }).save());
      return {
        code: "200",
        success: true,
        message: "Song created successfully",
        song
      };
    }
  },
  Song: {
    lyrics: async (parentValue) => {
      const song = await Song.findById(parentValue.id).populate('lyrics');
      return song.lyrics;
    }
  }
};