import { Song, Lyric, Query } from './types/index.js';

export const typeDefs = [Song, Lyric, Query];
export const resolvers = {
  Query: {
    songs: () => "Hello"
  }
};
