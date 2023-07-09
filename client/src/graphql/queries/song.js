import { gql } from '@apollo/client';

export const GET_SONGS = gql`
query GetSongs {
  songs {
    __typename
    id
    title
  }    
}
`;

export const CREATE_SONG = gql`
mutation CreateSong($title: String!) {
  addSong(title: $title) {
    code
    success
    message
    song {
      __typename
      id
      title
    }
  }
}
`;

export const NEW_SONG_FRAGMENT = gql`
fragment NewSong on Song {
  id
}
`;