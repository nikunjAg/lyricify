import React from 'react';
import { List} from '@mui/material';

import classes from './style.module.css';
import Song from './Song';

const SongsList = (props) => {

  const { songs, loading, error } = props;

  if (loading) return <p>Loading...</p>

  if (error) {
    console.log(error);
    return <div className={classes.songsList} ><p>Sonething went wrong</p></div>;
  }

  return (
    <div className={classes.songsList} >
      <h3>Songs</h3>
      <List className={classes.songs} >
        {
          songs?.map(song => 
            <Song song={song} key={song.id} />
          )
        }
      </List>
    </div>
  )
}

export default SongsList;