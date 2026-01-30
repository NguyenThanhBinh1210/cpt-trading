import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile } from '~/types/auth.type'
import { clearLS, getAccessTokenFromLS, getProfileFromLS } from '~/utils/auth'

interface AuthState {
  isAuthenticated: boolean
  profile: Profile | null
}

const initialState: AuthState = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  profile: getProfileFromLS()
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ isAuthenticated: boolean; profile: Profile | null }>) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.profile = action.payload.profile
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload
    },
    reset: (state) => {
      state.isAuthenticated = false
      state.profile = null
      clearLS()
    }
  }
})

export const { setAuth, setIsAuthenticated, setProfile, reset } = authSlice.actions
export default authSlice.reducer
