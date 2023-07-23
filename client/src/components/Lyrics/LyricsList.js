import React from "react";
import { List, Typography } from "@mui/material";

import LyricItem from "./LyricItem";
import classes from './style.module.css';

const LyricsList = (props) => {
	const { lyrics, songId } = props;

	if (!lyrics || !lyrics.length) {
		return <Typography variant="body1" margin="8px 0" color="gray" >No lyrics are present</Typography>;
	}

	return (
		<List className={classes.lyricsList}>
			{lyrics.map((lyric) => <LyricItem key={lyric.id} lyric={lyric} songId={songId} />)}
		</List>
	);
};

export default LyricsList;
