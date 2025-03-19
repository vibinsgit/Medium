export const TitleBox = () => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Title :{" "}
      </label>
      <input
        className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-900"
        placeholder="Type your title..."
      ></input>
    </div>
  );
};
