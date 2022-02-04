import { useQuery } from 'react-query'
import { axiosInstance } from '../../services/axios'
import Song from '../../interfaces/Song'

async function getSongs(): Promise<Song[]> {
  const { data } = await axiosInstance.get('/song/liked')
  return data
}

export function useSongs(): { data: Song[] | undefined; refetch: () => void } {
  const { data, refetch } = useQuery('Liked.songs', getSongs)
  return { data, refetch }
}
