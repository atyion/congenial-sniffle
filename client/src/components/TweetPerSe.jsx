import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";

const Tweet = ({
  user,
  content,
  timestamp,
  initialLikes,
  initialRetweets,
  initialReplies,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [retweets, setRetweets] = useState(initialRetweets);
  const [replies, setReplies] = useState(initialReplies);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRetweet = () => {
    if (isRetweeted) {
      setRetweets(retweets - 1);
    } else {
      setRetweets(retweets + 1);
    }
    setIsRetweeted(!isRetweeted);
  };

  const handleReply = () => {
    setReplies(replies + 1);
    // In a real app, this would open a reply input field
    alert("Reply functionality would be implemented here");
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 rounded-full">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username}
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{content}</p>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {timestamp}
        </div>
        <div className="mt-4 flex justify-between">
          <Button variant="ghost" size="sm" onClick={handleReply}>
            <MessageCircle className="mr-2 h-4 w-4" />
            {replies}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRetweet}
            className={isRetweeted ? "text-green-500" : ""}
          >
            <Repeat2 className="mr-2 h-4 w-4" />
            {retweets}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className="mr-2 h-4 w-4" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
