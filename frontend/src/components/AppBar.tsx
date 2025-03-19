import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUser } from "../hooks";

export const Appbar = () => {

  const { loading, user } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-b flex justify-between px-10 py-5">
      <Link to={"/"}>
        <div className="flex flex-col justify-center cursor-pointer text-xl font-bold pt-2">
          Medium
        </div>
      </Link>
      <div className="justify-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white mr-4 bg-black focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">
            Add Blog
          </button>
        </Link>
        <Avatar  name={user?.name[0].toLocaleUpperCase()} />
      </div>
    </div>
  );
};
