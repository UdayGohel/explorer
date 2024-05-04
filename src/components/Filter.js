import { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [sortBy, setSortBy] = useState("stars");

  const handleSortByChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterChange(value);
  };

  return (
    <div className="relative">
      <select
        className="block appearance-none w-full bg-slate-900 border border-gray-300 text-blue-900 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-700"
        value={sortBy}
        onChange={handleSortByChange}
      >
        <option value="stars">Sort by Stars</option>
        <option value="updated">Sort by Updated</option>
        <option value="forks">Sort by Forked and Updated</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414zM6 12a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2H6z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Filter;
