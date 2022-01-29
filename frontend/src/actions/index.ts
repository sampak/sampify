import * as songReducer from '../reducers/PlayerSong';
import * as playlistReducer from '../reducers/Playlists';

import { Playlist } from '../interfaces/Playlist';
import Song from '../interfaces/Song';

export const setBlob = (song:any) => ({
  type: songReducer.actions.SET_BLOB,
  payload: song,
});

export const setPlayerState = (state:any) => ({
  type: songReducer.actions.SET_STATE,
  payload: state,
});


export const addPlaylist = (playlist: Playlist) => ({
  type: playlistReducer.actions.ADD_PLAYLIST,
  payload: playlist
});

export const updatePlaylist = (playlist: Playlist) => ({
  type: playlistReducer.actions.UPDATE_PLAYLIST,
  payload: playlist
})