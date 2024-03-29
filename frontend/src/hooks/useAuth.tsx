interface UseAuth {
  user: boolean
  logIn: () => boolean
  logout: () => boolean
}

function useAuth(): UseAuth {
  const logIn = () => {
    return true
  }

  const logout = () => {
    return true
  }

  return { user: false, logIn, logout }
}

export default useAuth
