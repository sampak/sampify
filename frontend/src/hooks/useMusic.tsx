import { useEffect, useState } from 'react'
import { useRequest } from './Music.service'
import { useDispatch } from 'react-redux'
import { setBlob, setPlayerState } from '../actions'
import { PLAYER_STATUS } from '../reducers/PlayerSong'
const MUSIC_SRC =
  process.env.REACT_APP_STREAM_URL ?? 'http://localhost:4000/stream'

function useMusic() {
  const [songGuid, setSongGuid] = useState('')
  const [playlistGuid, setPlaylistGuid] = useState('')
  const dispatch = useDispatch()
  const { data: requestData, refetch: fetchRequest } = useRequest(songGuid)

  useEffect(() => {
    if (!requestData || !requestData.guid) return
    dispatch(
      setBlob({
        blob: `${MUSIC_SRC}/${requestData.guid}`,
        activePlaylistGuid: playlistGuid,
        activeSongGuid: songGuid,
      })
    )
    dispatch(setPlayerState(PLAYER_STATUS.LOADED_WAITING))
  }, [requestData])

  useEffect(() => {
    if (songGuid.length === 0) return
    fetchRequest()
  }, [songGuid])

  const fetch = async (newSongGuid: string, newPlaylistGuid: string) => {
    dispatch(setPlayerState(PLAYER_STATUS.WAITING_TO_STOPPED))

    setSongGuid(newSongGuid)
    setPlaylistGuid(newPlaylistGuid)
  }

  return { fetch }
}

export default useMusic
