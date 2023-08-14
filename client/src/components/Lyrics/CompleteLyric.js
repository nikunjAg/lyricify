import React from "react";
import { Link } from "react-router-dom";

import classes from "./style.module.css";

const CompleteLyric = (props) => {
	const { loading, error, data, songId } = props;

	if (loading && !data) {
		return <p>Loading...</p>;
	}

	if (error && !data) {
		console.log(error);
		return <p>Something went Wrong!!</p>;
	}

	const { lyric } = data;

	if (!lyric) {
		return (
			<div>
				<h4>Sorry!!</h4>
				<p>Lyric you are looking for doesn't exists</p>
			</div>
		);
	}

	return (
		<div className={classes.completeLyric}>
			<div className={classes.songHeader}>
				<h3>{lyric.song?.title}</h3>
				<Link className={classes.userLink} to={`/users/${lyric?.song?.userId}`}>
					<i> ~ Nikunj Aggarwal</i>
				</Link>
			</div>
			<div className={classes.lyricContent}>
				<p>{lyric.content}</p>
				<Link className={classes.userLink} to={`/users/${lyric.userId}`}>
					<i> ~ Nikunj Aggarwal</i>
				</Link>
			</div>
		</div>
	);
};

export default CompleteLyric;
