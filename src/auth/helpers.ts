const AUTH_TOKEN = 'kolbord_authToken'

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN)
}

export const setToken = (token: string) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN)
}
