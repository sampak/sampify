import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist, updatePlaylist } from "../../actions";
import Playlist from "../../components/Playlist";
import { Playlist as PlaylistInterface } from "../../interfaces/Playlist";
import { useSongs } from './Home.service';
function Home(){
  const { data: songs, refetch: refetchHome } = useSongs();
  const dispatch = useDispatch();
  const playlists:any = useSelector((state: any) => state.Playlists);

  useEffect(() => {
    const isPlaylist = playlists.find((playlist: PlaylistInterface) => playlist.playlistGuid === 'ALL_SONGS');
    const newPlaylist = {
      playlistGuid: 'ALL_SONGS',
      songs: songs ?? []
    };
    if(isPlaylist) {
      dispatch(updatePlaylist(newPlaylist));
      return;
    }
    
    dispatch(addPlaylist(newPlaylist))
  }, [songs]);


  return <Playlist playlistGuid={'ALL_SONGS'} refetch={refetchHome} songs={songs ?? []} />
}

export default Home;