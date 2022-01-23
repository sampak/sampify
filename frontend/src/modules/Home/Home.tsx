import Playlist from "../../components/Playlist";
import { useSongs } from './Home.service';
function Home(){
  const { data: songs, refetch: refetchHome } = useSongs();
  return <Playlist refetch={refetchHome} songs={songs ?? []} />
}

export default Home;