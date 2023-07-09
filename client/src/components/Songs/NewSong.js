import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import classes from './style.module.css';

const NewSong = ({ onCreate }) => {

  const [title, setTitle] = useState("");

  const titleNotValid = title.trim().length === 0;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (titleNotValid) return;

    onCreate({ title });
  }

  return (
    <Box component="div" className={classes.createSongWrapper} >
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
        <Button type='submit' variant='contained' disabled={titleNotValid} >Create</Button>
      </form>
    </Box>
  )
}

export default NewSong;