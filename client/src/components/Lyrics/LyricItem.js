import React from "react";
import { CircularProgress, IconButton, ListItem, ListItemText } from "@mui/material";
import { Delete as DeleteIcon, WarningAmber as WarningIcon, FavoriteBorder as LikeIcon } from "@mui/icons-material";

import classes from './style.module.css';
import { useMutation } from "@apollo/client";
import { DELETE_LYRIC_BY_ID } from "../../graphql/queries/lyric";
import { SONG_BY_ID } from "../../graphql/queries/song";

const LyricItem = (props) => {

	const { lyric, songId } = props;
	const [deleteLyricById, { loading, error }] = useMutation(DELETE_LYRIC_BY_ID);


	const playUtterance = (strs, i) => {

		// Cancel if already playing one 
		if (speechSynthesis.speaking)
			speechSynthesis.cancel();

		console.log(strs[i], typeof strs[i]);

		// Create a new SpeechUtterance
		const utterance = new SpeechSynthesisUtterance(strs[i]);
		utterance.voice = speechSynthesis.getVoices()[1];

		// Pass utterance to speech
		speechSynthesis.speak(utterance);

		utterance.onend = () => {
			console.log("ended", strs[i]);
			if (i === strs.length) return;
			playUtterance(strs, i+1);
		};
	}

	const playText = text => {

		const strs = [];

		for(let i = 0;i < text.length;) {
			let str = text.substring(i, i + 100);
			const remStr = text.substring(i+100);
			const endIdx = remStr.indexOf("."), commaIdx = remStr.indexOf(",");
			console.log(str, remStr, endIdx, commaIdx);
			// if (endIdx + i < 0 || commaIdx + 100 < i+100) break;

			if (endIdx <= commaIdx) {
				str += remStr.substring(0, endIdx);
				i = endIdx + 1;
			} else {
				str += remStr.substring(0, commaIdx);
				i = commaIdx + 1;
			}

			strs.push(str);
		}

		playUtterance(strs, 0);
	}
 
	const lyricClickHandler = async () => {
		playText(lyric.content);
	}

	const likeLyricHandler = async () => {

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
			title="Click to Play"
			secondaryAction={
				<>
					<IconButton
						onClick={likeLyricHandler}
						color="primary"
					>
						<LikeIcon />
					</IconButton>
					<IconButton
						onClick={deleteLyricHandler}
						disabled={loading}
						color="primary"
					>
						{!error && !loading && <DeleteIcon color="primary" />}
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
