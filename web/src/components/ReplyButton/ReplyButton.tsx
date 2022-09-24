import { GoReply } from "react-icons/go";

const ReplyButton = () => {
  return (
    <button className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md">
      <GoReply className="hover:text-primary"/>
    </button>
  )
}

export default ReplyButton
