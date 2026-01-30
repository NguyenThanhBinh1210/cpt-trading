import { useState } from 'react'
import AdminSidebar from '~/components/layouts/AdminSidebar'
import AdminHeader from '~/components/layouts/AdminHeader'
import { LayoutPropsInterface } from '~/types/base.type'
import { Sheet, SheetContent } from '@/components/ui/sheet'

const HomeLayout = ({ children }: LayoutPropsInterface) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Desktop Sidebar */}
      <aside className='hidden md:block'>
        <AdminSidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side='left' className='w-64 p-0'>
          <AdminSidebar collapsed={false} onToggleCollapse={toggleMobileMenu} />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Header */}
        <AdminHeader onMenuClick={toggleMobileMenu} />

        {/* Main Content */}
        <main className='flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6 lg:p-8'>{children}</main>
      </div>
    </div>
  )
}

export default HomeLayout
