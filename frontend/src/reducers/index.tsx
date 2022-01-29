import { combineReducers } from 'redux'
import { Playlists } from './Playlists'
import { PlayerSong } from './PlayerSong'

export default combineReducers({
  Playlists,
  PlayerSong,
})
