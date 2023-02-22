import { useState, createContext } from "react";

const AppContext = createContext()

export default AppContext;

export const AppProvider = ({children}) => {
    const [userName, setUserName] = useState('')
    const [roomName, setRoomName] = useState('')
    const contextData = {
        userName,
        setUserName,
        roomName,
        setRoomName,
    }
    return (
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    )
}
