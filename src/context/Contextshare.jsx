import React, {  createContext, useContext, useState } from 'react'


export const searchKeyContext = createContext("")
export const updateUserDetailsContext = createContext({})
export const addJobStatusContext = createContext({})
export const adminProfileUpdateContext = createContext({})

function Contextshare({children}) {
    const [searchKey, setsearchKey] = useState("")
    const [editProfile , setEditUserProfile] = useState({})
    const [addJobStatus , setAddJobStatus] = useState({})
    const [adminProfileStatus , setadminProfileStatus] = useState({})

  return (
     <adminProfileUpdateContext.Provider value={{adminProfileStatus , setadminProfileStatus}}>
        <addJobStatusContext.Provider value={{addJobStatus , setAddJobStatus}}>
           <updateUserDetailsContext.Provider value={{editProfile , setEditUserProfile}}>
              <searchKeyContext.Provider value={{searchKey, setsearchKey}}>
                 {children}
              </searchKeyContext.Provider>
           </updateUserDetailsContext.Provider>
        </addJobStatusContext.Provider>
     </adminProfileUpdateContext.Provider>
  )
}

export default Contextshare