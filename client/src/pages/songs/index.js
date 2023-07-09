import React from 'react'
import { useQuery } from '@apollo/client';
import { Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import SongsList from '../../components/Songs/SongsList'
import { GET_SONGS } from '../../graphql/queries/song';
import classes from './songs.module.css';

const Songs = () => {

  const { loading, error, data } = useQuery(GET_SONGS);

  return (
    <React.Fragment>
      <SongsList loading={loading} error={error} songs={data?.songs} />
      <Fab color="primary" aria-label="add" className={classes.addIcon} >
        <AddIcon />
      </Fab>
    </React.Fragment>
  )
}

export default Songs