import { FaRegHeart } from "react-icons/fa";

const LikeButton = () => {
  return (
    <button
      className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md"
    >
      <FaRegHeart className="hover:text-primary" />
    </button>
  )
}

export default LikeButton
