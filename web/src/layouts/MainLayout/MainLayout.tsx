import Navbar from 'src/components/UI/Navbar'
import { Sidebar } from 'src/components/UI/Sidebar'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="theme flex min-h-screen flex-row transition-colors">
      <div className="border-r">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        <div className="flex justify-center ">
          <div className='w-full max-w-4xl'>
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainLayout
