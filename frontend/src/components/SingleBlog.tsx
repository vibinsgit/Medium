import { useEffect, useState } from "react";
import { Blog } from "../hooks";
import { Appbar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const SingleBlog = ({ blog }: { blog: Blog | null }) => {
  const [phrase, setPhrase] = useState("Loading...");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => setPhrase(data.content))
      .catch((error) => {
        console.error("Error fetching phrase:", error);
        setPhrase("Stay inspired and keep learning!");
      });
  }, []);


  if (!blog) {
    return (
      <div className="text-center text-red-500 font-bold text-lg">
        No blog data available.
      </div>
    );
  }
  return (
    <div>
      <Appbar ></Appbar>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-4xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              `Posted on ${new Date().toLocaleDateString("en-GB").replace(/\//g, "-")}`
            </div>
            <div className="pt-4 text-justify">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full pt-2">
              <div className="pr-2 flex flex-col justify-center">
                <Avatar name={blog.author.name[0]}></Avatar>
              </div>
              <div>
                <div>
                  <div className="text-xl font-bold">{blog.author.name}</div>
                  <div className="text-slate-500 pt-2">
                    {phrase}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
