export const actionTypes = {
  SAVE_USER: 'SAVE_USER'
}

export function saveUser(user) {
  return {
    type: actionTypes.SAVE_USER,
    data: user
  }
}
