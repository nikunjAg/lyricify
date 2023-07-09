import React from 'react';
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';

import NewSong from '../../components/Songs/NewSong';
import { CREATE_SONG } from '../../graphql/queries/song';

const CreateSong = () => {

  const [createNewSong, { data, loading, error }] = useMutation(CREATE_SONG);

  const createSongHandler = async (song) => {
    const { title } = song;

    // Write a mutation to create new song
    try {
      await createNewSong({ variables: { title } });
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(data, loading, error);

  if (data?.addSong?.code === "200") {
    return <Navigate to="/songs" replace />
  }

  return (
    <NewSong
      loading={loading}
      error={error}
      onCreate={createSongHandler}
    />
  );
}

export default CreateSong;