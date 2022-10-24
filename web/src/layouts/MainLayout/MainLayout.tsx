import Navbar from "src/components/UI/Navbar"
import { Sidebar } from "src/components/UI/Sidebar"

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <main className="min-h-screen theme transition-colors flex flex-row">
    <div className="border-r">
      <Sidebar />
    </div>
    <div className="w-full">

    <Navbar />
    <div>
      {children}
    </div>
    </div>
  </main>

}

export default MainLayout
