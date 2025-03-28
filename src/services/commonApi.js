import axios from "axios"

export const commonApi = async(httpRequest,url, reqBody, reqHeader)=>{
   
   const reqConfig = {
       method:httpRequest,
       url,
       data:reqBody,
       headers:reqHeader
   }
  return await axios(reqConfig).then((result)=>{
       return result
   }).catch((err)=>{
       return err
   })
}