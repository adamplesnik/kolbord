const AUTH_TOKEN = 'kolbord_authToken'

export const getOldToken = () => {
  return localStorage.getItem(AUTH_TOKEN)
}
