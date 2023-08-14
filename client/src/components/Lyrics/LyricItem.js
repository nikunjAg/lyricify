import React from "react";
import { CircularProgress, IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import { Delete as DeleteIcon, WarningAmber as WarningIcon, FavoriteBorder as LikeIcon } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

import classes from './style.module.css';
import { useMutation } from "@apollo/client";
import { DELETE_LYRIC_BY_ID, LIKE_LYRIC } from "../../graphql/queries/lyric";
import { SONG_BY_ID } from "../../graphql/queries/song";

const LyricItem = (props) => {

	const { lyric, songId } = props;
	
	const navigate = useNavigate();

	const [deleteLyricById, { loading, error }] = useMutation(DELETE_LYRIC_BY_ID);
	const [likeLyricById] = useMutation(LIKE_LYRIC);
 
	const lyricClickHandler = () => {
		navigate(`/songs/${songId}/lyrics/${lyric.id}`);
	}

	const likeLyricHandler = async (event) => {
		event.stopPropagation();
		const lyricId = lyric.id;
		const prevLikes = lyric.likes;

		try {
			await likeLyricById({
				variables: { lyricId },
				optimisticResponse: {
					likeLyric: {
						code: "200",
						__typename: "LikeLyricMutationResponse",
						message: "Lyriclikedsuccessfully",
						success: true,
						lyric: {
							id: lyricId,
							likes: prevLikes + 1,
							content: lyric.content,
							__typename: "Lyric",
						},
					},
				},
				update: (
					cache,
					{
						data: {
							likeLyric: { lyric: likedLyric },
						},
					}
				) => {
					cache.updateQuery(
						{ query: SONG_BY_ID, variables: { songId } },
						(data) => {
							const { song: oldSong } = data;
							const updatedLyrics = (oldSong.lyrics || []).map((lyric) =>
								lyric.id !== lyricId ? lyric : likedLyric
							);

							return {
								song: {
									...(oldSong || {}),
									lyrics: updatedLyrics,
								},
							};
						}
					);
				},
			});
		} catch (error) {
			console.log(error);
		}

	}

	const deleteLyricHandler = async (event) => {
		event.stopPropagation();
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
			onClick={lyricClickHandler}
			secondaryAction={
				<>
					<IconButton
						onClick={likeLyricHandler}
						color="primary"
						title="Like"
					>
						<LikeIcon color="primary" />
						<Typography variant="body2" ml={.5} >{lyric.likes}</Typography>
					</IconButton>
					<IconButton
						onClick={deleteLyricHandler}
						disabled={loading}
						color="primary"
					>
						{!error && !loading && <DeleteIcon titleAccess="Delete Lyric" color="primary" />}
						{loading && <CircularProgress size={24} />}
						{error && <WarningIcon titleAccess={error.message} />}
					</IconButton>
				</>
			}
		>
			<ListItemText>{lyric.content.substring(0, 100) + (lyric.content.length > 100 ? "..." : "")}</ListItemText>
		</ListItem>
	);
};

export default LyricItem;
