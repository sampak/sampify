import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faSearch, faEllipsisH, faPause } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SongList } from '../SongList';
import Lottie from 'lottie-react';
import { PlayerSongProps, PLAYER_STATUS } from '../../reducers/PlayerSong';
import * as SC from './Playlist.styled';
import Album from '../../assets/album.jpg'; // Mocked
import { setPlayerState } from '../../actions';
import useMusic from '../../hooks/useMusic';
import Song from '../../interfaces/Song';
import { useInsertSong } from './Playlist.service';
import uploadAnimation from '../../assets/animations/upload.json';
import uploadLoadingAnimation from '../../assets/animations/loadingUpload.json';
import { milisToHoursAndSeconds } from '../../utils/duration';

interface PlaylistProps {
  songs: Song[],
  playlistGuid: string
  refetch: () => void 
}

function Playlist({ songs, playlistGuid, refetch }: PlaylistProps){
  const [dragFile, setDragFile] = useState(false);
  const [sendingFile, setSendingFile] = useState(false);
  const { mutate, isLoading } = useInsertSong();
  const dispatch = useDispatch();
  const MusicHook = useMusic();
  const player:PlayerSongProps = useSelector((state: any) => state.PlayerSong);

  const durationInMs = useMemo(() => { //TODO Rewrite! 
    let d = 0;

    for(const song of songs) {
      d += song.duration;
    }

    return Number(d);
  }, [songs]);

  const handleClickPlayButton = () => {

    if(playlistGuid !== player.activePlaylistGuid){
      MusicHook.fetch(songs[0].guid ?? '', playlistGuid);
      return;
    }
    
    if(player.state === PLAYER_STATUS.STOPPED){
      if(player.activeSongGuid && player.blob) {
        dispatch(setPlayerState(PLAYER_STATUS.WAITING_TO_STARTED));
        return;
      }
    }
    if(player.state === PLAYER_STATUS.NOT_LOADED){
      MusicHook.fetch(songs[0].guid ?? '', playlistGuid);
      return;
    }
    dispatch(setPlayerState(PLAYER_STATUS.WAITING_TO_STOPPED));
  }

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSendingFile(true);
      const file = e.dataTransfer.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);


      mutate({
        payload: formData,
       }, {
        onSuccess: () => {
          setDragFile(false);
          setSendingFile(false);
          refetch();
        },
        onError: () => {
          setDragFile(false);
          setSendingFile(false);
        }
      })
    }
  }

  const handleOnDrag = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <SC.Playlist onDragEnter={() => setDragFile(true) }>
      <SC.DragAndDrop active={dragFile} onDragLeave={() => setDragFile(false) }  onDragOver={handleOnDrag} onDrop={handleOnDrop} >
        {sendingFile ? (
          <>
            <SC.Animation>
                <Lottie animationData={uploadLoadingAnimation} />
            </SC.Animation>
            <SC.UploadText>Working...</SC.UploadText>
          </>
        ) : (
          <>
            <SC.Animation>
              <Lottie animationData={uploadAnimation} />
            </SC.Animation>
            <SC.UploadText>Drop a file right here</SC.UploadText>
          </>
      )}
    </SC.DragAndDrop>
      <SC.PlaylistData>
        <SC.PlaylistInformation>
          <SC.PlaylistTitle><FontAwesomeIcon icon={faHeart} /> Liked Songs</SC.PlaylistTitle>
          <SC.PlaylistDescription>A daily selection of chill beats perfect to help you to relax and study</SC.PlaylistDescription>
          <SC.Info>
            <SC.CreatedBy>Created by <b>Sampak</b></SC.CreatedBy>
            <SC.Songs>{songs.length} Songs { milisToHoursAndSeconds(durationInMs) }</SC.Songs>
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
            { (player.state === PLAYER_STATUS.PLAYING && player.activePlaylistGuid === playlistGuid) ? (
                <FontAwesomeIcon icon={faPause} />
              ) : ( 
                <FontAwesomeIcon icon={faPlay} />
            )}
          
          
          </SC.Box>
          <SC.Box><FontAwesomeIcon icon={faHeart} /> <SC.TextWithPadding>2.9m</SC.TextWithPadding></SC.Box>
          <SC.Box><FontAwesomeIcon icon={faEllipsisH} /></SC.Box>
        </SC.Settings>
      </SC.Options>


      <SC.SongList>
        <SongList playlistGuid={playlistGuid} songs={songs} />

      </SC.SongList>
    </SC.Playlist>
  )
}

export default Playlist;