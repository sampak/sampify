export const actions = {
  USER_LOGGED: 'USER_LOGGED',
  UPDATE_BIDS: 'UPDATE_BIDS',
}

export interface User {
  _id?: string
  created_at?: boolean
  updated_at?: boolean
  permissions?: number
  winnedBids?: number
  bids?: number
  email?: string
  profile_url?: string
  avatar_large?: string
  avatar_medium?: string
  avatar_small?: string
  steamid?: string
  name?: string
}

export const user = (state: User = {}, action: any) => {
  switch (action.type) {
    case actions.USER_LOGGED:
      return { ...action.payload }
    case actions.UPDATE_BIDS:
      return {
        ...state,
        bids: action.payload,
      }
    default:
      return state
  }
}
