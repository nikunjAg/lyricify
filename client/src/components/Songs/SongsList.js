import React from 'react';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import classes from './style.module.css';

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
            <ListItem
              className={classes.song}
              key={song.id}
              secondaryAction={
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={song.title} />
            </ListItem>
          )
        }
      </List>
    </div>
  )
}

export default SongsList;