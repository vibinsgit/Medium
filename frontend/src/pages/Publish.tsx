import axios from "axios";
import { Appbar } from "../components/AppBar";
import { TextEditor } from "../components/ContentBox";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-screen-md bg-white p-4 rounded-lg shadow-lg">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title :{" "}
          </label>
          <input
            className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-900"
            placeholder="Type your title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></TextEditor>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");

                if (!token) {
                  alert("You are not authenticated. Please log in.");
                  return;
                }

                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog/post-blog`,
                  { title, content },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                navigate(`/find/${response.data.id}`);
              } catch (error) {
                console.error("Error publishing post:", error);
                alert("Failed to publish post. Please try again.");
              }
            }}
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};
