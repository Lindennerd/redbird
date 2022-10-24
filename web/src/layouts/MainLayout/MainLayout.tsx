import Navbar from "src/components/UI/Navbar"
import { Sidebar } from "src/components/UI/Sidebar"

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <main className="min-h-screen theme transition-colors">
    <Navbar />
    <Sidebar />
    <div className="ml-10 sm:ml-32 pt-12">
      {children}
    </div>
  </main>
}

export default MainLayout
