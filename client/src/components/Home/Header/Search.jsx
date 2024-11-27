
// import React, { useState, useEffect } from "react";
// import { CiSearch } from "react-icons/ci";
// import Modal from "../../../utils/Modal";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../../axiosInstance"; 

// const Search = ({ modal, setModal, onPostClick }) => {
//   const [search, setSearch] = useState("");
//   const [postData, setPostData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (search.trim() === "") {
//         setPostData([]); // Clear data when search is empty
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await axiosInstance.get(`/posts/search/title/${search}`);
//         setPostData(response.data); 
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [search]);

//   const handlePostClick = (post) => {
//     onPostClick(post); // Trigger callback to filter out the topic card
//     navigate(`/post/${post._id}`);
//     setSearch(""); // Clear the search input
//   };

//   return (
//     <>
//       <Modal modal={modal} setModal={setModal}>
//         <div
//           className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0
//           ${modal ? "visible opacity-100" : "invisible sm:visible sm:opacity-100 opacity-0"}
//           transition-all duration-100`}
//         >
//           <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10">
//             <span className="text-2xl text-gray-400">
//               <CiSearch />
//             </span>
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
//               type="text"
//               placeholder="Search"
//             />
//             {search !== "" && (
//               <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
//                 {loading ? (
//                   <p className="text-sm text-gray-500 p-3">Loading...</p>
//                 ) : postData.length > 0 ? (
//                   postData.map((post, i) => (
//                     <div
//                       key={i}
//                       onClick={() => handlePostClick(post)} 
//                       className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
//                     >
//                       <h2 className="line-clamp-1 capitalize text-sm font-bold">
//                         {post.title}
//                       </h2>
//                       <div
//                         className="text-xs text-gray-500 line-clamp-2"
//                         dangerouslySetInnerHTML={{ __html: post.desc }}
//                       />
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500 p-3">No Post Found</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default Search;
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Modal from "../../../utils/Modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance"; 

const Search = ({ modal, setModal, onPostClick }) => {
  const [search, setSearch] = useState("");
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (search.trim() === "") {
        setPostData([]); // Clear data when search is empty
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get(`/posts/search/title/${search}`);
        let posts = response.data;

        // Sorting logic: place posts with matching title at the top
        posts = posts.sort((a, b) => {
          const aTitleContainsSearch = a.title.toLowerCase().includes(search.toLowerCase());
          const bTitleContainsSearch = b.title.toLowerCase().includes(search.toLowerCase());
          
          if (aTitleContainsSearch && !bTitleContainsSearch) {
            return -1; // `a` comes first
          } else if (!aTitleContainsSearch && bTitleContainsSearch) {
            return 1; // `b` comes first
          }
          return 0; // Titles are equal, maintain current order
        });

        setPostData(posts); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  const handlePostClick = (post) => {
    onPostClick(post); // Trigger callback to filter out the topic card
    navigate(`/post/${post._id}`); // Navigate to the post details page
    setSearch(""); // Clear the search input
  };

  return (
    <>
      <Modal modal={modal} setModal={setModal}>
        <div
          className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0
          ${modal ? "visible opacity-100" : "invisible sm:visible sm:opacity-100 opacity-0"}
          transition-all duration-100`}
        >
          <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10">
            <span className="text-2xl text-gray-400">
              <CiSearch />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
              type="text"
              placeholder="Search"
            />
            {search !== "" && (
              <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
                {loading ? (
                  <p className="text-sm text-gray-500 p-3">Loading...</p>
                ) : postData.length > 0 ? (
                  postData.map((post, i) => (
                    <div
                      key={i}
                      onClick={() => handlePostClick(post)} // Trigger post click and pass post data
                      className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                    >
                      <h2 className="line-clamp-1 capitalize text-sm font-bold">
                        {post.title}
                      </h2>
                      <div
                        className="text-xs text-gray-500 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.desc }}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 p-3">No Post Found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Search;
