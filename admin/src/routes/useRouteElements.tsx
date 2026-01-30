import { Navigate, useRoutes } from 'react-router-dom'
import HomeLayout from '~/layouts/HomeLayout'
import Users from '~/pages/Users'
import Orders from '~/pages/Orders'
import Transactions from '~/pages/Transactions'
import Support from '~/pages/Support'
import Profile from '~/pages/Profile'
import LoginRoute from '~/components/LoginRoute'
import ProtectedRoute from '~/components/ProtectedRoute'
import NotFound from '~/pages/NotFound'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/login',
      element: <LoginRoute />
    },
    {
      path: '/',
      index: true,
      element: (
        <ProtectedRoute>
          <HomeLayout>
            <Navigate to='/users' replace />
          </HomeLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/users',
      element: (
        <ProtectedRoute>
          <HomeLayout>
            <Users />
          </HomeLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/orders',
      element: (
        <ProtectedRoute>
          <HomeLayout>
            <Orders />
          </HomeLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/transactions',
      element: (
        <ProtectedRoute>
          <HomeLayout>
            <Transactions />
          </HomeLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/support',
      element: (
        <ProtectedRoute>
          <HomeLayout>
            <Support />
          </HomeLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <HomeLayout>
            <Profile />
          </HomeLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}
export default useRouteElements
