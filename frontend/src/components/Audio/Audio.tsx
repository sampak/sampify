import { useRef, useEffect, useContext, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerState } from '../../actions'
import useMusic from '../../hooks/useMusic'
import { Playlist } from '../../interfaces/Playlist'
import { PLAYER_STATUS } from '../../reducers/PlayerSong'
import '../../styles/audioPlayer.scss'
import { getNextSong, getPreviouslySong } from '../../utils/playlists'
import { AudioContext } from '../AudioProvider'
function Audio() {
  const [volume, setVolume] = useState(
    parseFloat(localStorage.getItem('audio_volume') ?? '0.5')
  )
  const [_, setLastSongBlob] = useState<string | null>(null)
  const playlists: Playlist[] = useSelector((state: any) => state.Playlists)
  const dispatch = useDispatch()
  const MusicHook = useMusic()
  const player: any = useRef()
  const playerSong = useContext(AudioContext)

  useEffect(() => {
    setLastSongBlob(playerSong.blob)
  }, [playerSong.blob])

  useEffect(() => {
    if (!player.current) return
    if (
      playerSong.state === PLAYER_STATUS.LOADED_WAITING &&
      player.current.isPlaying() === false
    ) {
      player.current.audio.current.play()
      return
    }

    if (
      playerSong.state === PLAYER_STATUS.WAITING_TO_STARTED &&
      player.current.isPlaying() === false
    ) {
      player.current.audio.current.play()
      return
    }

    if (
      playerSong.state === PLAYER_STATUS.WAITING_TO_STOPPED &&
      player.current.isPlaying() === true
    ) {
      player.current.audio.current.pause()
      return
    }
  }, [playerSong.state])

  const onClickPrevious = () => {
    if (!player.current) return
    if (player.current.audio.current.currentTime > 5) {
      player.current.audio.current.currentTime = 0
      return
    }

    const song = getPreviouslySong(
      playlists,
      playerSong.activePlaylistGuid,
      playerSong.activeSongGuid
    )
    if (!song) {
      player.current.audio.current.currentTime = 0
      return
    }
    MusicHook.fetch(song.guid, playerSong.activePlaylistGuid)
  }

  const onClickNext = () => {
    const song = getNextSong(
      playlists,
      playerSong.activePlaylistGuid,
      playerSong.activeSongGuid
    )
    if (!song) {
      return
    }
    MusicHook.fetch(song.guid, playerSong.activePlaylistGuid)
  }

  const onVolumeChange = () => {
    if (!player.current) return
    const newVolume = player.current.audio.current.volume
    localStorage.setItem('audio_volume', newVolume)
    setVolume(newVolume)
  }

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
      volume={volume}
      onPlay={() => dispatch(setPlayerState(PLAYER_STATUS.PLAYING))}
      onEnded={() => dispatch(setPlayerState(PLAYER_STATUS.WAITING_FOR_CHANGE))}
      onPause={() => dispatch(setPlayerState(PLAYER_STATUS.STOPPED))}
      onClickPrevious={onClickPrevious}
      onClickNext={onClickNext}
      onVolumeChange={onVolumeChange}
      // other props here
    />
  )
}

export default Audio
