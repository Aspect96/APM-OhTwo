export const fetchUserData = ({ username, password }) => (dispatch, getState) => {
  /* TODO: fetch user data from firebase. Check if user is valid and so on. Then return status code (200, 400, 404) */
  const user = {
    id: 42,
    user: 'test',
    token: 'xxyz'
  }

  return user
}