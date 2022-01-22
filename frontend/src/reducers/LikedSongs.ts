export const actions = {
  SOCKET_LOADED: "SOCKET_LOADED",
}



const DEFAULT_STATE:any = [
  {id: 1, title: 'Czarna woda', artist: 'Zarzecki', album:'Woda', addTime: '12h ago', length: '2:25'},
  {id: 2, title: 'Bonbon(English Version Cover Art)', artist: 'Era Istrefi', album:'Covers', addTime: 'Today', length: '2:47'}
];

export const LikedSongs = (state:any = DEFAULT_STATE, action:any) => {
  switch (action.type) {
      case actions.SOCKET_LOADED: 
          return { 
            ...state,
            ...action.payload
           }
      default: 
        return state;
  }
}