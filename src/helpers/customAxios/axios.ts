import axios from "axios";

// const { REACT_APP_API_BACK } = process.env;

const customAxios = axios.create({
  baseURL: "http://localhost:3001/api/",
});

customAxios.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(sessionStorage.getItem("authUser") || "{}");
    
    console.log(user);
    
    if(user){
      const token = user.token
      if (token) {
        config.headers.authorization = `bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

customAxios.interceptors.response.use(
  async (response) => {
    try {
        console.log(response);
      return response
      
    } catch (error) {
      console.error("Error posting success data:", error);
    }
    return response;
  },
  async (error) => {
    try {
        console.log(error);

      await axios.post("http://localhost:3000/api/v0/hook/create", {
        error: error.response ? error.response.data : error.message,
      });
    } catch (error) {
      console.error("Error posting error data:", error);
    }
    return Promise.reject(error);
  }
);

export default customAxios;
