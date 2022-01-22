import * as songReducer from '../reducers/PlayerSong';

export const setBlob = (song:any) => ({
  type: songReducer.actions.SET_BLOB,
  payload: song,
});

export const setPlayerState = (state:any) => ({
  type: songReducer.actions.SET_STATE,
  payload: state,
});
