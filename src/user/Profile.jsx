import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { bookUploadApi, deleteSoldBookHistoryApi, getUserbroughtBookApi, getUserSellBookApi } from '../services/allApi'
import EditUserDetails from './EditUserDetails'
import { serverUrl } from '../services/serverUrl'
import { updateUserDetailsContext } from '../context/Contextshare'




function Profile() {

    const [preview, setPreview] = useState("")
    const [PreviewList, setPreviewList] = useState([])
    const [status, setStatus] = useState(1)
    const [key, setKey] = useState('tab1');
    const [ProjectDetails, setProjectDetails] = useState({
        title: "",
        author: "",
        publisher: "",
        language: "",
        noOfPage: "",
        isbn: "",
        imageurl: "",
        price: "",
        discountPrice: "",
        abstract: "",
        uploadImages: []

    })
    const [userBook, setUserBook] = useState([])
    const [existingImage, setexistingImage] = useState("")
    const [UserDetails, setUserDetails] = useState({

        username: "",
        password: "",
        photo: "",
        bio: ""
    })
    const [token, setToken] = useState("")
    const { editProfile } = useContext(updateUserDetailsContext)
    const [sellBook, setsellBook] = useState([])
    const [broughtBook, setbroughtBook] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }

    }, [])
    /*   console.log(token); */


    /*  console.log(ProjectDetails); */




    const handleUpload = (e) => {
        console.log(e.target.files);
        const fileArray = ProjectDetails.uploadImages
        console.log(fileArray);

        fileArray.push(e.target.files[0])
        setProjectDetails({ ...ProjectDetails, uploadImages: fileArray })
        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setPreview(url)
        const newArray = PreviewList
        newArray.push(url)
        setPreviewList(newArray)
        console.log(PreviewList);


    }


    /*  console.log(status); */

    const handleTabSelect = (key) => {
        setKey(key);
        if (key == 'Sell_Book') {
            setStatus(1)
        }
        else if (key == 'Sold_History') {
            setStatus(2)
            userSellBook()

        }
        else {
            setStatus(3)
            userBroughtBook()
        }
    };

    /* reset function */
    const handlereset = () => {
        setProjectDetails({
            title: "",
            author: "",
            publisher: "",
            language: "",
            noOfPage: "",
            category: "",
            isbn: "",
            imageurl: "",
            price: "",
            discountPrice: "",
            abstract: "",
            uploadImages: []
        })

        setPreview("")
        setPreviewList([])
    }


    //handle submit 
    const handleSubmit = async () => {
        const { title, author, publisher, language, noOfPage, isbn, imageurl, price, discountPrice, abstract, uploadImages, category } = ProjectDetails

        if (!title || !author || !publisher || !language || !noOfPage || !isbn || !imageurl || !price || !discountPrice || !abstract || !category || uploadImages.length == 0) {
            alert('Please fill all the fields properly')
        }
        else {
            console.log(uploadImages);

            const reqBody = new FormData()

            reqBody.append("title", title)
            reqBody.append("author", author)
            reqBody.append("publisher", publisher)
            reqBody.append("language", language)
            reqBody.append("noOfPage", noOfPage)
            reqBody.append("isbn", isbn)
            reqBody.append("imageurl", imageurl)
            reqBody.append("category", category)
            reqBody.append("price", price)
            reqBody.append("discountPrice", discountPrice)
            reqBody.append("abstract", abstract)
            for (let i = 0; i < uploadImages.length; i++) {
                reqBody.append('uploadImages', uploadImages[i]);
            }




            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            console.log(reqBody);
            console.log(reqHeader);



            const result = await bookUploadApi(reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
                alert('Book uploaded successfully')
                handlereset()

            }
            else if (result.status == 406) {
                alert(result.response.data)
                handlereset()
            }
            else {
                alert('Something went wrong')
                handlereset()

            }

        }

    }


    useEffect(() => {
        if (sessionStorage.getItem("userDetails")) {
            const user = JSON.parse(sessionStorage.getItem("userDetails"))
            setUserDetails({ ...UserDetails, username: user.username, bio: user.Bio })

            setexistingImage(user.photo)

        }


    }, [editProfile])

    //get sell Books
    const userSellBook = async () => {
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getUserSellBookApi(reqHeader)
        // console.log(result);
        if (result.status == 200) {
            setsellBook(result.data)
        }

    }

    //get Brought books 
    const userBroughtBook = async () => {
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getUserbroughtBookApi(reqHeader)
        // console.log(result);
        if (result.status == 200) {
            setbroughtBook(result.data)
        }

    }

    //delete book from sold history
    const handlesoldBookHistory = async(id)=>{
       const result = await deleteSoldBookHistoryApi(id)
       
       if(result.status==200){
        userSellBook()
       }
       
    }

    return (
        <>
            <Header />
            <div id='profile' ></div>
            <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginTop: '-130px', backgroundColor: 'white', marginLeft: '70px' }} className='flex justify-center items-center'  > <img src={existingImage ? existingImage.startsWith('http') ? `${existingImage}` : `${serverUrl}/upload/${existingImage}` : 'https://cdn-icons-png.freepik.com/512/8742/8742495.png'} alt=" no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }} /></div>


            <div className="container mt-3">
                <div className='d-flex justify-between'>
                    <span className='flex justify-center items-center'><h3>{UserDetails.username} </h3><FontAwesomeIcon icon={faCircleCheck} style={{ color: "#74C0FC", }} className='ms-2' /></span>

                    <EditUserDetails />
                </div>
                <p className='mt-4'>{UserDetails.bio ? UserDetails.bio : '  Update your Biography'}</p>
            </div>

            <div className='my-5 flex justify-center items-center '>
                <Tabs
                    defaultActiveKey="Sell_Book"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    onSelect={handleTabSelect}
                >
                    <Tab eventKey="Sell_Book" title="Sell Book" ></Tab>
                    <Tab eventKey="Sold_History" title="Sold History" ></Tab>
                    <Tab eventKey="Purchase_History" title="Purchase History"></Tab>
                </Tabs>
            </div>

            {/* sell Book */}
            {status == 1 && <div className='my-5 container '>
                <form className='p-5 shadow bg-gray-100'>
                    <h3 className='text-center'>Book Details</h3>
                    <div className="row mt-5">
                        <div className="col-md-6 ">
                            <div className="mb-3">
                                <input type="text" placeholder='Title' className='form-control' value={ProjectDetails.title} onChange={(e) => setProjectDetails({ ...ProjectDetails, title: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Author' className='form-control' value={ProjectDetails.author} onChange={(e) => setProjectDetails({ ...ProjectDetails, author: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='No of pages' className='form-control' value={ProjectDetails.noOfPage} onChange={(e) => setProjectDetails({ ...ProjectDetails, noOfPage: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Image Url' className='form-control' value={ProjectDetails.imageurl} onChange={(e) => setProjectDetails({ ...ProjectDetails, imageurl: e.target.value })} />
                            </div>

                        </div>
                        <div className="col-md-6 ">
                            <div className="mb-3">
                                <input type="text" placeholder='Publisher' className='form-control' value={ProjectDetails.publisher} onChange={(e) => setProjectDetails({ ...ProjectDetails, publisher: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Language' className='form-control' value={ProjectDetails.language} onChange={(e) => setProjectDetails({ ...ProjectDetails, language: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='ISBN' className='form-control' value={ProjectDetails.isbn} onChange={(e) => setProjectDetails({ ...ProjectDetails, isbn: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Category' className='form-control' value={ProjectDetails.category} onChange={(e) => setProjectDetails({ ...ProjectDetails, category: e.target.value })} />
                            </div>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">



                            <div className="mb-3">
                                <input type="text" placeholder='Price' className='form-control' value={ProjectDetails.price} onChange={(e) => setProjectDetails({ ...ProjectDetails, price: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input type="text" placeholder='Discount Price' className='form-control' value={ProjectDetails.discountPrice} onChange={(e) => setProjectDetails({ ...ProjectDetails, discountPrice: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <textarea rows={5} type="text" placeholder='Abstract' className='form-control' value={ProjectDetails.abstract} onChange={(e) => setProjectDetails({ ...ProjectDetails, abstract: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-6 flex justify-center items-center flex-col">
                            {/*   <h5 className='mb-5'>Camera Images Upload</h5> */}
                            {!preview ? <label htmlFor="imageUpload">
                                <input name='uploadImages' type="file" id='imageUpload' className='d-none' onChange={(e) => handleUpload(e)} />
                                <img src="https://cdn-icons-png.freepik.com/256/8467/8467062.png?semt=ais_hybrid" alt="no image" className='w-75' />
                            </label> :

                                <img src={preview} alt="no image" className='w-75' />

                            }
                            <div className='flex justify-between items-center my-4'>
                                {
                                    PreviewList.map((item) => (
                                        <img src={item} alt="no image" style={{ width: '70px', height: '70px' }} className='mx-3' />
                                    ))
                                }
                                {(PreviewList.length != 0 && PreviewList.length < 3) && <label htmlFor="imageUp" className='btn btn-light rounded-0 shadow'><FontAwesomeIcon icon={faPlus} />
                                    <input type="file" id='imageUp' className='d-none' onChange={(e) => handleUpload(e)} />
                                </label>}

                            </div>
                        </div>
                    </div>
                    <div className='float-end'>
                        <button className='btn btn-warning' type='button' onClick={handlereset} >Reset</button>
                        <button className='btn btn-success ms-3' type='button' onClick={handleSubmit} >Submit</button>
                    </div>

                </form>

            </div>}

            {/* Sold history */}
            {status == 2 && <div>
                <div className='my-5 container shadow px-5 p-5 rounded'>


                    {sellBook?.length > 0 ?
                        sellBook?.map((item, index) => (
                            <div className="row mb-4 bg-gray-100 p-4 rounded" key={index}>
                                <div className="col-md-8">
                                    <h4>{item?.title}</h4>
                                    <p>{item?.author}</p>
                                    <p className='text-primary'> $ {item?.discountPrice}</p>

                                    <p className='text-justify'>{item?.abstract}</p>

                                    {item?.status == 'sold' ? <img src="https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-sold-out-stamp-label-png-image_4665221.png" alt="no image" style={{ width: '100px', height: '100px' }} /> : item?.status == 'approved' ?

                                        <img src="https://static.vecteezy.com/system/resources/previews/024/382/871/non_2x/approved-sign-symbol-icon-label-stamp-green-round-design-transparent-background-free-png.png" alt="no image" style={{ width: '65px', height: '65px' }} /> :

                                        <img src="pending_Icon.png" alt="no image" style={{ width: '65px', height: '65px' }} />}
                                </div>
                                <div className="col-md-4 px-5">
                                    <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '300px' }} />
                                    <button className='btn btn-danger float-right mt-4' onClick={() => handlesoldBookHistory(item?._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                        :
                        <div className='flex justify-center items-center flex-col'>
                            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '100px' }} />
                            <p className='text-danger'>No Book added Yet</p>
                        </div>
                    }


                </div>
            </div>}

            {/* Purchase History */}


            {
                status == 3 && <div>
                    <div className='my-5 container shadow px-5 p-5 rounded'>
                        {broughtBook?.length > 0 ?
                            broughtBook?.map((item, index) => (
                                <div className="row mb-4 bg-gray-100 p-4 rounded" key={index}>
                                    <div className="col-md-8">
                                        <h4>{item?.title}</h4>
                                        <p>{item?.author}</p>
                                        <p className='text-primary'> $ {item?.discountPrice}</p>

                                        <p className='text-justify'>{item?.abstract}</p>

                                        {/* {item.brought != "" && <img src="https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-sold-out-stamp-label-png-image_4665221.png" alt="no image" style={{ width: '100px', height: '100px' }} />} */}
                                    </div>
                                    <div className="col-md-4 px-5">
                                        <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '300px' }} />
                                    </div>
                                </div>
                            ))
                            :
                            <div className='flex justify-center items-center flex-col'>
                                <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="no image" style={{ width: '100px' }} />
                                <p className='text-danger'>No Book brought Yet</p>
                            </div>
                        }


                    </div>
                    {/* {broughtBook?.length > 0 && <div className='flex justify-center items-center container'>
                        <button className='btn btn-outline-danger mb-5 '>Clear History</button>
                    </div>} */}
                </div>
            }

            <Footer />
        </>
    )
}

export default Profile