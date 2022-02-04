import { combineReducers } from 'redux'
import { Playlists } from './Playlists'
import { PlayerSong } from './PlayerSong'

export const rootReducer = combineReducers({
  Playlists,
  PlayerSong,
})

export type RootState = ReturnType<typeof rootReducer>
