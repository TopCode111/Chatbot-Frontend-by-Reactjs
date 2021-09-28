import React, { createContext, useContext } from "react";
import useAuth from "../hooks/auth/useAuth";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

const UserDataProvider = (props) => {
    const { data: authData, status: authStatus, setData: setAuthData, error: authError} = useAuth();

    const userContextValue = { authData, setAuthData, authStatus };
    return (
      <UserContext.Provider value={userContextValue}>{props.children}</UserContext.Provider>
    );
};


export default UserDataProvider;