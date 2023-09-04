import { createContext, useState } from "react";

//the value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,  
});

//the component
//wraps around the components that need the values inside
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}