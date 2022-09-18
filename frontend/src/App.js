import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import News from "./views/News";
import Categories from "./views/Categories";
import Live from "./views/Live";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Footer from "./Components/Footer";
import PageNotFound from "./views/PageNotFound";
import SingleNews from "./views/single-pages/SingleNews";
import SingleCategory from "./views/single-pages/SingleCategory";
import VideoPlayer from "./views/single-pages/VideoPlayer";
import Dashboard from "./views/panel/Dashboard";
import AdminCategories from "./views/panel/Pages/Categories";
import AdminVideos from "./views/panel/Pages/Videos";
import AdminHighlights from "./views/panel/Pages/Highlights";
import AdminNews from "./views/panel/Pages/News";
import Analytics from "./views/panel/Pages/Analytics";
import Users from "./views/panel/Pages/Users";
import Verify from "./views/Verify";
import { useEffect, useState } from "react";
import Search from "./views/single-pages/Search";
import Profile from "./views/single-pages/Profile";
import { setToken } from "./services/news";
import Notification from "./Components/Notification";

function App() {
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState({ query: "" });
  const [message,setMessage] = useState(null)

  if(message !== null){
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  } 

  const handleSearchKey = (event) => {
    event.preventDefault();
    setSearchText({ query: `${event.target.value}` });
    console.log(event.target.value);
  };

  useEffect(() => {
    let loggedUser = window.localStorage.getItem("loggedInOlympicsUser");
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      setUser(parsedUser);
      setToken(parsedUser.token);
    }
  },[]);


  return (
    <div className="App left-0 dark">
      <Router>
        <Navbar
          user={user}
          setUser={setUser}
          setMessage={setMessage}
          handleSearchKey={handleSearchKey}
        />


        <div className="mt-14 px-10 py-10 dark:bg-gray-900 min-h-screen text-wheatt ">
        {message && <Notification notify={message} />  }
          <Routes>
            <Route index element={<Home setMessage={setMessage}/>} />
            <Route
              path="login"
              element={<Login setUser={setUser} setMessage={setMessage} />}
            />
            <Route path="signup" element={<Signup setMessage={setMessage} />} />
            <Route path="verify" element={<Verify />} />
            <Route path="search" element={<Search searchText={searchText} setMessage={setMessage} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="news">
              <Route index element={<News setMessage={setMessage} />} />
              <Route path=":id" element={<SingleNews />} />
            </Route>
            <Route path="categories">
              <Route index element={<Categories setMessage={setMessage} />} />
              <Route path=":id">
                <Route index element={<SingleCategory />} />
                <Route
                  path=":id"
                  element={<VideoPlayer user={user} setMessage={setMessage} />}
                />
              </Route>
            </Route>
            <Route path="live" element={<Live user={user} setMessage={setMessage} />} />
            <Route path="panel">
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="videos" element={<AdminVideos />} />
              <Route path="highlights" element={<AdminHighlights />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <div className="p-4 bg-white bottom-0 w-full shadow md:px-6 md:py-8 dark:bg-gray-900">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
