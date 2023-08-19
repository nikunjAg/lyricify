import { GraphQLError } from "graphql";
import { Lyric, Song } from "../../models/index.js";

export const typeDef = `#graphql
  type Lyric {
    id: ID!
    song: Song
    likes: Int
    isLiked: Boolean
    content: String!
  }

  extend type Query {
    lyric(id: String!): Lyric
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
    lyric: async (_, { id }) => await Lyric.findById(id),
  },
  Mutation: {
    addLyric: async (_, { content, songId }, { user }) => {

      if (!user) throw new GraphQLError("Not Authenticated", {
        extensions: { code: 'UNAUTHENTICATED', http: {
          status: 401,
        }},
      });

      const [lyric] = await Song.addLyric(songId, content);

      return {
        code: "201",
        success: true,
        message: "Lyric created successfully",
        lyric,
      }
    },
    deleteLyric: async (_, { id }, { user }) => {
      try {
        if (!user) throw new GraphQLError("Not Authenticated", {
          extensions: { code: 'UNAUTHENTICATED', http: {
            status: 401,
          }},
        });

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
    likeLyric: async (_, { id }, { user }) => {

      if (!user) throw new GraphQLError("Not Authenticated", {
        extensions: { code: 'UNAUTHENTICATED', http: {
          status: 401,
        }},
      });

      const res = await Lyric.likeDislike(user.id, id);
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
    likes: (parentValue) => {
      return parentValue.likedBy.length;
    },
    isLiked: (parentValue, _, { user }) => {
      return parentValue.likedBy.includes(user?.id);
    },
    song: async (parentValue) => {
      const lyric = await Lyric.findById(parentValue.id).populate('song');
      return lyric.song;
    }
  }
};