import Navbar from "src/components/UI/Navbar"

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <>
    <Navbar />
    <main className="mt-16 p-2">
      {children}
    </main>
  </>
}

export default MainLayout
