import { ChangeEvent } from "react";

export const TextEditor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div>
      <div className="w-full">
        <div className="flex items-center justify-between py-2">
          <div className="py-2 bg-white rounded-b-lg w-full">
            <label>Content : </label>
            <div className="pt-3">
              <textarea
                className="block w-full h-50 text-sm text-gray-800 bg-white border rounded-lg border-gray-900 px-1 py-1"
                placeholder="Write the blog... "
                required
                onChange={onChange} >
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
