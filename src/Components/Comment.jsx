import React from 'react';

const Comment = ({ title, comment, created_at, upvotes }) => {
  const formatCreatedAt = (timestamp) => {
    const createdAt = new Date(timestamp);
    const now = new Date();
    const timeDiff = now.getTime() - createdAt.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-sm text-gray-400">{formatCreatedAt(created_at)}</span>
      </div>
      <p className="text-gray-300 mb-4">{comment}</p>
      <div className="flex items-center">
        <svg className="w-5 h-5 fill-current text-green-500 mr-2" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-semibold text-green-500">{upvotes} upvotes</span>
      </div>
    </div>
  );
};

export default Comment;