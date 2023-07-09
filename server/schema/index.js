import {
  Song, Lyric, Query,
  QueryResolver, SongResolver, LyricResolver
} from './types/index.js';

export const typeDefs = [Song, Lyric, Query];
export const resolvers = {...QueryResolver, ...SongResolver, ...LyricResolver};
