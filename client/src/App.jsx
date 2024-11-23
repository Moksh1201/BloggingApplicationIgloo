// import { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./components/Home/Home";
// import Demo from "./components/Demo/Demo";
// import HomeHeader from "./components/Home/Header/HomeHeader";
// import DemoHeader from "./components/Demo/DemoHeader";
// import { Blog } from "./Context/Context";
// import Profile from "./components/Home/Profile/Profile";
// import Write from "./components/Home/Write/Write";
// import SinglePost from "./components/Common/Posts/SinglePost";
// import EditPost from "./components/Common/Posts/EditPost";
// import FilterPost from "./components/Demo/FilterPost";

// function App() {
//   const { currentUser, loading } = Blog();

//   if (loading) {
//     return <div>Loading...</div>; // Optional: Add a more styled loading indicator
//   }

//   return (
//     <>
//       {currentUser ? <HomeHeader /> : <DemoHeader />}
//       <Routes>
//         {currentUser ? (
//           <Route path="/" element={<Home />} />
//         ) : (
//           <Route path="/demo" element={<Demo />} />
//         )}
//         <Route path="/profile/:userId" element={<Profile />} />
//         <Route path="/write" element={<Write />} />
//         <Route path="/posts/:postId" element={<SinglePost />} />
//         <Route path="/editPost/:postId" element={<EditPost />} />
//         <Route path="/filter/:tag" element={<FilterPost />} />
//         <Route path="*" element={<Navigate to={currentUser ? "/" : "/demo"} />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
import { useEffect } from "react";
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
  const { currentUser, loading } = Blog();

  useEffect(() => {
    console.log("Current User:", currentUser);
    console.log("Loading State:", loading);
  }, [currentUser, loading]);

  if (loading) {
    return <div>Loading...</div>; // Placeholder for loading screen
  }

  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <Routes>
        {/* Redirect based on user authentication */}
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/demo" element={<Demo />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/write" element={currentUser ? <Write /> : <Navigate to="/demo" />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/editPost/:postId" element={currentUser ? <EditPost /> : <Navigate to="/demo" />} />
        <Route path="/filter/:tag" element={<FilterPost />} />
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to={currentUser ? "/" : "/demo"} />} />
      </Routes>
    </>
  );
}

export default App;