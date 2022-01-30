import { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { addPlaylist, updatePlaylist } from '../../actions'
import Playlist from '../../components/Playlist'
import { Playlist as PlaylistInterface } from '../../interfaces/Playlist'
import { useSongs } from './Liked.service'

function Liked() {
  const { data: songs, refetch: refetchHome } = useSongs()
  const dispatch = useDispatch()
  const playlists: PlaylistInterface[] = useSelector(
    (state: RootStateOrAny) => state.Playlists
  )
  const playlist = playlists.find(
    (playlist) => playlist.playlistGuid === 'LIKED_SONGS'
  )

  useEffect(() => {
    const newPlaylist = {
      playlistGuid: 'LIKED_SONGS',
      songs: songs ?? [],
    }
    if (playlist) {
      dispatch(updatePlaylist(newPlaylist))
      return
    }

    dispatch(addPlaylist(newPlaylist))
  }, [songs])

  return (
    <Playlist
      playlistGuid={'LIKED_SONGS'}
      refetch={refetchHome}
      songs={playlist?.songs ?? []}
    />
  )
}

export default Liked
