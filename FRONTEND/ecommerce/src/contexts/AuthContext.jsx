import React, { createContext, useEffect, useState } from 'react';

export const loginContext = createContext();

const AuthContext = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[loginToken,setLoginToken]=useState()
  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    setLoginToken(token)

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  return (
    <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn,loginToken }}>
      {children}
    </loginContext.Provider>
  );
}

export default AuthContext;
