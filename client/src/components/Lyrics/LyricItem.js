import React from "react";
import { CircularProgress, IconButton, ListItem, ListItemText } from "@mui/material";
import { Delete as DeleteIcon, WarningAmber as WarningIcon } from "@mui/icons-material";

import classes from './style.module.css';
import { useMutation } from "@apollo/client";
import { DELETE_LYRIC_BY_ID } from "../../graphql/queries/lyric";
import { SONG_BY_ID } from "../../graphql/queries/song";

const LyricItem = (props) => {

	const { lyric, songId } = props;
	const [deleteLyricById, { loading, error }] = useMutation(DELETE_LYRIC_BY_ID);

	const deleteLyricHandler = async () => {
		try {

			const lyricId = lyric.id;

			await deleteLyricById({
				variables: { lyricId },
				update: (cache) => {
					cache.updateQuery(
						{query: SONG_BY_ID, variables: { songId }, },
						data => {

							const { song: oldSong } = data;
							const updatedLyrics = (
								oldSong.lyrics || []
							).filter(lyric => lyric.id !== lyricId);

							return {
								song: {
									...oldSong,
									lyrics: updatedLyrics,
								}
							};
						},
					);
				}
			});

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ListItem
			key={lyric.id}
			className={classes.lyricItem}
			secondaryAction={
				<IconButton
					onClick={deleteLyricHandler}
					disabled={loading}
					color="primary"
				>
					{!error && !loading && <DeleteIcon color="primary" />}
					{loading && <CircularProgress size={24} />}
					{error && <WarningIcon titleAccess={error.message} />}
				</IconButton>
			}
		>
			<ListItemText>{lyric.content}</ListItemText>
		</ListItem>
	);
};

export default LyricItem;
