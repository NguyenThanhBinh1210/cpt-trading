import { Profile } from '~/types/auth.type'

// Save to localStorage or sessionStorage based on rememberMe
export const saveAccessToken = (access_token: string, rememberMe: boolean = true) => {
  if (rememberMe) {
    localStorage.setItem('access_token', access_token)
    sessionStorage.removeItem('access_token')
  } else {
    sessionStorage.setItem('access_token', access_token)
    localStorage.removeItem('access_token')
  }
}

export const saveProfile = (profile: Profile, rememberMe: boolean = true) => {
  if (rememberMe) {
    localStorage.setItem('profile', JSON.stringify(profile))
    sessionStorage.removeItem('profile')
  } else {
    sessionStorage.setItem('profile', JSON.stringify(profile))
    localStorage.removeItem('profile')
  }
}

// Legacy functions for backward compatibility
export const setAccesTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string, rememberMe: boolean = true) => {
  if (rememberMe) {
    localStorage.setItem('refresh_token', refresh_token)
    sessionStorage.removeItem('refresh_token')
  } else {
    sessionStorage.setItem('refresh_token', refresh_token)
    localStorage.removeItem('refresh_token')
  }
}

// Clear both localStorage and sessionStorage
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('refresh_token')
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('profile')
  sessionStorage.removeItem('refresh_token')
}

// Get from either localStorage or sessionStorage
export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || sessionStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token') || ''
}

export const getProfileFromLS = (): Profile | null => {
  const result = localStorage.getItem('profile') || sessionStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const getDarkModeFromLS = () => {
  const result = localStorage.getItem('darkmode')
  return result ? JSON.parse(result) : null
}

export const setProfileFromLS = (profile: Profile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const saveProfileToLS = (profile: Profile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const setDarkModeFromLS = (dark: boolean) => {
  localStorage.setItem('darkmode', JSON.stringify(dark))
}

// Remember Me preference
export const saveRememberMeToLS = (remember: boolean) => {
  localStorage.setItem('remember_me', JSON.stringify(remember))
}

export const getRememberMeFromLS = (): boolean => {
  const result = localStorage.getItem('remember_me')
  return result ? JSON.parse(result) : false
}
