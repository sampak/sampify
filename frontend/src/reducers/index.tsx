import { combineReducers } from "redux";
import { LikedSongs } from './LikedSongs';
import { PlayerSong } from './PlayerSong';


export default combineReducers({
    LikedSongs,
    PlayerSong
});