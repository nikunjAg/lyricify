import { gql } from "@apollo/client";

export const DELETE_LYRIC_BY_ID = gql`
    mutation deleteLyricById($lyricId: String!) {
		deleteLyric(id: $lyricId) {
			__typename
			code
			success
			message
			lyric {
				__typename
				id
				content
			}
		}
	}
`;

export const GET_LYRIC_BY_ID = gql`
	query GetLyricById($lyricId: String!) {
		lyric(id: $lyricId) {
			__typename
			id
			content
		}
	}
`;