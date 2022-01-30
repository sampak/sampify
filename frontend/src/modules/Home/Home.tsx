import { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { addPlaylist, updatePlaylist } from '../../actions'
import Playlist from '../../components/Playlist'
import { Playlist as PlaylistInterface } from '../../interfaces/Playlist'
import { useSongs } from './Home.service'
import * as userService from '../../services/user';
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate();
  const { data: songs, refetch: refetchHome } = useSongs()
  const dispatch = useDispatch()
  const playlists: PlaylistInterface[] = useSelector(
    (state: RootStateOrAny) => state.Playlists
  )
  const playlist = playlists.find(
    (playlist) => playlist.playlistGuid === 'ALL_SONGS'
  )


  useEffect(() => {
    const token = userService.getToken();
  
    if(token.length === 0){
      navigate('/login');
      return;
    }

    const newPlaylist = {
      playlistGuid: 'ALL_SONGS',
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
      playlistGuid={'ALL_SONGS'}
      refetch={refetchHome}
      songs={playlist?.songs ?? []}
    />
  )
}

export default Home
