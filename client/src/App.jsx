import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import TweetDetail from "./TweetDetail";
import TweetList from "./TweetList";
import UserTweets from "./UserTweets"; // Import the new component
import Navbar from "./NavBar"; // Import the Navbar component
import HomePage from "./HomePage"; // Import the HomePage component
import PostTweet from "./PostTweet"; // Import the PostTweet component
import Profile from "./ProfileHeader"; // Import the Profile component
import ProfilePage from "./ProfilePage"; // Import the ProfilePage component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tweet/:id" element={<TweetDetail />} />
        <Route path="/tweets" element={<TweetList />} />
        {/* New route for viewing a user's tweets */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostTweet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
