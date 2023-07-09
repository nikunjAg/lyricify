import _ from 'lodash';

import {
  Song, Lyric, Query,
  SongResolver, LyricResolver,
  Mutation,
} from './types/index.js';

export const typeDefs = [Song, Lyric, Query, Mutation];
export const resolvers = _.merge(SongResolver, LyricResolver);
