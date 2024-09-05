import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Demo from "./components/Demo/Demo";
import HomeHeader from "./components/Home/Header/HomeHeader";
import DemoHeader from "./components/Demo/DemoHeader";
import { Blog } from "./Context/Context";
import Profile from "./components/Home/Profile/Profile";
import Write from "./components/Home/Write/Write";
import SinglePost from "./components/Common/Posts/SinglePost";
import EditPost from "./components/Common/Posts/EditPost";
import FilterPost from "./components/Demo/FilterPost";

function App() {
  const { currentUser } = Blog();

  console.log("Current User:", currentUser);

  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <Routes>
        {currentUser ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/demo" element={<Demo />} />
        )}
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/write" element={<Write />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route path="/filter/:tag" element={<FilterPost />} />
        <Route
          path="*"
          element={<Navigate to={currentUser ? "/" : "/demo"} />}
        />
      </Routes>
    </>
  );
}

export default App;
