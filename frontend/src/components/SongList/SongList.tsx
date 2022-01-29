import * as SC from './SongList.styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faCalendar,
  faClock,
  faPause,
} from '@fortawesome/free-solid-svg-icons'
import useMusic from '../../hooks/useMusic'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerSongProps, PLAYER_STATUS } from '../../reducers/PlayerSong'

import Song from '../../interfaces/Song'
import { millisToMinutesAndSeconds } from '../../utils/duration'
import { setPlayerState } from '../../actions'

function SongList({
  songs,
  playlistGuid,
}: {
  songs: Song[]
  playlistGuid: string
}) {
  const player: PlayerSongProps = useSelector((state: any) => state.PlayerSong)
  const dispatch = useDispatch()
  const MusicHook = useMusic()

  const handleClickStart = (songGuid: any) => {
    if (playlistGuid !== player.activePlaylistGuid) {
      dispatch(setPlayerState(PLAYER_STATUS.WAITING_TO_STOPPED))
      MusicHook.fetch(songGuid, playlistGuid)
      return
    }

    if (songGuid === player.activeSongGuid) {
      if (player.state === PLAYER_STATUS.STOPPED) {
        dispatch(setPlayerState(PLAYER_STATUS.WAITING_TO_STARTED))
        return
      }
      if (player.state === PLAYER_STATUS.PLAYING) {
        dispatch(setPlayerState(PLAYER_STATUS.WAITING_TO_STOPPED))
        return
      }
    }
    MusicHook.fetch(songGuid, playlistGuid)
  }

  return (
    <SC.SongList>
      <SC.Header>
        <SC.Id></SC.Id>
        <SC.Title>Song</SC.Title>
        <SC.Artist>Artist</SC.Artist>
        <SC.Album>Album</SC.Album>
        <SC.AddDate style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faCalendar} />
        </SC.AddDate>
        <SC.Length style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faClock} />
        </SC.Length>
      </SC.Header>

      <SC.List>
        {songs &&
          songs.map((song) => (
            <SC.ListBox
              key={song.guid}
              active={
                player.activeSongGuid === song.guid &&
                playlistGuid === player.activePlaylistGuid
              }
            >
              <SC.Id
                onClick={() => {
                  handleClickStart(song.guid)
                }}
              >
                {player.activeSongGuid === song.guid &&
                player.state === PLAYER_STATUS.PLAYING &&
                playlistGuid === player.activePlaylistGuid ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </SC.Id>
              <SC.Title>{song.title}</SC.Title>
              <SC.Artist></SC.Artist>
              <SC.Album></SC.Album>
              <SC.AddDate style={{ textAlign: 'center' }}>
                {song.addTime}
              </SC.AddDate>
              <SC.Length style={{ textAlign: 'center' }}>
                {millisToMinutesAndSeconds(song.duration)}
              </SC.Length>
            </SC.ListBox>
          ))}
      </SC.List>
    </SC.SongList>
  )
}

export default SongList
