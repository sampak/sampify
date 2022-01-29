import { useQuery } from 'react-query'
import { axiosInstance } from '../../services/axios'
import Song from '../../interfaces/Song'

async function getSongs(): Promise<Song[]> {
  const { data } = await axiosInstance.get('/song')
  return data
}

export function useSongs(): { data: Song[] | undefined; refetch: () => void } {
  const { data, refetch } = useQuery('Homepage.songs', getSongs)
  return { data, refetch }
}
