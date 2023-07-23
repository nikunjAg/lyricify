import React from 'react'
import { Button } from '@mui/material';

import classes from './style.module.css';
import { CssTextField } from '../CssTextField';

const LyricCreate = (props) => {

  return (
    <div>
        <h3>Add New Lyric</h3>
        <form className={classes.lyricCreateForm} >
            <CssTextField
                id="outlined-multiline-static"
                label="Lyrics"
                multiline
                rows={4}
                color='primary'
                placeholder='Agar tum ...'
            />

            <Button type='submit' variant='outlined' >Add</Button>

        </form>
    </div>
  )
}

export default LyricCreate;