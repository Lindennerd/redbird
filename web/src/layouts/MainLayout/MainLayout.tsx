import Navbar from "src/components/UI/Navbar"

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <main className="min-h-screen theme transition-colors">
    <Navbar />
    <div className="pt-16">
      {children}
    </div>
  </main>
}

export default MainLayout
