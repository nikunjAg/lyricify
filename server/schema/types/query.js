import { Song, Lyric } from '../../models/index.js';

export const typeDef = `#graphql
  type Query {
    songs: [Song]
    lyrics: [Lyric]
  }
`;

export const resolver = {
  Query: {
    songs: async () => await Song.find({}),
    lyrics: async () => await Lyric.find({}),
  }
}