import { Lyric } from "../../models/index.js";

export const typeDef = `#graphql
  type Lyric {
    song: Song
    likes: Int
    content: String
  }
`;

export const resolver = {
  Lyric: {
    song: async (parentValue, args) => {
      const lyric = await Lyric.findById(parentValue.id).populate('song');
      return lyric.song;
    }
  }
};