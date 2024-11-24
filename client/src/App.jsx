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

//   useEffect(() => {
//     console.log("Current User:", currentUser);
//     console.log("Loading State:", loading);
//   }, [currentUser, loading]);

//   if (loading) {
//     return <div>Loading...</div>; // Placeholder for loading screen
//   }

//   return (
//     <>
//       {currentUser ? <HomeHeader /> : <DemoHeader />}
//       <Routes>
//         {/* Redirect based on user authentication */}
//         <Route
//           path="/"
//           element={currentUser ? <Home /> : <Navigate to="/login" />}
//         />
//         <Route path="/demo" element={<Demo />} />
//         <Route path="/profile/:userId" element={<Profile />} />
//         <Route path="/write" element={currentUser ? <Write /> : <Navigate to="/demo" />} />
//         <Route path="/posts/:postId" element={<SinglePost />} />
//         <Route path="/editPost/:postId" element={currentUser ? <EditPost /> : <Navigate to="/demo" />} />
//         <Route path="/filter/:tag" element={<FilterPost />} />
//         {/* Fallback for unknown routes */}
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
    console.log("Current User:", currentUser );
    console.log("Loading State:", loading);
  
    if (!document.getElementById("bp-webchat-script")) {
      const botpressScript = document.createElement("script");
      botpressScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      botpressScript.async = true;
      botpressScript.id = "bp-webchat-script";
      botpressScript.onload = () => {
        setTimeout(() => {
          if (window.botpressWebChat) {
            window.botpressWebChat.init({
              botId: "f27f6a5c-1964-4fe1-8241-13c85a190fe8",
              hostUrl: "https://cdn.botpress.cloud",
              enableReset: true,
              enableTranscriptDownload: true,
            });
          } else {
            console.error("Botpress WebChat not loaded correctly");
          }
        }, 500); // Adjust the delay as necessary
      };
      // document.body.appendChild(botpressScript);
    }
  
    const customScript = document.createElement("script");
    customScript.src = "https://files.bpcontent.cloud/2024/11/22/05/20241122055641-WDW5AQOT.js";
    customScript.async = true;
    document.body.appendChild(customScript);
  
    return () => {
      const botScript = document.getElementById("bp-webchat-script");
      if (botScript) {
        botScript.remove();
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      {/* Persistent Chatbot Widget */}
      <div
        id="bp-web-widget"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "1000",
        }}
      />
      <Routes>
        {/* Routes */}
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
        <Route path="*" element={<Navigate to={currentUser ? "/" : "/demo"} />} />
      </Routes>
    </>
  );
}

export default App;
