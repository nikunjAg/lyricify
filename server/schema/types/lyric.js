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

  extend type Mutation {
    addLyric(content: String!, songId: String!): AddLyricMutationResponse
    deleteLyric(id: String!): DeleteLyricMutationResponse
  }
`;

export const resolver = {
  Query: {
    lyrics: async () => await Lyric.find({}),
  },
  Mutation: {
    addLyric: async (_, { content, songId }) => {
      // const lyric = new Lyric({
      //   likes: 0,
      //   content,
      //   song: songId
      // });

      // const lyricDoc = await lyric.save();
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
    }
  },
  Lyric: {
    song: async (parentValue) => {
      const lyric = await Lyric.findById(parentValue.id).populate('song');
      return lyric.song;
    }
  }
};