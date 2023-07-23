import React from "react";
import { IconButton, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { Delete as DeleteIcon, WarningAmber as WarningIcon } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';

import classes from "./style.module.css";
import { DELETE_SONG } from "../../graphql/queries/song";

const Song = (props) => {

	const { song } = props;
	
	const [deleteSongById, { loading, error }] = useMutation(DELETE_SONG);

	const deleteSongHandler = async (event) => {

		// To stop trigerring song click
		event.stopPropagation();

		const songId = song.id;
		try {
			await deleteSongById({
				variables: { songId },
				update: (cache, { data: { deleteSong } }) => {
					cache.modify({
						fields: {
							songs: (oldSongsRefs = [], { readField }) => {
								return oldSongsRefs.filter(songRef => readField('id', songRef) !== deleteSong.song.id)
							},
						},
					});
				},
			});

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Link
			to={`/songs/${song.id}`}
			className={classes.song}
		>
			<ListItem
				secondaryAction={
					<IconButton
						onClick={deleteSongHandler}
						disabled={loading}
						className={classes.songActionIcon} 
						color="primary"
					>
						{!error && !loading && <DeleteIcon />}
						{loading && <CircularProgress size={24} />}
						{error && <WarningIcon titleAccess={error.message} />}
					</IconButton>
				}
			>
				<ListItemText primary={song.title} />
			</ListItem>
		</Link>
	);
};

export default Song;
