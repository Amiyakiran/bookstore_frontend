import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register request 
export const registerApi = async(reqbody)=>{
   return await commonApi('POST',`${serverUrl}/user-register`,reqbody)
}

//login request
export const loginApi = async(reqbody)=>{
    return await commonApi('POST', `${serverUrl}/user-login`, reqbody)
}
//google login request
export const googleLoginApi = async(reqbody)=>{
    return await commonApi('POST', `${serverUrl}/google-login`, reqbody)
}

//upload the book request
export const bookUploadApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST', `${serverUrl}/upload-books`, reqBody , reqHeader)
}

//get all books
export const getAllUserBooksApi = async(searchKey, reqHeader)=>{
    console.log(reqHeader);
    
    return await commonApi('GET', `${serverUrl}/user-allbooks?search=${searchKey}`, "",reqHeader)
}

//get home books
export const gethomeBooksApi = async()=>{
    return await commonApi('GET', `${serverUrl}/home-books`)
}

//get A Book
export const getABookApi = async(id)=>{
    return await commonApi('GET', `${serverUrl}/book/${id}`)
}

//edit user Details 
export const editUserDetailsApi = async(reqbody, reqHeader)=>{
    return await commonApi('PUT', `${serverUrl}/edit-user`, reqbody, reqHeader)
}
//user sold Book
export const getUserSellBookApi = async(reqHeader)=>{
    return await commonApi('GET', `${serverUrl}/user-sell-book`,"", reqHeader)
}

//user brought Book
export const getUserbroughtBookApi = async(reqHeader)=>{
    return await commonApi('GET', `${serverUrl}/user-brought-book`,"", reqHeader)
}

//delete sold book history
export const deleteSoldBookHistoryApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-soldBook/${id}` )
}


//-----------------------ADMIN-------------------------------------------------

//edit admin details
export const editAdminDetailsApi = async(reqbody, reqHeader)=>{
    return await commonApi('PUT', `${serverUrl}/edit-admin`, reqbody, reqHeader)
}

//add job role
export const addJobApi = async(reqBody)=>{
    return await commonApi('POST', `${serverUrl}/add-job`, reqBody)
}

//get all jobs
export const getAllJobsApi = async(searchKey)=>{
    return await commonApi('GET', `${serverUrl}/get-allJobs?search=${searchKey}`)
}

//delete a job 
export const deleteJobApi = async(id)=>{
    return await commonApi('DELETE', `${serverUrl}/delete-job/${id}`)
}

//GET ALL USERS
export const getAllUsersApi = async()=>{
    return await commonApi('GET', `${serverUrl}/all-users`)
}

//GET ALL USERS
export const getAllBooksApi = async()=>{
    return await commonApi('GET', `${serverUrl}/all-books`)
}

//aprove books 
export const approveBook = async(reqBody)=>{
    return await commonApi ('PUT', `${serverUrl}/approve-Book`,reqBody)
}

//apply job
export const applyJobApi = async(reqBody ,reqHeader)=>{
   return await commonApi('POST', `${serverUrl}/job-application`, reqBody, reqHeader)
}
//get all application
export const getAllApplicationApi = async(searchKey)=>{
    return await commonApi('GET',`${serverUrl}/get-allapplications?search=${searchKey}`)
}

//payment request
export const makepaymentApi = async(reqBody, reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/make-payment`,reqBody, reqHeader)
}