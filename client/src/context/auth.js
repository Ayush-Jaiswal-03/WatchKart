import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios-------iski jagah 
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");//yaha get kar rahe mtlb kahin par set kiya hoga 
    //login page ke handle submit mei set kiya tha 
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  //initially yahan par dependency array mei auth tha, jisse refresh karte samay data jaa nahi raha tha (vid-12)
  return (// ab auth, setAuth ko kahin bhi use kar sakte 
    <AuthContext.Provider value={[auth, setAuth]}> 
      {children}    
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
