import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeliton } from "../components/BlogSkeilton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();


  if (loading) {
    return (
      <div>
        <div>
          <Appbar />
        </div>
        <div className="flex justify-center">
          <div>
            <BlogSkeliton></BlogSkeliton>
            <BlogSkeliton></BlogSkeliton>
            <BlogSkeliton></BlogSkeliton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center p-4">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={new Date().toLocaleDateString("en-GB").replace(/\//g, "-")} >
            </BlogCard>
          ))}
        </div>
      </div>
    </div>
  );
};
