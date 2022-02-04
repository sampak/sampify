import { useRef, useEffect, useContext, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerState } from '../../actions'
import useMusic from '../../hooks/useMusic'
import { Playlist } from '../../interfaces/Playlist'
import { RootState } from '../../reducers'
import { PLAYER_STATUS } from '../../reducers/PlayerSong'
import '../../styles/audioPlayer.scss'
import { getNextSong, getPreviouslySong } from '../../utils/playlists'
import { AudioContext } from '../AudioProvider'

// Possible problem when user stop audio for example in 0:20 and try to resume song after 10 minutes can get FORBIDDEN due to token expire
// What we need todo is when audio get error try to create again authorization token and resume the player

function Audio() {
  const [volume, setVolume] = useState(
    parseFloat(localStorage.getItem('audio_volume') ?? '0.5')
  )
  const [_, setLastSongBlob] = useState<string | null>(null)
  const playlists: Playlist[] = useSelector(
    (state: RootState) => state.Playlists
  )
  const dispatch = useDispatch()
  const MusicHook = useMusic()
  const player: any = useRef()
  const playerSong = useContext(AudioContext)

  useEffect(() => {
    setLastSongBlob(playerSong.blob)
  }, [playerSong.blob])

  useEffect(() => {
    if (!player.current) return

    switch (playerSong.state) {
      case PLAYER_STATUS.WAITING_TO_STOPPED:
        if (!player.current.isPlaying()) return
        player.current.audio.current.pause()
        dispatch(setPlayerState(PLAYER_STATUS.STOPPED))
        break
      case PLAYER_STATUS.WAITING_TO_STARTED:
        if (player.current.isPlaying()) return
        player.current.audio.current.play()
        dispatch(setPlayerState(PLAYER_STATUS.PLAYING))
        break
      default:
        break
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
      autoPlayAfterSrcChange={true}
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
