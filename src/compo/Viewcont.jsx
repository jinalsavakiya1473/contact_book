import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function Viewcont() {

    const token = localStorage.getItem('token')
    const [contect, setcontect] = useState([])
    const [search, setsearch] = useState('')
    const [modaldelet, setModaldelet] = useState(false);
    const [modalup,setmodalup]=useState(false)
    const [editId,seteditId]=useState('');
    const [editbox,seteditbox]=useState(false);
    const [editData,seteditData]=useState({
        first:'',
        last:'',
        mobile:'',
        email:'',
        nick:''
    })

    useEffect(() => {

        axios.get('https://service.apikeeda.com/contact-book', {
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setcontect(res.data.data)
            })

    },[editData,search])

    const searchCon = () => {
        axios.get('https://service.apikeeda.com/contact-book/find?search=' + search, {
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setcontect(res.data.data)
            })
    }

    const EditCont = (ID) => {
        seteditId(ID)
        seteditbox(true);
        axios.patch('https://service.apikeeda.com/contact-book/' + ID, {
            headers:{
                'Authorization':token
            }
        })
            .then((res)=>{
                const { firstName, lastName, mobileNo, email, nickName } = res.data.data;
                seteditData({
                    first: firstName,
                    last: lastName,
                    mobile: mobileNo,                    
                    email: email,               
                    nick: nickName                     
                })
            })
    }

    const updateContact = () => {
        axios.patch('https://service.apikeeda.com/contact-book/' + editId,{
            firstName:editData.first,
            lastName:editData.last,
            mobileNo:editData.mobile,
            email:editData.email,
            nickName:editData.nick
        },{
            headers: {
                'Authorization': token
            }
        })
        .then((res) => {
            const updatedContacts = contect.map(contact => {
                if (contact._id === editId) {
                    return res.data.data;
                }
                return contact;
            });
            setcontect(updatedContacts);
            seteditbox(false);
            setmodalup(true)
        })
    }

    const DeleteCont = (ID) => {
        axios.delete('https://service.apikeeda.com/contact-book/' + ID, {
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                const posts = contect.filter((item) => item._id !== ID);
                setcontect(posts)
                setModaldelet(true)
            })
    }

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='d-flex justify-content-end'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">View Contect</li>
                    </ol>
                </div>
                <div className="d-flex justify-content-center">
                    <div className='course data'>
                        <h3 className='text-center mb-5'>Content Book</h3>
                        <div className="input-group mb-4">
                            <input type="text" className="form-control txt_box" placeholder="Search course name" value={search} onChange={(e) => { setsearch(e.target.value); searchCon(); }} />
                        </div>
                        <div>
                            {
                                contect.map((item, ind) => {
                                    return (
                                        <div className='d-flex align-items-center con mb-2'>
                                            <h6>{ind + 1}</h6>
                                            <div className='w-100 px-5'>
                                                <p className='d-flex justify-content-between align-items-center'>
                                                    <div>
                                                        <h5>{item.firstName} {item.lastName}</h5>
                                                        <p>{item.email}</p>
                                                    </div>
                                                    <h5>{item.mobileNo}</h5>
                                                </p>
                                            </div>
                                            <div className='d-flex'>
                                                <button className='me-2' onClick={() => EditCont(item._id)}><FaEdit /></button>
                                                <button onClick={() => DeleteCont(item._id)}><RiDeleteBin6Fill /></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal size="md" centered className='success_modal' show={editbox}>
                <Modal.Body className='input_frm'>
                    <div className="frm_title fs-4 text-center mb-3 fw-bold">Update Contect Data</div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control txt_box" placeholder='First Name' value={editData.first} onChange={(e)=>seteditData({...editData,first:e.target.value})}/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control txt_box" placeholder='Last Name' value={editData.last} onChange={(e)=>seteditData({...editData,last:e.target.value})}/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control txt_box" placeholder='Mobile No' value={editData.mobile} onChange={(e)=>seteditData({...editData,mobile:e.target.value})}/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control txt_box" placeholder='Email' value={editData.email} onChange={(e)=>seteditData({...editData,email:e.target.value})}/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control txt_box" placeholder='Nick Name' value={editData.nick} onChange={(e)=>seteditData({...editData,nick:e.target.value})}/>
                    </div>
                    <button type="button" className='btn btn-login mt-3 d-block mx-auto' onClick={updateContact}>Update</button>
                </Modal.Body>
            </Modal>
            <Modal size="md" centered className='success_modal' show={modalup}>
                <Modal.Body>
                    <h2 className='text-center text-success'>Success!</h2>
                    <p className='text-center text-muted'>Course successfully Updated...!</p>
                    <div className='mt-4 d-flex justify-content-center'>
                        <button className='bg-success fs-6' onClick={()=>setmodalup(false)}>Ok</button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={modaldelet} centered>
                <Modal.Body>
                    <h2 className='text-center text-danger'>Deleted! </h2>
                    <p className='text-center text-muted py-2'>Contect successfully Deleted...!</p>
                    <div className='mt-4 d-flex justify-content-center'>
                        <button className='bg-danger fs-6' onClick={() => setModaldelet(false)}>Ok</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Viewcont
