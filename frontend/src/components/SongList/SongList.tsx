import * as SC from './SongList.styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCalendar, faClock, faPause } from '@fortawesome/free-solid-svg-icons';
import useMusic from '../../hooks/useMusic';
import { useSelector } from 'react-redux';
import { PLAYER_STATUS } from '../../reducers/PlayerSong';

import Song from '../../interfaces/Song';
import {millisToMinutesAndSeconds} from '../../utils/duration';

function SongList({ songs }: { songs:Song[] }){
  const player:any = useSelector((state: any) => state.PlayerSong);
  const MusicHook = useMusic();

  const handleClickStart = (songID: any) => {
    MusicHook.fetch(songID);
  }

  return (
    <SC.SongList>
      <SC.Header>
          <SC.Id></SC.Id>
          <SC.Title>Song</SC.Title>
          <SC.Artist>Artist</SC.Artist>
          <SC.Album>Album</SC.Album>
          <SC.AddDate style={{textAlign: 'center'}}><FontAwesomeIcon icon={faCalendar} /></SC.AddDate>
          <SC.Length style={{textAlign: 'center'}}><FontAwesomeIcon icon={faClock} /></SC.Length>
      </SC.Header>


      <SC.List>

        {songs && ( 
          songs.map((song) => (
            <SC.ListBox key={song.guid} active={(player.musicID === song.guid )}>
              <SC.Id onClick={() => {  handleClickStart(song.guid); }}>
                { player.musicID === song.guid && player.state === PLAYER_STATUS.PLAYING ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
                
                </SC.Id>
              <SC.Title>{song.title}</SC.Title>
              <SC.Artist></SC.Artist>
              <SC.Album></SC.Album>
              <SC.AddDate style={{textAlign: 'center'}}>{song.addTime}</SC.AddDate>
              <SC.Length style={{textAlign: 'center'}}>{millisToMinutesAndSeconds(song.duration)}</SC.Length>
            </SC.ListBox> 
          )))}
      </SC.List>
    </SC.SongList>
  );
}

export default SongList;