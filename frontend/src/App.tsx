import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
// import 'react-h5-audio-player/lib/styles.css';
import './styles/root.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoutes } from './modules/Auth';
import { LikedRoutes } from './modules/Liked';
import Layout from './components/Layout';
import Audio from './components/Audio/Audio';

function App(){
  return(
    <Provider store={store}>
    <Layout>
      <BrowserRouter>
        <Routes>
          { LikedRoutes }
          { AuthRoutes }
        </Routes>
      </BrowserRouter>
    </Layout>
    <Audio />
    </Provider>
  )
}


export default App;
