const AUTH_TOKEN = 'kolbord_authToken'

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN)
}
