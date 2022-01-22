import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import './styles/audioPlayer.scss';
import 'react-h5-audio-player/lib/styles.css';
import useMusic from './hooks/useMusic';
const mockedList = [
  {id: 1, name: 'Zarzycki-Czarna-woda'},
  {id: 2, name: 'Era-Istrefi-Bonbon(English Version Cover Art)'},
]
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthRoutes } from './modules/Auth';

// function App(){
//   return(
//     <BrowserRouter>
//       <Routes>
//         { AuthRoutes }
//       </Routes>
//     </BrowserRouter>
//   )
// }

// async function take(url: string){
//   fetch(url).then(async (response) => {
//     console.log(response.body);
//     const blob = await response.blob();
//     console.log(URL.createObjectURL(blob));

//     return URL.createObjectURL(blob);
//   });
// }

function Audio({ music }: { music: string }){
  return (
    <AudioPlayer
    autoPlay
    showSkipControls
    showJumpControls={false}
    showDownloadProgress={false}
    showFilledProgress={true}
    showFilledVolume={true}
    src={music}
    onPlay={(e: any) => console.log("onPlay")}
    onEnded={() => {console.log('ended');}}
    // other props here
    />
  )
}

function App() {
  const [musicID, setMusicID] = useState<number>(2);
  const MusicHook = useMusic();


  useEffect(() => {
    MusicHook.fetch(musicID);
  }, [musicID]);
  

  const handleClick = (id: number) => {
    setMusicID(id);
  }

  return (
    <div className="App">
      <p>{musicID}</p>
      {console.log('render ', MusicHook.blob)}
      <Audio music={MusicHook.blob ?? ''} />
      {
        mockedList.map(music => {
          return ( <p key={music.id} onClick={() => handleClick(music.id)}>{music.name}<br /></p> )
        })
      }

    </div>
  );
}

export default App;
