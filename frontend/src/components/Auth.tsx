import { SignupInput } from "@vibins/common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postinputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postinputs
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
      setError("");
    } catch (e) {
      //alert the user the request has failed
      setError(
        type === "signup"
          ? "Signup failed. Please try again!"
          : "Signin failed. Please try again!"
      );
    }
  }

  return (
    <div className="bg-slate-50 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10 py-2">
            <div className="font-bold text-3xl">Create an account</div>
            <div className="text-slate-800">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="pl-2 underline underline-offset-2">
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div>
            {type === "signup" ? (
              <LabelledInput
                label={"Name"}
                placeholder="Enter your Name..."
                onChange={(e) => {
                  setPostInputs({
                    ...postinputs,
                    name: e.target.value,
                  });
                }}
              ></LabelledInput>
            ) : null}
            <LabelledInput
              label={"Username"}
              placeholder="example@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postinputs,
                  username: e.target.value,
                });
              }}
            ></LabelledInput>
            <LabelledInput
              label={"Password"}
              type={"password"}
              placeholder="Enter your password..."
              onChange={(e) => {
                setPostInputs({
                  ...postinputs,
                  password: e.target.value,
                });
              }}
            ></LabelledInput>
            <div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <button
                type="button"
                onClick={sendRequest}
                className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-5">
                {type === "signup" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black p-1 text-bold font-semibold">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required />
    </div>
  );
}
