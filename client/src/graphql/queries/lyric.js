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

export const GET_COMPLETE_LYRIC_BY_ID = gql`
	query GetCompleteLyricById($lyricId: String!) {
		lyric(id: $lyricId) {
			__typename
			id
			content
			likes
			isLiked
			song {
				__typename
				id
				title
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
			likes
			isLiked
		}
	}
`;

export const CREATE_LYRIC = gql`
	mutation createLyric($content: String!, $songId: String!) {
		addLyric(content: $content, songId: $songId) {
			code
			success
			message
			lyric {
				id
				likes
				content
			}
		}
	}
`;

export const LIKE_LYRIC = gql`
	mutation likeLyric($lyricId: String!) {
		likeLyric(id: $lyricId) {
			code
			success
			message
			lyric {
				id
				likes
				content
				isLiked
			}
		}
	}
`;