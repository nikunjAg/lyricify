import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Songs from './pages/songs';
import CreateSong from './pages/songs/new';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/songs' element={<Songs />} />
        <Route path='/songs/new' element={<CreateSong />} />
        <Route path='*' element={<Navigate to="/songs" replace />} />
      </Route>
    </Routes>
  );
}

export default Router;