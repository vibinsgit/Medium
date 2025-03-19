import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { SingleBlog } from "../components/SingleBlog";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <Spinner></Spinner>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SingleBlog blog={blog}></SingleBlog>
    </div>
  );
};
