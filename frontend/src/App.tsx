import { useState, useEffect, createContext } from 'react'
// import axios from 'axios';
import { Provider, useSelector } from 'react-redux'
import { store } from './store'
// import 'react-h5-audio-player/lib/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './styles/root.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthRoutes } from './modules/Auth'
import { LikedRoutes } from './modules/Liked'
import { HomeRoutes } from './modules/Home'
import Layout from './components/Layout'
import Audio from './components/Audio/Audio'
import { AudioProvider } from './components/AudioProvider'
const queryClient = new QueryClient()

interface AudioStoreProps {
  blob: string | null
}

const DEFAULT_AUDIO_STORE: AudioStoreProps = {
  blob: null,
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AudioProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                {HomeRoutes}
                {LikedRoutes}
                {AuthRoutes}
              </Routes>
            </Layout>
          </BrowserRouter>
          <Audio />
          <ReactQueryDevtools />
        </AudioProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
