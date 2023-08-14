import React from "react";
import { useParams } from "react-router-dom";

import CompleteLyric from "../../components/Lyrics/CompleteLyric";
import { useQuery } from "@apollo/client";
import { GET_COMPLETE_LYRIC_BY_ID } from "../../graphql/queries/lyric";

const LyricDetail = () => {
	const { songId, lyricId } = useParams();

	const { loading, error, data } = useQuery(GET_COMPLETE_LYRIC_BY_ID, {
		variables: { lyricId },
	});

	return (
		<CompleteLyric
			loading={loading}
			error={error}
			songId={songId}
			data={data}
		/>
	);
};

export default LyricDetail;
