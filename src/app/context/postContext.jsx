'use client'

import { createContext } from "react"
import { useState } from "react";

export const postContext = createContext();

export default function PostProvider({children}) {

    const [showMenu, setShowMenu] = useState(false);
    
    const handleMenu = () => {
        setShowMenu((prev) => !prev)
    }

    return(
        <postContext.Provider value={{ showMenu, handleMenu }}>
            {children}
        </postContext.Provider>
    )
}