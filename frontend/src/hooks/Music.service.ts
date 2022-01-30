import { useQuery } from 'react-query'
import { RequestResponse } from '../interfaces/RequestResponse'
import { axiosInstance } from '../services/axios'

async function getRequest(guid: string): Promise<RequestResponse> {
  const { data } = await axiosInstance.get(`/stream/request/${guid}`)
  return data
}

export function useRequest(guid: string): {
  data: RequestResponse | undefined
  refetch: () => void
} {
  const { data, refetch } = useQuery(
    ['stream.request', guid],
    () => {
      return getRequest(guid)
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  )
  return { data, refetch }
}
