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
import { useState } from "react";


function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <div className="App left-0 dark">
      <Router>
        <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
        <div className="mt-14 px-10 py-10 dark:bg-gray-900  text-wheatt ">
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="login"
              element={<Login setLoginStatus={setLoginStatus} />}
            />
            <Route path="signup" element={<Signup />} />
            <Route path="verify" element={<Verify />} />
            <Route path="news">
              <Route index element={<News />} />
              <Route path=":id" element={<SingleNews />} />
            </Route>
            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path=":id">
                <Route index element={<SingleCategory />} />
                <Route path=":id" element={<VideoPlayer loginStatus={loginStatus} />} />
              </Route>
            </Route>
            <Route path="live" element={<Live loginStatus={loginStatus} />} />
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
        <div className="p-4 bg-white  w-full h-auto shadow md:px-6 md:py-8 dark:bg-gray-900">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
