import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../user/Footer';
import { editAdminDetailsApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import AdminHeader from './AdminHeader';
import Adminsidebar from './Adminsidebar';
import { adminProfileUpdateContext } from '../context/Contextshare';


function Settings() {
  

  const [updateAdminDetails, setUpdateAdminDetails] = useState({
    username: "",
    password: "",
    cpswd: "",
    photo: ""
  })
  const [updateAdminPreview, setUpdateAdminPreview] = useState("")
  const [token, setToken] = useState("")
  const [existingAdminImage, setExistingAdminImage] = useState("")
  const [isConfirm, setisConfirm] = useState(true)
  const {setadminProfileStatus} = useContext(adminProfileUpdateContext)



  const handleAdminUpdateUpload = (e) => {
    setUpdateAdminDetails({ ...updateAdminDetails, photo: e.target.files[0] })
    const url = URL.createObjectURL(e.target.files[0])
    setUpdateAdminPreview(url)
  }

  console.log(updateAdminDetails);

  const handleAdminReset = () => {
    if (sessionStorage.getItem("userDetails")) {
      setToken(sessionStorage.getItem("token"))
      const user = JSON.parse(sessionStorage.getItem("userDetails"))
      /*       console.log(user); */
      setUpdateAdminDetails({ ...updateAdminDetails, username: user.username, password: user.password })
    }
    setUpdateAdminPreview("")
  }

  const handleAdminUpdate = async () => {
    const { username, password, cpswd } = updateAdminDetails
    if (!username || !password || !cpswd) {
      alert('Please fill the complete details')
    }
    else {
      if (password != cpswd) {
        setisConfirm(false)
      }
      else {
        const reqBody = new FormData()
        for (let i in updateAdminDetails) {
          if (i != 'photo') {
            reqBody.append(i, updateAdminDetails[i])
          } else {
            updateAdminPreview ? reqBody.append(i, updateAdminDetails[i]) : reqBody.append("photo", existingAdminImage)
          }
        }

        if (updateAdminPreview) {
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
          const result = await editAdminDetailsApi(reqBody, reqHeader)
          if (result.status == 200) {
            alert('Update Successfull')
            sessionStorage.setItem("userDetails", JSON.stringify(result.data))
            setadminProfileStatus(result.data)
          

          }
          else {
            alert('Something went wrong')
            handleAdminReset()
          }
        }
        else {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }

          const result = await editAdminDetailsApi(reqBody, reqHeader)
          if (result.status == 200) {
            alert('Update Successfull')
            sessionStorage.setItem("userDetails", JSON.stringify(result.data))
            setadminProfileStatus(result.data)
           

          }
          else {
            alert('Something went wrong')
            handleAdminReset()
          }
        }

      }
    }

  }


  useEffect(() => {
    if (sessionStorage.getItem("userDetails")) {
      setToken(sessionStorage.getItem("token"))
      const user = JSON.parse(sessionStorage.getItem("userDetails"))
      /*       console.log(user); */
      setUpdateAdminDetails({ ...updateAdminDetails, username: user.username, password: user.password })
      setExistingAdminImage(user.photo)
    }


  }, [])

  return (
    <>

      <AdminHeader/>
      <div className="container-fluid">
        <div className="row ">

          <div className="col-md-3 bg-blue-50 flex  flex-col items-center">
           
            <Adminsidebar/>

          </div>


          <div className="col-md-9">
            <h4 className='text-center mt-3'>Settings</h4>

            <div className="row">
              <div className="col-md-5 flex justify-center items-center p-3 flex-col">
                <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis?</p>
                <p className='mt-4 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id maxime quia asperiores in cupiditate voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed neque, facilis, consequatur quos eveniet inventore ipsam beatae iure fugiat eligendi quae laborum incidunt eum quis, est blanditiis exercitationem velit excepturi?</p>
              </div>
              <div className="col-md-7 mt-4 px-5">

                <form className=' shadow rounded p-4 bg-blue-100 mb-5'>
                  <div className='flex justify-center items-center mt-3'>
                    <label htmlFor="AdminprofileImage">
                      <input type="file" id='AdminprofileImage' style={{ display: 'none' }} onChange={(e) => handleAdminUpdateUpload(e)} />

                      {
                        existingAdminImage == "" ?
                          <img src={updateAdminPreview ? updateAdminPreview : 'https://cdn-icons-png.freepik.com/512/8742/8742495.png'} alt="no image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} /> :
                          <img src={updateAdminPreview ? updateAdminPreview : `${serverUrl}/upload/${existingAdminImage}`} alt="no image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />

                      }



                      <div style={{ marginLeft: '90px', marginTop: '-35px' }} className=' flex justify-center items-center'>
                        <FontAwesomeIcon icon={faPen} className=' p-2 bg-amber-400 text-white rounded' />
                      </div>
                    </label>
                  </div>

                  <div className="my-3">
                    <input type="text" placeholder='username' className='form-control' value={updateAdminDetails.username} onChange={(e) => setUpdateAdminDetails({ ...updateAdminDetails, username: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <input type="text" placeholder='Password' className='form-control' value={updateAdminDetails.password} onChange={(e) => setUpdateAdminDetails({ ...updateAdminDetails, password: e.target.value })} />
                  </div>
                  <div className="mb-4">
                    <input type="password" placeholder='Confirm Password' className='form-control' value={updateAdminDetails.cpswd} onChange={(e) => setUpdateAdminDetails({ ...updateAdminDetails, cpswd: e.target.value })} />
                    {!isConfirm && <span style={{ fontSize: '12px' }} className='text-danger'>* Password and confirm password should match</span>}
                  </div>
                  <div className="mb-3 flex ">
                    <button className='btn btn-warning w-100' type='button' onClick={handleAdminReset} >Reset</button>
                    <button className='btn btn-success w-100 ms-2' type='button' onClick={handleAdminUpdate} >Update</button>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />

    </>
  )
}

export default Settings