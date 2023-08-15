import _ from 'lodash';

import {
  Song, Lyric, Auth, User, Query,
  SongResolver, LyricResolver,
  Mutation,
} from './types/index.js';
import { AuthResolver } from './resolvers/index.js';

export const typeDefs = [Song, Lyric, Auth, User, Query, Mutation];
export const resolvers = _.merge(SongResolver, LyricResolver, AuthResolver);
