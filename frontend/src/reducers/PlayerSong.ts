export const actions = {
  SET_BLOB: 'SET_BLOB',
  SET_STATE: 'SET_STATE',
}

export enum PLAYER_STATUS {
  PLAYING = 'PLAYING',
  STOPPED = 'STOPPED',
  ERROR = 'ERROR',
  LOADED_WAITING = 'LOADED_WAITING',
  NOT_LOADED = 'NOT_LOADED',
  WAITING_TO_STOPPED = 'WAITING_TO_STOPPED',
  WAITING_TO_STARTED = 'WAITING_TO_STARTED',
  WAITING_FOR_CHANGE = 'WAITING_FOR_CHANGE',
}

export interface PlayerSongProps {
  blob: string | null
  state: PLAYER_STATUS
  activePlaylistGuid: string
  activeSongGuid: string | null
}

export const DEFAULT_PLAYER_SONG: PlayerSongProps = {
  blob: null,
  state: PLAYER_STATUS.NOT_LOADED,
  activePlaylistGuid: 'ALL_SONG',
  activeSongGuid: null,
}

export const PlayerSong = (
  state: PlayerSongProps = DEFAULT_PLAYER_SONG,
  action: { type: string; payload: PlayerSongProps }
) => {
  switch (action.type) {
    case actions.SET_BLOB:
      return {
        ...state,
        blob: action.payload.blob,
        activePlaylistGuid: action.payload.activePlaylistGuid,
        activeSongGuid: action.payload.activeSongGuid,
      }
    case actions.SET_STATE:
      return {
        ...state,
        state: action.payload,
      }
    default:
      return state
  }
}
