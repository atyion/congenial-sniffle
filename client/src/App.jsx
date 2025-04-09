import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import TweetDetail from "./TweetDetail";
import TweetList from "./TweetList";
import UserTweets from "./UserTweets"; // Import the new component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tweet/:id" element={<TweetDetail />} />
        <Route path="/tweets" element={<TweetList />} />
        {/* New route for viewing a user's tweets */}
        <Route path="/user/:id/tweets" element={<UserTweets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
