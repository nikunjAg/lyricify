import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import NewSong from '../../components/Songs/NewSong';
import { CREATE_SONG, GET_SONGS, NEW_SONG_FRAGMENT } from '../../graphql/queries/song';

const CreateSong = () => {

  const [createNewSong, { loading, error }] = useMutation(CREATE_SONG);
  const navigate = useNavigate();

  const createSongHandler = async (song) => {
    const { title } = song;

    // Write a mutation to create new song
    try {
      
      const res = await createNewSong({
        variables: { title },
        // refetchQueries: [GET_SONGS],
        update: (cache, { data: { addSong } }) => {
          cache.modify({
            fields: {
              songs: (oldSongs = []) => {

                const newSongRef = cache.writeFragment({
                  data: addSong.song,
                  fragment: NEW_SONG_FRAGMENT
                });

                return [ ...oldSongs, newSongRef ];
              }
            }
          });
        }
      });

      console.log('Awaited Res', res);
      if (res?.data?.addSong?.code === "200") {
        navigate("/songs", { replace: true });
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NewSong
      loading={loading}
      error={error}
      onCreate={createSongHandler}
    />
  );
}

export default CreateSong;