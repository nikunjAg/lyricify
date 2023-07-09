import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Songs from './pages/songs';
import Layout from './components/Layout/Layout';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/songs' element={<Songs />} />
        <Route path='*' element={<Navigate to="/songs" replace />} />
      </Route>
    </Routes>
  );
}

export default Router;