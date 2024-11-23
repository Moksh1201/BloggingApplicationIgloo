import { useEffect, useState } from "react";
import axios from "../../axiosInstance"; 

const useSingleFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); 
      console.log('Retrieved token:', token); 
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          });
          setData(response.data); 
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No token found'); 
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
