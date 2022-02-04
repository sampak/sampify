import { Playlist } from '../interfaces/Playlist'

export const actions = {
  ADD_PLAYLIST: 'ADD_PLAYLIST',
  UPDATE_PLAYLIST: 'UPDATE_PLAYLIST_SONGS',
  UPDATE_LIKED: 'UPDATE_LIKED',
}

const DEFAULT_STATE: Playlist[] = []

export const Playlists = (
  state = DEFAULT_STATE,
  action: {
    type: string
    payload: any
  }
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
    case actions.UPDATE_LIKED:
      return state.map((playlist) => {
        if (playlist.playlistGuid === action.payload.playlistGuid) {
          const index =
            playlist.songs?.findIndex(
              (song) => song.guid === action.payload.songGuid
            ) ?? -1
          if (index === -1 || !playlist.songs) return playlist
          playlist.songs[index].liked = action.payload.state
        }
        return playlist
      })
    default:
      return state
  }
}
