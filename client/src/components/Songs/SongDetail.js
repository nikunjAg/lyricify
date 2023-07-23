import React from 'react';

import classes from './style.module.css';
import LyricsList from '../Lyrics/LyricsList';
import LyricCreate from '../Lyrics/LyricCreate';

const SongDetail = (props) => {

	const { loading, error, data, songId } = props;

	
	// console.log(data);
	if (loading && !data) {
		return <p>Loading...</p>;
	}

	if (error && !data) {
		console.log(error);
		return <p>Something went Wrong!!</p>;
	}

	const { song } = data;
	
	if (!song) {
		return (
			<div>
				<h4>Sorry!!</h4>
				<p>Song you are looking for doesn't exists</p>
			</div>
		);
	}

	return (
		<div className={classes.songDetail}>
			<h3>{song.title}</h3>
			<LyricsList lyrics={song.lyrics} songId={songId} />
			<LyricCreate songId={songId} />
		</div>
	);
}

export default SongDetail;