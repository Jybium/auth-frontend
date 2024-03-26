import api from "../api";

const useRefreshToken = () => {
  const refresh = async () => {
     const token = localStorage.getItem("refreshToken")
    const response = await api.post("/refresh-token", {
      withCredentials: true,
    },{
      headers: {
        Authorization : `Bearer ${token}`
      }
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
