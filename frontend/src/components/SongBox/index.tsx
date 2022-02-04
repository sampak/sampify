import { faHeart, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerState, updateLiked } from '../../actions'
import useMusic from '../../hooks/useMusic'
import Song from '../../interfaces/Song'
import { RootState } from '../../reducers'
import { PlayerSongProps, PLAYER_STATUS } from '../../reducers/PlayerSong'
import { millisToMinutesAndSeconds } from '../../utils/duration'
import * as SC from './Song.styled'
import { useDeleteLiked, usePostLiked } from './SongBox.service'

interface SongProps {
  song: Song
  playlistGuid: string
  refetch?: () => void
}

function SongBox({ song, playlistGuid, refetch }: SongProps) {
  const [isMouse, setIsMouse] = useState<boolean>(false)

  const player: PlayerSongProps = useSelector(
    (state: RootState) => state.PlayerSong
  )
  const dispatch = useDispatch()
  const MusicHook = useMusic()
  const { mutate: addLiked } = usePostLiked(song.guid ?? '')
  const { mutate: deleteLiked } = useDeleteLiked(song.likedGuid ?? '')

  const isActiveBox = () =>
    player.activeSongGuid === song.guid &&
    playlistGuid === player.activePlaylistGuid

  const isPlayIcon = () =>
    player.activeSongGuid === song.guid &&
    player.state === PLAYER_STATUS.PLAYING &&
    playlistGuid === player.activePlaylistGuid

  const handleClickStart = (songGuid: string) => {
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

  const handleClickLikeButton = () => {
    switch (song.liked) {
      case true:
        dispatch(
          updateLiked({
            playlistGuid: playlistGuid,
            songGuid: song.guid,
            state: false,
          })
        )
        deleteLiked(undefined, {
          onSuccess: () => {
            console.log('success')
            if (refetch) {
              refetch()
            }
          },

          onError: () => {
            updateLiked({
              playlistGuid: playlistGuid,
              songGuid: song.guid,
              state: true,
            })
          },
        })
        break
      default:
        dispatch(
          updateLiked({
            playlistGuid: playlistGuid,
            songGuid: song.guid,
            state: true,
          })
        )

        addLiked(undefined, {
          onSuccess: () => {
            console.log('success')
            if (refetch) {
              refetch()
            }
          },

          onError: () => {
            console.log('is Error')
            updateLiked({
              playlistGuid: playlistGuid,
              songGuid: song.guid,
              state: false,
            })
          },
        })
        break
    }
  }

  return (
    <SC.ListBox
      onMouseEnter={() => setIsMouse(true)}
      onMouseLeave={() => setIsMouse(false)}
      key={song.guid}
      active={isActiveBox()}
    >
      <SC.Id
        onClick={() => {
          handleClickStart(song.guid)
        }}
      >
        {isPlayIcon() ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </SC.Id>
      <SC.Title>{song.title}</SC.Title>
      <SC.Artist></SC.Artist>
      <SC.Album></SC.Album>
      <SC.AddDate style={{ textAlign: 'center' }}>{song.addTime}</SC.AddDate>
      <SC.Length style={{ textAlign: 'center' }}>
        {millisToMinutesAndSeconds(song.duration)}
      </SC.Length>
      <SC.SongOptions liked={song.liked} active={isMouse}>
        <FontAwesomeIcon onClick={handleClickLikeButton} icon={faHeart} />
      </SC.SongOptions>
    </SC.ListBox>
  )
}

export default SongBox
