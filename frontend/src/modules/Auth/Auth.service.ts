import { useMutation } from 'react-query'
import { axiosInstance } from '../../services/axios'
import { AuthLoginResponse } from '../../interfaces/AuthLoginResponse'

interface AuthLoginPayload {
  login: string
  password: string
}

async function authLogin({
  payload,
}: {
  payload: AuthLoginPayload
}): Promise<AuthLoginResponse> {
  const { data }: { data: AuthLoginResponse } = await axiosInstance.post(
    '/auth/login',
    payload
  )
  return data ?? []
}

export function useAuthLogin() {
  return useMutation(authLogin)
}
