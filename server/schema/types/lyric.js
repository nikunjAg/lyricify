import { Lyric } from "../../models/index.js";

export const typeDef = `#graphql
  type Lyric {
    id: String!
    song: Song
    likes: Int
    content: String!
  }

  extend type Query {
    lyrics: [Lyric!]!
  }

  type DeleteSongMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    lyric: Lyric
  }

  extend type Mutation {
    deleteLyric(id: String!): DeleteSongMutationResponse
  }
`;

export const resolver = {
  Query: {
    lyrics: async () => await Lyric.find({}),
  },
  Mutation: {
    deleteLyric: async (_, { id }) => {
      try {
        const lyric = await Lyric.findOneAndDelete({ _id: id });
        return {
          code: "200",
          success: true,
          message: "Lyric deleted successfully",
          lyric,
        }
      } catch (error) {
        console.log(error);
        return {
          code: "500",
          success: false,
          message: "Somehting went wrong!!",
        }
      }
    }
  },
  Lyric: {
    song: async (parentValue) => {
      const lyric = await Lyric.findById(parentValue.id).populate('song');
      return lyric.song;
    }
  }
};