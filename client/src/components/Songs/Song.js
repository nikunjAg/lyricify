import React from "react";
import { IconButton, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { Delete as DeleteIcon, WarningAmber as WarningIcon } from "@mui/icons-material";
import { useMutation } from "@apollo/client";

import classes from "./style.module.css";
import { DELETE_SONG, SONG_FRAGMENT } from "../../graphql/queries/song";

const Song = (props) => {

	const { song } = props;
	const [deleteSongById, { loading, error }] = useMutation(DELETE_SONG);

	const deleteSongHandler = async (songId) => {
		try {
			await deleteSongById({
				variables: { songId },
				update: (cache, { data: { deleteSong } }) => {
					cache.modify({
						fields: {
							songs: (oldSongs = []) => {
								
								return oldSongs.filter((songRef) => {
									const song = cache.readFragment({
										id: songRef.__ref,
										fragment: SONG_FRAGMENT,
									});
									
									return song.id !== deleteSong.song.id;
								});
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
		<ListItem
			className={classes.song}
			key={song.id}
			secondaryAction={
				<IconButton
					onClick={() => deleteSongHandler(song.id)}
					disabled={loading}
				>
					{!error && !loading && <DeleteIcon />}
					{loading && <CircularProgress size={24} />}
					{error && <WarningIcon titleAccess={error.message} />}
				</IconButton>
			}
		>
			<ListItemText primary={song.title} />
		</ListItem>
	);
};

export default Song;
