'use client'

import { createContext, useState, useEffect } from "react";

export const fetchPost = createContext(null);

export default function FetchPostProvider({children}) {
    const [postData, setPostData] = useState([])

     useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await fetch("/api/post");
          const data = await response.json();
          if (!response.ok) return;
          setPostData(data)
        } catch (err) {
          console.error("Failed to fetch Post");
        }
      };
      fetchPost();
    }, []);
    return(
        <fetchPost.Provider value={{postData, setPostData}}>
            {children}
        </fetchPost.Provider>
    )
}