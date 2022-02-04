import { useMutation } from 'react-query'
import { axiosInstance } from '../../services/axios'
// import { AuthLoginResponse } from '../../interfaces/AuthLoginResponse'

async function postLiked(songGuid: string): Promise<any> {
  const { data }: { data: any } = await axiosInstance.post(
    `/song/liked/${songGuid}`
  )
  return data ?? []
}

async function deleteLiked(guid: string): Promise<any> {
  const { data }: { data: any } = await axiosInstance.delete(
    `/song/liked/${guid}`
  )
  return data ?? []
}

export function usePostLiked(songGuid: string) {
  return useMutation(() => {
    return postLiked(songGuid)
  })
}

export function useDeleteLiked(guid: string) {
  return useMutation(() => {
    return deleteLiked(guid)
  })
}
