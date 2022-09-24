import { GoReply } from "react-icons/go";

const ReplyButton = ({onClick}: {onClick: () => void}) => {
  return (
    <button
      onClick={e => onClick()}
      className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md">
      <GoReply className="hover:text-primary"/>
    </button>
  )
}

export default ReplyButton
