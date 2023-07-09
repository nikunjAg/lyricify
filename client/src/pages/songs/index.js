import React from 'react'
import { useQuery } from '@apollo/client';
import { Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import SongsList from '../../components/Songs/SongsList'
import { GET_SONGS } from '../../graphql/queries/song';
import classes from './songs.module.css';

const Songs = () => {

  const { loading, error, data } = useQuery(GET_SONGS);
  const navigate = useNavigate();

  const addNewSongHandler = () => {
    navigate("new");
  };

  return (
    <React.Fragment>
      <SongsList loading={loading} error={error} songs={data?.songs} />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addIcon}
        onClick={addNewSongHandler}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}

export default Songs