import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/find/${id}`}>
      <div className="border-b border-slate-200 pt-6 max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-1 font-thin text-slate-500 flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="font-xl font-semibold text-lg pt-2">{title}</div>
        <div className="font-md font-thin pt-1">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-2">
          {`${Math.ceil(content.length / 100)} minute(s)`}
        </div>
      </div>
    </Link>
  );
};

//Components

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-gray-600 dark:text-gray-300 text-xs font-extralight">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

export function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-700"></div>;
}
