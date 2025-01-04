import React from "react";
import { format } from "date-fns";

const Tweet = ({ tweet }) => {
  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full"
          src={tweet.author.avatar || "https://via.placeholder.com/40"}
          alt={tweet.author.name}
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{tweet.author.name}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(tweet.createdAt), "MMM d")}
            </p>
          </div>
          <p className="text-sm text-gray-800">{tweet.content}</p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <button className="flex items-center space-x-1">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>{tweet.comments}</span>
            </button>
            <button className="flex items-center space-x-1">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              <span>{tweet.retweets}</span>
            </button>
            <button className="flex items-center space-x-1">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>{tweet.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
