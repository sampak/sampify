import { useState } from 'react';
import axios, {AxiosRequestHeaders} from 'axios';
import { useDispatch } from 'react-redux';
import { setBlob, setPlayerState } from '../actions';
import { PLAYER_STATUS } from '../reducers/PlayerSong';
const CHUNK_SIZE = (10 ** 6); // TODO MOVE TO ENV
const MUSIC_SRC = 'http://localhost:4000/stream';

function useMusic() {
  const [blob] = useState<string|null>(null);
  const dispatch =  useDispatch();

  // Problem to solved user must wait to end download song
  const fetch = async (musicID: string, partID: number = 0, contentSize: number|null = null, parts: Blob[] = []) => { // In the future in this hook we can easly implement authorize with backend
    let range:number = (CHUNK_SIZE) * partID;
    if(contentSize && range > contentSize){
      if(!!!parts.length) {
        console.error('Fetching error');
        return;
      }
      // setBlob(URL.createObjectURL(new Blob(parts)));
      dispatch(setBlob({ blob: URL.createObjectURL(new Blob(parts)), musicID: musicID}));
      dispatch(setPlayerState(PLAYER_STATUS.LOADED_WAITING));
      parts = [];
      return;
    }

    const headers:AxiosRequestHeaders = {
      range: String(range)
    }

    const result = await axios.get(`${MUSIC_SRC}/${musicID}`, {
      headers,
      responseType: 'blob'
    });

    const HeaderContentSize = Number(result.headers['content-size']);
    parts.push(result.data);
    fetch(musicID, partID + 1, HeaderContentSize, parts);
  }

  return { blob, fetch }
}

export default useMusic;