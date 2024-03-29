import { createContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useMusic from '../../hooks/useMusic'
import { Playlist } from '../../interfaces/Playlist'
import { RootState } from '../../reducers'
import {
  DEFAULT_PLAYER_SONG,
  PlayerSongProps,
  PLAYER_STATUS,
} from '../../reducers/PlayerSong'
import { getNextSong } from '../../utils/playlists'

export const AudioContext = createContext(DEFAULT_PLAYER_SONG)

export const AudioProvider = ({ children }: { children: JSX.Element[] }) => {
  const player: PlayerSongProps = useSelector(
    (state: RootState) => state.PlayerSong
  )
  const playlists: Playlist[] = useSelector(
    (state: RootState) => state.Playlists
  )
  const MusicHook = useMusic()

  useEffect(() => {
    if (player.state === PLAYER_STATUS.WAITING_FOR_CHANGE) {
      const song = getNextSong(
        playlists,
        player.activePlaylistGuid,
        player.activeSongGuid
      )
      if (!song) {
        return
      }
      MusicHook.fetch(song.guid, player.activePlaylistGuid)
    }
  }, [
    player.state,
    MusicHook,
    player.activePlaylistGuid,
    player.activeSongGuid,
    playlists,
  ])

  return (
    <AudioContext.Provider value={player}>{children}</AudioContext.Provider>
  )
}
