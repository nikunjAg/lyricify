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

export const SONG_FRAGMENT = gql`
  fragment NewSong on Song {
    id
    title
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

export const DELETE_SONG = gql`
  mutation DeleteSong($songId: String!) {
    deleteSong(id: $songId) {
      __typename
      code
      message
      success
      song {
        __typename
        id
        title
      }
    }
  }
`;