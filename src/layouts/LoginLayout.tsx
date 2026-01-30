import { LayoutPropsInterface } from '~/types/base.type'

const LoginLayout = ({ children }: LayoutPropsInterface) => {
  return (
    <div className='mx-auto min-h-screen max-w-screen-sm bg-[#1f1f1f] text-white'>
      {children}
    </div>
  )
}

export default LoginLayout
