import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Button, CircularProgress, TextField } from '@mui/material';

import classes from './style.module.css';

const NewSong = ({ loading, error, onCreate }) => {

  const [title, setTitle] = useState("");

  const titleNotValid = title.trim().length === 0;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (titleNotValid) return;

    onCreate({ title });
  }

  return (
    <Box component="div" className={classes.createSongWrapper} >

      {
        error && 
        <Alert severity="error" className='error-alert' >
          <AlertTitle>Error</AlertTitle>
          {error.message}
        </Alert>
      }

      <h3>Create a Song</h3>
      <form onSubmit={formSubmitHandler} >
        <TextField
          required
          label="Title"
          className={classes.formField}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <Button
          type='submit'
          variant='contained'
          disabled={titleNotValid || loading}
        >
          { loading ? <CircularProgress size={24} /> : "Create" }
        </Button>
      </form>
    </Box>
  )
}

export default NewSong;