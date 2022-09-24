import { FaRetweet } from "react-icons/fa";

const RetweetButton = () => {
  return (
    <button
      className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md"
    >
      <FaRetweet className="hover:text-primary" />
    </button>
  )
}

export default RetweetButton
