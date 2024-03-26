

import { createContext, useEffect, useState } from "react";
import useApiPrivate from "../Hooks/useApiPrivate";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const apiPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [order, setorder] = useState();
  const [auth, setAuth] = useState({});
  const [isAuth, setIsAuth] = useState(false);


  

  useEffect(() => {
    let isMounted = true;

    const getUser = async () => {
      try {
        const response = await apiPrivate.get("/me");
        const data = response.data.data
      
        if (isMounted) {
          setAuth({ ...data });
          setIsAuth(true);
        }
      } catch (error) {
        if (error.status === 401) localStorage.removeItem("token");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    localStorage.getItem("token") ? getUser() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Save auth details to local storage on login
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    
    }
  }, [auth]);



  const logout = () => {
    setAuth({});
    setIsAuth(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isAuth, loading, logout, order, setorder }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

