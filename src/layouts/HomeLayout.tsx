import Footer from '~/components/layouts/Footer'
import Header from '~/components/layouts/Header'
import { LayoutPropsInterface } from '~/types/base.type'

const HomeLayout = ({ children, showHeader = true, showFooter = true }: LayoutPropsInterface) => {
  return (
    <div className='mx-auto min-h-screen max-w-screen-sm bg-[#1f1f1f] pb-20 text-white'>
      {showHeader && <Header />}
      <main className='px-2 pb-10'>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default HomeLayout
