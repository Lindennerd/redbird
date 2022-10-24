export function SidebarItem({children, onClick} : {children: React.ReactNode, onClick?: () => void }) {
  return <div>
    <button onClick={e => onClick()} className="flex items-center gap-6 px-4 py-2 rounded-full
     dark:hover:bg-gray-700 hover:bg-gray-300 ">
      {children}
    </button>
  </div>
}