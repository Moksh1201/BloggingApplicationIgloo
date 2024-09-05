import { useEffect, useState } from "react";
import axios from "../../axiosInstance"; // Import your configured axios instance

const useSingleFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      console.log('Retrieved token:', token); // Debugging line
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}` // Include token in headers
            }
          });
          setData(response.data); // Set user profile data
        } catch (error) {
          setError(error.message); // Set error message
        } finally {
          setLoading(false);
        }
      } else {
        setError('No token found'); // Error if no token is found
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error
  };
};

export default useSingleFetch;
