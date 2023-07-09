import { Song } from "../../models/index.js";

export const typeDef = `#graphql
  type Song {
    id: String!
    title: String!
    lyrics: [Lyric!]
  }
`;

export const resolver = {
  Song: {
    lyrics: async (parentValue, args) => {
      const song = await Song.findById(parentValue.id).populate('lyrics');
      return song.lyrics;
    }
  }
};