import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const UserProvider = createContext(null)

const AuthContext = ({ children }) => {
    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(true)
    const [addToCard, setAddToCard] = useState([]);
    const [addToLove, setAddToLove] = useState([]);

    useEffect(() => {
        toast.success('Successfully added')
    }, [addToLove, addToCard])

    useEffect(() => {
        const data = localStorage.getItem('userData')
        const storedUserData = JSON.parse(data);
        if (storedUserData) {
            setLoader(false)
            setUser(storedUserData)
        }
    }, [localStorage.getItem('Token')])

    const sendValue = {

        setLoader,
        setUser,

        // 
        user,
        loader,
        setAddToCard,
        addToCard,
        addToLove,
        setAddToLove


    }
    return (
        <UserProvider.Provider value={sendValue}>
            {children}
        </UserProvider.Provider>
    );
};

export default AuthContext;