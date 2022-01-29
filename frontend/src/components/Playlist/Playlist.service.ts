import { useMutation } from 'react-query'
import { axiosInstance } from '../../services/axios'
import Song from '../../interfaces/Song'

async function insertSong({ payload }: any): Promise<Song[]> {
  const { data: response } = await axiosInstance.post('/song', payload)
  return response.data
}

export function useInsertSong() {
  return useMutation(insertSong)
}
