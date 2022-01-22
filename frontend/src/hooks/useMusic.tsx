import { useState } from 'react';
import axios, {AxiosRequestHeaders} from 'axios';
const CHUNK_SIZE = (10 ** 6); // TODO MOVE TO ENV
const MUSIC_SRC = 'http://localhost:4000/music';

function useMusic() {
  const [blob, setBlob] = useState<string|null>(null);
  let parts:Blob[] = [];

  // Problem to solved user must wait to end download song
  const fetch = async (musicID: number, partID: number = 0, contentSize: number|null = null) => { // In the future in this hook we can easly implement authorize with backend
    let range:number = CHUNK_SIZE * partID;
    if(contentSize && range > contentSize){
      if(!!!parts.length) {
        console.error('Fetching error');
        return;
      }
      setBlob(URL.createObjectURL(new Blob(parts)));
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
    fetch(musicID, partID + 1, HeaderContentSize);
    parts.push(result.data);
  }

  return { blob, fetch }
}

export default useMusic;