import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useContext, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerState } from '../../actions';
import { PLAYER_STATUS } from '../../reducers/PlayerSong';
import '../../styles/audioPlayer.scss';
import { AudioContext } from '../AudioProvider';
function Audio(){
  const [lastSongBlob, setLastSongBlob] = useState<string|null>(null);
  const dispatch = useDispatch();
  const player:any = useRef();
  const playerSong = useContext(AudioContext);

  useEffect(() => {
    setLastSongBlob(playerSong.blob);
  }, [playerSong.blob])

  useEffect(() => {
    if(!player.current) return;
    if(playerSong.state === PLAYER_STATUS.LOADED_WAITING && player.current.isPlaying() === false){
      player.current.audio.current.play();
      return;
    }

    if(playerSong.state === PLAYER_STATUS.WAITING_TO_STARTED && player.current.isPlaying() === false){
      player.current.audio.current.play();
      return;
    }

    if(playerSong.state === PLAYER_STATUS.WAITING_TO_STOPPED && player.current.isPlaying() === true){
      player.current.audio.current.pause();
      return;
    }

  }, [playerSong.state])


  return (
    <AudioPlayer
    ref={player}
    autoPlay={false}
    autoPlayAfterSrcChange={false}
    showSkipControls
    showJumpControls={false}
    showDownloadProgress={false}
    showFilledProgress={true}
    showFilledVolume={true}
    src={playerSong.blob ?? ''}
    onPlay={() => dispatch(setPlayerState(PLAYER_STATUS.PLAYING))}
    onEnded={() => dispatch(setPlayerState(PLAYER_STATUS.WAITING_FOR_CHANGE))}
    onPause={() => dispatch(setPlayerState(PLAYER_STATUS.STOPPED))}
    // other props here
    />
  );

}


export default Audio;