export const actions = {
  SET_BLOB: "SET_BLOB",
  SET_STATE: "SET_STATE",
}

export enum PLAYER_STATUS {
  PLAYING = 'PLAYING',
  STOPPED = 'STOPPED',
  ERROR = 'ERROR',
  LOADED_WAITING = 'LOADED_WAITING',
  NOT_LOADED = 'NOT_LOADED',
  WAITING_TOP_STOPPED = 'WAITING_TOP_STOPPED',
  WAITING_TO_STARTED = 'WAITING_TOP_STARTED',
}

interface STATE {
  blob: string | null;
  musicID: number;
  state: PLAYER_STATUS
}

const DEFAULT_STATE:STATE = {
  blob: null,
  musicID: 1,
  state: PLAYER_STATUS.NOT_LOADED
};

export const PlayerSong = (state:STATE = DEFAULT_STATE, action:any) => {
  switch (action.type) {
      case actions.SET_BLOB: 
          return { 
            ...state,
            blob: action.payload.blob,
            musicID: action.payload.musicID
            
           }
      case actions.SET_STATE: 
          return { 
            ...state,
            state: action.payload  
          }
      default: 
        return state;
  }
}