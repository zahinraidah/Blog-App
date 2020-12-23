import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [CurrentUser, setCurrentUser] = useState({});
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [CurrentComment, setCurrentComment] = useState({});
  const [CurrentPost, setCurrentPost] = useState({});

  return (
    <AuthContext.Provider
      value={{
        CurrentUser: CurrentUser,
        setCurrentUser: setCurrentUser,
        IsLoggedIn: IsLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        CurrentPost: CurrentPost,
        setCurrentPost: setCurrentPost,
        CurrentComment: CurrentComment,
        setCurrentComment: setCurrentComment,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
