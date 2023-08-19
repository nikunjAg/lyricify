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

export const COMPLETE_SONG_FRAGMENT = gql`
  fragment CompleteSongFragment on Song {
    __typename
    id
    title
    lyrics {
      __typename
      id
      content
      likes
      isLiked
    }
  }
`;

export const SONG_BY_ID = gql`
  ${COMPLETE_SONG_FRAGMENT}
  query GetSongById($songId: String!) {
    song(id: $songId) {
      ...CompleteSongFragment
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