import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faSearch, faEllipsisH, faPause } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SongList } from '../SongList';
import { PLAYER_STATUS } from '../../reducers/PlayerSong';
import * as SC from './Playlist.styled';
import Album from '../../assets/album.jpg'; // Mocked
import { setPlayerState } from '../../actions';
import useMusic from '../../hooks/useMusic';
function Playlist(){
  const dispatch = useDispatch();
  const MusicHook = useMusic();
  const LikedSongs:any = useSelector((state: any) => state.LikedSongs);
  const player:any = useSelector((state: any) => state.PlayerSong);


  const handleClickPlayButton = () => {
    if(player.state === PLAYER_STATUS.STOPPED){
      if(player.musicID && player.blob) {
        dispatch(setPlayerState(PLAYER_STATUS.WAITING_TO_STARTED));
        return;
      }
    }
    if(player.state === PLAYER_STATUS.NOT_LOADED){
      MusicHook.fetch(1); // TODO when user doesn't have saved music in localStorage and is not loaded in audio player then catch opened playlist and start first song
    }
    dispatch(setPlayerState(PLAYER_STATUS.WAITING_TOP_STOPPED));
  }

  return (
    <SC.Playlist>
      <SC.PlaylistData>
        <SC.PlaylistInformation>
          <SC.PlaylistTitle><FontAwesomeIcon icon={faHeart} /> Liked Songs</SC.PlaylistTitle>
          <SC.PlaylistDescription>A daily selection of chill beats perfect to help you to relax and study</SC.PlaylistDescription>
          <SC.Info>
            <SC.CreatedBy>Created by <b>Sampak</b></SC.CreatedBy>
            <SC.Songs>250 Songs 10Hr 6min</SC.Songs>
          </SC.Info>
        </SC.PlaylistInformation>
        <SC.PlaylistCover>
          <SC.PlaylistImage src={Album} />
        </SC.PlaylistCover>
      </SC.PlaylistData>


      <SC.Options>
        <SC.SearchBar>
          <SC.SearchBox><FontAwesomeIcon icon={faSearch} /></SC.SearchBox>
          <SC.Input type="text" />
        </SC.SearchBar>

        <SC.Settings>
          <SC.Box onClick={handleClickPlayButton}>
            {player.state !== PLAYER_STATUS.PLAYING ? (
              <FontAwesomeIcon icon={faPlay} />
            ) : ( 
              <FontAwesomeIcon icon={faPause} />
            )}
          
          
          </SC.Box>
          <SC.Box><FontAwesomeIcon icon={faHeart} /> <SC.TextWithPadding>2.9m</SC.TextWithPadding></SC.Box>
          <SC.Box><FontAwesomeIcon icon={faEllipsisH} /></SC.Box>
        </SC.Settings>
      </SC.Options>


      <SC.SongList>
        <SongList LikedSongs={LikedSongs} />

      </SC.SongList>
    </SC.Playlist>
  )
}

export default Playlist;