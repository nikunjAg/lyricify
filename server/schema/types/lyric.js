import { Lyric, Song } from "../../models/index.js";

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

  type AddLyricMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    lyric: Lyric
  }

  type DeleteLyricMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    lyric: Lyric
  }

  type LikeLyricMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    lyric: Lyric
  }

  extend type Mutation {
    addLyric(content: String!, songId: String!): AddLyricMutationResponse
    deleteLyric(id: String!): DeleteLyricMutationResponse
    likeLyric(id: String!): LikeLyricMutationResponse
  }
`;

export const resolver = {
  Query: {
    lyrics: async () => await Lyric.find({}),
  },
  Mutation: {
    addLyric: async (_, { content, songId }) => {
      const [lyric] = await Song.addLyric(songId, content);

      return {
        code: "201",
        success: true,
        message: "Lyric created successfully",
        lyric,
      }
    },
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
    },
    likeLyric: async (_, { id }) => {
      const res = await Lyric.like(id);
      console.log(res);
      return {
        code: "200",
        success: true,
        message: "Lyric liked successfully",
        lyric: res,
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