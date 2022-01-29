import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useMusic from "../../hooks/useMusic";
import { Playlist } from "../../interfaces/Playlist";
import { DEFAULT_PLAYER_SONG, PlayerSongProps, PLAYER_STATUS } from "../../reducers/PlayerSong";

export const AudioContext = createContext(DEFAULT_PLAYER_SONG);

export const AudioProvider = ({ children }: {children: any}) => {
  const player:PlayerSongProps = useSelector((state: any) => state.PlayerSong);
  const playlists:Playlist[] = useSelector((state: any) => state.Playlists);
  const MusicHook = useMusic();

  const getNextSong = () => { 
    const playlist = playlists.find(playlist => player.activePlaylistGuid === playlist.playlistGuid);

    if(playlist) {
      const songs = playlist.songs ?? [];
      const index = songs.findIndex(song => ( player.activeSongGuid === song.guid));
      const newSong = songs[index + 1] ?? null;
      if(!newSong) {
        return songs[0];
      } 
      return newSong;
    }
    return null;
  }

  useEffect(() => {
    if(player.state === PLAYER_STATUS.WAITING_FOR_CHANGE){
      const song = getNextSong();
      if(!song){
        return; 
      }
      MusicHook.fetch(song.guid, player.activePlaylistGuid);
    }
  }, [player.state]);

  return (
    <AudioContext.Provider value={player}>
      { children }
    </AudioContext.Provider>
  )
}
