import { Playlist } from "../interfaces/Playlist";

export const getNextSong = (playlists: Playlist[], activePlaylistGuid: string, activeSongGuid: string|null) => { 
  const playlist = playlists.find(playlist => activePlaylistGuid === playlist.playlistGuid);

  if(playlist) {
    const songs = playlist.songs ?? [];
    const index = songs.findIndex(song => ( activeSongGuid === song.guid));
    const newSong = songs[index + 1] ?? null;
    if(!newSong) {
      return songs[0];
    } 
    return newSong;
  }
  return null;
}

export const getPreviouslySong = (playlists: Playlist[], activePlaylistGuid: string, activeSongGuid: string|null) => {
  const playlist = playlists.find(playlist => activePlaylistGuid === playlist.playlistGuid);
  if(playlist) {
    const songs = playlist.songs ?? [];
    const index = songs.findIndex(song => ( activeSongGuid === song.guid));
    const newSong = songs[index - 1] ?? null;
    if(newSong) {
      return newSong;
    } 
  }
  return null;
}