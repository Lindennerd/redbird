import { useAuth } from '@redwoodjs/auth'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { GoReply } from 'react-icons/go'

const ReplyButton = ({ onClick }: { onClick: () => void }) => {
  const { isAuthenticated } = useAuth()

  function reply() {
    if (!isAuthenticated) {
      toast.error('You must be logged in to do this')
    } else {
      onClick()
    }
  }

  return (
    <>
      <Toaster />
      <button
        onClick={(e) => reply()}
        className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md"
      >
        <GoReply className="hover:text-primary" />
      </button>
    </>
  )
}

export default ReplyButton
