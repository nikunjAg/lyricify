import React, { useState } from 'react'
import { Button, CircularProgress } from '@mui/material';
import { useMutation } from '@apollo/client';

import classes from './style.module.css';
import { CssTextField } from '../CssTextField';
import { SONG_BY_ID } from '../../graphql/queries/song';
import { CREATE_LYRIC } from '../../graphql/queries/lyric';

const LyricCreate = (props) => {

  const { songId } = props;

  const [lyric, setLyric] = useState("");
  const [saveLyric, { loading }] = useMutation(CREATE_LYRIC);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const content = lyric?.trim() || '';
    try {
      const res = await saveLyric({
        variables: { content, songId },
        update: (cache, { data: { addLyric: { lyric: newLyric } } }) => {
          console.log(newLyric);

          cache.updateQuery({ query: SONG_BY_ID, variables: { songId } }, ({ song: songData }) => {
            console.log(songData);
            return {
              song: {
                ...songData,
                lyrics: [
                  ...songData.lyrics,
                  newLyric
                ]
              }
            }
          });
        }
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
        <h3>Add New Lyric</h3>
        <form className={classes.lyricCreateForm} onSubmit={formSubmitHandler} >
            <CssTextField
                id="outlined-multiline-static"
                label="Lyrics"
                multiline
                rows={4}
                color='primary'
                placeholder='Agar tum ...'
                value={lyric}
                onChange={e => setLyric(e.target.value)}
            />

            <Button type='submit' variant='outlined' >
              {loading ? <CircularProgress size={18} /> : "Add"}
            </Button>
        </form>
    </div>
  )
}

export default LyricCreate;