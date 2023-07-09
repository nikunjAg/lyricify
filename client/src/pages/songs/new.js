import React from 'react';
import { useMutation } from '@apollo/client';

import NewSong from '../../components/Songs/NewSong';
import { CREATE_SONG } from '../../graphql/queries/song';

const CreateSong = () => {

  const [createNewSong, { data, loading, error }] = useMutation(CREATE_SONG);

  const createSongHandler = (song) => {
    const { title } = song;

    // Write a mutation to create new song

  };

  return (
    <NewSong onCreate={createSongHandler} />
  );
}

export default CreateSong;