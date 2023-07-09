import { gql } from '@apollo/client';

export const GET_SONGS = gql`
query GetSongs {
  songs {
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
      id
      title
    }
  }
}
`;