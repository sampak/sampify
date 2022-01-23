import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
// import 'react-h5-audio-player/lib/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './styles/root.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoutes } from './modules/Auth';
import { LikedRoutes } from './modules/Liked';
import { HomeRoutes } from './modules/Home';
import Layout from './components/Layout';
import Audio from './components/Audio/Audio';
const queryClient = new QueryClient();

function App(){
  return(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <BrowserRouter>
            <Routes>
              { HomeRoutes }
              { LikedRoutes }
              { AuthRoutes }
            </Routes>
          </BrowserRouter>
        </Layout>
        <Audio />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  )
}


export default App;
