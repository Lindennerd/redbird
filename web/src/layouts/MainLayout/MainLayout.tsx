import Navbar from "src/components/UI/Navbar"

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <main className="min-h-screen theme transition-colors">
    <Navbar />
    <main className="pt-16">
      {children}
    </main>
  </main>
}

export default MainLayout
