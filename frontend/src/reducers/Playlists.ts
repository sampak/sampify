import { Playlist } from '../interfaces/Playlist'

export const actions = {
  ADD_PLAYLIST: 'ADD_PLAYLIST',
  UPDATE_PLAYLIST: 'UPDATE_PLAYLIST_SONGS',
}

const DEFAULT_STATE: Playlist[] = []

export const Playlists = (
  state = DEFAULT_STATE,
  action: { type: string; payload: Playlist }
) => {
  switch (action.type) {
    case actions.ADD_PLAYLIST:
      return state.concat(action.payload)
    case actions.UPDATE_PLAYLIST:
      return state.map((playlist) => {
        if (playlist.playlistGuid === action.payload.playlistGuid) {
          return action.payload
        }
        return playlist
      })
    default:
      return state
  }
}
