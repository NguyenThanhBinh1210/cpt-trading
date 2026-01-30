import { useRoutes } from 'react-router-dom'
import NotFound from '~/pages/NotFound'
import HomeLayout from '~/layouts/HomeLayout'
import Home from '~/pages/Home'
import Coins from '~/pages/Coins'
import Contract from '~/pages/Contract'
import Finance from '~/pages/Finance'
import Mine from '~/pages/Mine'
import SecurityCenter from '~/pages/SecurityCenter'
import ResetPassword from '~/pages/ResetPassword'
import BindWithdrawalAddress from '~/pages/BindWithdrawalAddress'
import WorkOrder from '~/pages/WorkOrder'
import WorkOrderRecord from '~/pages/WorkOrderRecord'
import Other from '~/pages/Other'
import Login from '~/pages/Login'
import LoginLayout from '~/layouts/LoginLayout'
import ForgotPassword from '~/pages/ForgotPassword'
import Register from '~/pages/Register'
import WalletLogin from '~/pages/WalletLogin'
import Language from '~/pages/Language'
import EarningsDetails from '~/pages/EarningsDetails'
import Purchase from '~/pages/Purchase'
import IeoPurchase from '~/pages/IeoPurchase'
import Recharge from '~/pages/Recharge'
import DepositCoins from '~/pages/DepositCoins'
import Exchange from '~/pages/Exchange'
import Transfer from '~/pages/Transfer'
import Withdraw from '~/pages/Withdraw'
import WithdrawList from '~/pages/WithdrawList'
import InviteFriends from '~/pages/InviteFriends'
import OrderRecord from '~/pages/OrderRecord'
import CoinCommission from '~/pages/CoinCommission'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <HomeLayout>
          <Home />
        </HomeLayout>
      )
    },
    {
      path: '/coins',
      element: (
        <HomeLayout showHeader={false}>
          <Coins />
        </HomeLayout>
      )
    },
    {
      path: '/coin-commission',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <CoinCommission />
        </HomeLayout>
      )
    },
    {
      path: '/contract',
      element: (
        <HomeLayout showHeader={false}>
          <Contract />
        </HomeLayout>
      )
    },
    {
      path: '/finance',
      element: (
        <HomeLayout showHeader={false}>
          <Finance />
        </HomeLayout>
      )
    },
    {
      path: '/mine',
      element: (
        <HomeLayout showHeader={false}>
          <Mine />
        </HomeLayout>
      )
    },
    {
      path: '/security-center',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <SecurityCenter />
        </HomeLayout>
      )
    },
    {
      path: '/reset-password',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <ResetPassword />
        </HomeLayout>
      )
    },
    {
      path: '/bind-withdrawal-address',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <BindWithdrawalAddress />
        </HomeLayout>
      )
    },
    {
      path: '/work-order',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <WorkOrder />
        </HomeLayout>
      )
    },
    {
      path: '/work-order-record',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <WorkOrderRecord />
        </HomeLayout>
      )
    },
    {
      path: '/other',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <Other />
        </HomeLayout>
      )
    },
    {
      path: '/login',
      element: (
        <LoginLayout>
          <Login />
        </LoginLayout>
      )
    },
    {
      path: '/forgot-password',
      element: (
        <LoginLayout>
          <ForgotPassword />
        </LoginLayout>
      )
    },
    {
      path: '/register',
      element: (
        <LoginLayout>
          <Register />
        </LoginLayout>
      )
    },
    {
      path: '/wallet-login',
      element: (
        <LoginLayout>
          <WalletLogin />
        </LoginLayout>
      )
    },
    {
      path: '/language',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <Language />
        </HomeLayout>
      )
    },
    {
      path: '/earnings-details',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <EarningsDetails />
        </HomeLayout>
      )
    },
    {
      path: '/purchase',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <Purchase />
        </HomeLayout>
      )
    },
    {
      path: '/ieo-purchase',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <IeoPurchase />
        </HomeLayout>
      )
    },
    {
      path: '/recharge',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <Recharge />
        </HomeLayout>
      )
    },
    {
      path: '/deposit-coins',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <DepositCoins />
        </HomeLayout>
      )
    },
    {
      path: '/exchange',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <Exchange />
        </HomeLayout>
      )
    },
    {
      path: '/transfer',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <Transfer />
        </HomeLayout>
      )
    },
    {
      path: '/withdraw',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <WithdrawList />
        </HomeLayout>
      )
    },
    {
      path: '/withdraw/:currency',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <Withdraw />
        </HomeLayout>
      )
    },
    {
      path: '/referral-link',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <InviteFriends />
        </HomeLayout>
      )
    },
    {
      path: '/order-record',
      element: (
        <HomeLayout showHeader={false} showFooter={false}>
          <OrderRecord />
        </HomeLayout>
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
