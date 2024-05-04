import React from "react";
import { Link } from "react-router-dom";

const RepoCard = ({ ownerName, repoName, avatarImgUrl, description }) => {
  return (
    <div className="flex rounded-lg shadow-md bg-white">
      <div className="flex justify-center items-center w-[50%]">
        <img
          className="w-28 h-28 object-cover rounded-full"
          src={avatarImgUrl}
          alt="Repository screenshot"
        />
      </div>
      <div className="flex flex-col justify-between p-4 w-full">
        <div>
          <h3 className="text-base font-medium text-gray-700 truncate">
            {repoName}
          </h3>
          <span className="text-sm text-gray-500">{ownerName}</span>
        </div>
        <span className="line-clamp-2">{description}</span>

        <Link
          className="flex justify-between items-center"
          to={`/repositories/${ownerName}`}
        >
          <span className="group relative inline-block cursor-pointer text-blue-700">
            View Repo
            <span className="absolute left-0 bottom-0 h-0.5 bg-blue-500 group-hover:w-full transition-width"></span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="blue"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RepoCard;
