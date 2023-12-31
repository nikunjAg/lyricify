import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import NewSong from '../../components/Songs/NewSong';
import { CREATE_SONG, SONG_FRAGMENT } from '../../graphql/queries/song';

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
              songs: (oldSongsRefs = []) => {
                const songRef = cache.writeFragment({
                  data: addSong.song,
                  fragment: SONG_FRAGMENT
                });

                return [songRef, ...oldSongsRefs];
              }
            }
          });
        }
      });

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