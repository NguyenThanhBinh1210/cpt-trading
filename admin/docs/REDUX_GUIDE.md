# Redux Toolkit Migration Guide

## 📦 Setup Completed

The project has been migrated from Context API to Redux Toolkit.

### Installed Packages
- `@reduxjs/toolkit` - Redux Toolkit for state management
- `react-redux` - React bindings for Redux

## 🏗️ Project Structure

```
src/
├── store/
│   ├── index.ts              # Redux store configuration
│   ├── hooks.ts              # Custom typed hooks (useAppDispatch, useAppSelector)
│   └── slices/
│       └── authSlice.ts      # Authentication slice
```

## 🔧 Store Configuration

### Redux Store (`src/store/index.ts`)
```typescript
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### Custom Hooks (`src/store/hooks.ts`)
```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

## 📝 Auth Slice (`src/store/slices/authSlice.ts`)

### State Structure
```typescript
interface AuthState {
  isAuthenticated: boolean
  profile: Profile | null
}
```

### Available Actions
- `setAuth({ isAuthenticated, profile })` - Set both auth state and profile
- `setIsAuthenticated(boolean)` - Set authentication status
- `setProfile(Profile | null)` - Set user profile
- `reset()` - Clear auth state and local storage

## 🚀 Usage Examples

### 1. Provider Setup (main.tsx)
```typescript
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

### 2. Reading State in Components
```typescript
import { useAppSelector } from '~/store/hooks'

function MyComponent() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const profile = useAppSelector((state) => state.auth.profile)
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {profile?.name}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  )
}
```

### 3. Dispatching Actions
```typescript
import { useAppDispatch } from '~/store/hooks'
import { setAuth, reset } from '~/store/slices/authSlice'

function LoginComponent() {
  const dispatch = useAppDispatch()
  
  const handleLogin = async () => {
    const response = await loginAPI(credentials)
    dispatch(setAuth({
      isAuthenticated: true,
      profile: response.data
    }))
  }
  
  const handleLogout = () => {
    dispatch(reset())
  }
  
  return (
    <>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
```

### 4. Using with React Query
```typescript
import { useMutation } from 'react-query'
import { useAppDispatch } from '~/store/hooks'
import { setAuth } from '~/store/slices/authSlice'

function LoginForm() {
  const dispatch = useAppDispatch()
  
  const loginMutation = useMutation(loginAPI, {
    onSuccess: (data) => {
      dispatch(setAuth({
        isAuthenticated: true,
        profile: data.profile
      }))
    }
  })
  
  return <form onSubmit={loginMutation.mutate}>...</form>
}
```

## 🎯 Migration from Context API

### Before (Context API)
```typescript
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'

function Component() {
  const { isAuthenticated, profile, setIsAuthenticated, reset } = useContext(AppContext)
  
  const handleLogout = () => {
    reset()
  }
}
```

### After (Redux Toolkit)
```typescript
import { useAppSelector, useAppDispatch } from '~/store/hooks'
import { reset } from '~/store/slices/authSlice'

function Component() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const profile = useAppSelector((state) => state.auth.profile)
  const dispatch = useAppDispatch()
  
  const handleLogout = () => {
    dispatch(reset())
  }
}
```

## 📚 Adding New Slices

### Example: UI Slice
```typescript
// src/store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  sidebarCollapsed: boolean
  theme: 'light' | 'dark'
}

const initialState: UIState = {
  sidebarCollapsed: false,
  theme: 'light'
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    }
  }
})

export const { toggleSidebar, setTheme } = uiSlice.actions
export default uiSlice.reducer
```

### Register in Store
```typescript
// src/store/index.ts
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer  // Add new slice
  }
})
```

## 🔍 DevTools

Redux DevTools Extension is automatically enabled in development mode. Install the browser extension:
- [Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

## 🧪 Testing with Redux

```typescript
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '~/store/slices/authSlice'

function renderWithRedux(component: React.ReactElement) {
  const store = configureStore({
    reducer: { auth: authReducer }
  })
  
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}
```

## ⚡ Performance Tips

1. **Use Selectors**: Create reusable selectors for complex state
```typescript
// src/store/selectors/authSelectors.ts
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUserName = (state: RootState) => state.auth.profile?.name
```

2. **Memoization**: Use `createSelector` from Redux Toolkit for expensive computations
```typescript
import { createSelector } from '@reduxjs/toolkit'

export const selectUserPermissions = createSelector(
  [(state: RootState) => state.auth.profile],
  (profile) => profile?.permissions || []
)
```

3. **Split State**: Don't select entire objects if you only need specific fields
```typescript
// ❌ Bad - causes re-render when any auth state changes
const auth = useAppSelector((state) => state.auth)

// ✅ Good - only re-renders when profile changes
const profile = useAppSelector((state) => state.auth.profile)
```

## 🎨 Best Practices

1. **Always use typed hooks** (`useAppDispatch`, `useAppSelector`)
2. **Keep slices focused** - One slice per domain
3. **Use action creators** - Don't create action objects manually
4. **Normalize state** - Avoid nested data structures
5. **Handle async with createAsyncThunk** - For API calls

## 📦 Next Steps

To add more features:
1. Create new slices in `src/store/slices/`
2. Add reducer to store in `src/store/index.ts`
3. Export actions and use in components
4. Use DevTools to debug state changes

## 🔗 Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Redux Docs](https://react-redux.js.org/)
- [Redux Best Practices](https://redux.js.org/style-guide/)

