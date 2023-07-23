import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { SONG_BY_ID } from '../../graphql/queries/song';
import SongDetail from '../../components/Songs/SongDetail';

const SongDetailPage = () => {

    const { id } = useParams();
	const { data, loading, error } = useQuery(SONG_BY_ID, { variables: { songId: id }, fetchPolicy: 'cache-and-network' });

    return (
        <SongDetail data={data} loading={loading} error={error} songId={id} />
    )
}

export default SongDetailPage;