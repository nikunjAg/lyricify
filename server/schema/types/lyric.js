import { Lyric } from "../../models/index.js";

export const typeDef = `#graphql
  type Lyric {
    song: Song
    likes: Int
    content: String
  }

  extend type Query {
    lyrics: [Lyric!]!
  }
`;

export const resolver = {
  Query: {
    lyrics: async () => await Lyric.find({}),
  },
  Lyric: {
    song: async (parentValue) => {
      const lyric = await Lyric.findById(parentValue.id).populate('song');
      return lyric.song;
    }
  }
};