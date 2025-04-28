import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faPen } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { serverUrl } from '../services/serverUrl';
import { editUserDetailsApi } from '../services/allApi';
import { updateUserDetailsContext } from '../context/Contextshare';


function EditUserDetails() {
    const [updateUserDetails, setUpdateUserDetails] = useState({

        username: "",
        password: "",
        cpswd: "",
        photo: "",
        bio: ""
    })
    /*  console.log(updateUserDetails); */
    const [updatePreview, setUpdatePreview] = useState("")
    const [token, setToken] = useState("")

    const [isConfirm, setisConfirm] = useState(true)

    const [show, setShow] = useState(false);
    const [existingImage, setexistingImage] = useState("")
    const { setEditUserProfile} = useContext(updateUserDetailsContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateRest = () => {
        setUpdateUserDetails({
            username: "",
            password: "",
            cpswd: "",
            photo: "",
            bio: ""
        })
        setisConfirm(true)
        setUpdatePreview("")
    }
    const handleUpdateUpload = (e) => {
        setUpdateUserDetails({ ...updateUserDetails, photo: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setUpdatePreview(url)

    }

    // console.log(updateUserDetails);
    // console.log(existingImage);


    const handleUpdateProfile = async () => {
        const { username, password, cpswd, photo, bio } = updateUserDetails

        if (!username || !password || !cpswd || !bio) {
            alert('Please fill the complete details')
        }
        else {
            if (password != cpswd) {
                setisConfirm(false)
            }
            else {
                const reqBody = new FormData()
                for (let i in updateUserDetails) {
                    if (i != 'photo') {
                        reqBody.append(i, updateUserDetails[i])
                    } else {
                        updatePreview ? reqBody.append(i, updateUserDetails[i]) : reqBody.append("photo", existingImage)
                    }
                }
                console.log(reqBody);
                
                if (updatePreview) {

                    const reqHeader = {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }

                    const result = await editUserDetailsApi(reqBody, reqHeader)
                    // console.log(result);
                    if (result.status == 200) {
                        alert('Update Successfull')
                        sessionStorage.setItem("userDetails", JSON.stringify(result.data))
                        setShow(false)
                        setEditUserProfile(result.data)
                    }
                    else {
                        alert('Something went wrong')
                        handleUpdateRest()
                    }
                }
                else {
                    const reqHeader = {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await editUserDetailsApi(reqBody, reqHeader)
                    // console.log(result);
                    if(result.status==200){
                        alert('Update Successfull')
                        sessionStorage.setItem("userDetails",JSON.stringify(result.data))
                        setShow(false)
                        setEditUserProfile(result.data)
                    }
                    else{
                        alert('Something went wrong')
                        handleUpdateRest()
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
            setUpdateUserDetails({ ...updateUserDetails, username: user.username, password: user.password, bio: user.Bio })
            setexistingImage(user.photo)
        }


    }, [])


    return (
        <>
            <button onClick={handleShow} className='btn btn-outline-primary'><FontAwesomeIcon icon={faFilePen} />Edit</button>


            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header className='bg-blue-950 text-white' closeButton>
                    <Offcanvas.Title >Edit User Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='flex justify-center items-center mt-3'>
                        <label htmlFor="profileImage">
                            <input type="file" id='profileImage' style={{ display: 'none' }} onChange={(e) => handleUpdateUpload(e)} />
                           {
                                existingImage == "" ?
                                    <img src={updatePreview ? updatePreview : 'https://cdn-icons-png.freepik.com/512/8742/8742495.png'} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} /> : existingImage.startsWith('http')? <img src={updatePreview ? updatePreview : `${existingImage}`} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />:
                                    <img src={updatePreview ? updatePreview : `${serverUrl}/upload/${existingImage}`} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />

                            }
                            <div style={{ marginLeft: '120px', marginTop: '-50px' }} className=' flex justify-center items-center'>
                                <FontAwesomeIcon icon={faPen} className='fa-2x p-2 bg-amber-400 text-white rounded' />
                            </div>
                        </label>
                    </div>

                    <form className='border rounded p-4 mt-5'>
                        <div className="mb-4">
                            <input type="text" value={updateUserDetails.username} placeholder='username' className='form-control' onChange={(e) => setUpdateUserDetails({ ...updateUserDetails, username: e.target.value })} />
                        </div>
                        <div className="mb-4">
                            <input type="text" value={updateUserDetails.password} placeholder='password' className='form-control' onChange={(e) => setUpdateUserDetails({ ...updateUserDetails, password: e.target.value })} />
                        </div>
                        <div className="mb-4">
                            <input type="password" value={updateUserDetails.cpswd} placeholder='confirm Password' className='form-control' onChange={(e) => setUpdateUserDetails({ ...updateUserDetails, cpswd: e.target.value })} />
                            {!isConfirm && <span className='text-danger'>*password and confirm password should match</span>}
                        </div>

                        <div className="mb-4">
                            <textarea type="text" value={updateUserDetails.bio} placeholder='Bio' rows={4} className='form-control' onChange={(e) => setUpdateUserDetails({ ...updateUserDetails, bio: e.target.value })} />
                        </div>
                    </form>
                    <div className="my-4 flex justify-center">
                        <button className='btn btn-warning' onClick={handleUpdateRest}>Reset</button>
                        <button className='btn btn-success ms-4' onClick={handleUpdateProfile} >Update</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default EditUserDetails
