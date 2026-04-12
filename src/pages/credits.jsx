import React, { useState } from 'react';
import { FaChevronRight } from "react-icons/fa6";
import { Link,useNavigate } from 'react-router-dom';
import { Nocredits } from '../image';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { logout } from '../Redux/features/User/userSlice';
const Credits = () => {
   
    const [show, setShow] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!userInfo) {
        navigate('/');
    }
    // const handleClose = () => setShow(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogout = () => {
        dispatch(logout(userInfo));
        navigate('/'); // Redirect to the login page after logout
    };
    return (
        <div className='App other-page-top my-credits-mobile'>
            <div className="AppContent BreakPointContainer">
                <div className="MyAccountWrapper prel overflow-hidden">
                    <div className="MyAccountHeader layout align-center">
                        <div className="layout demi-bold justify-start h4 align-center">
                            <span> MY ACCOUNT </span>
                            <div className="DynamicHeightLoaderWrapper icon">
                                <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                            </div>
                            <span className="demi-bold">MY CREDITS</span>
                        </div>
                    </div>
                    <div className="MyAccBody layout xs12">
                        <div className="h5 optionListLineHeight xs3 layout column orat-dark-grey-color">
                        <Link to="/myaccount" className='cursor-pointer demi-bold orat-black-color'> PERSONAL DETAILS </Link>
                            <Link to="/orderhistory" className='cursor-pointer demi-bold orat-black-color'> ORDER HISTORY </Link>
                            <Link to="/addaddress" className='cursor-pointer demi-bold orat-black-color'> MANAGE ADDRESSES </Link>
                            <Link to="/credits" className='cursor-pointer demi-bold orat-color'> MY CREDITS </Link>
                            <Link to="/wishlist" className='cursor-pointer demi-bold orat-black-color'> MY WISHLIST </Link>
                           {/*  <Link to="/settings" className='cursor-pointer demi-bold orat-black-color'> SETTINGS </Link> */}
                            <Link onClick={handleLogout} className='cursor-pointer demi-bold orat-black-color'> LOGOUT </Link>
                 
                        </div>
                        <div className="MyAccountPageWrapper flex xs9  prel overflow-hidden">
                            <div className="OrdersWrap show">
                                <div className="layout column justify-space-between align-center m-t-48 m-b-48">
                                    <div className="NoStateImage m-b-16">
                                        <div className="DynamicHeightLoaderWrapper icon" style={{ paddingTop: '100%' }}>
                                            <div className="DynamicHeightLoader layout row align-center justify-center">
                                                <img src={Nocredits} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="h1 demi-bold m-b-8">You have no credits</h1>
                                    <button className="btn-orat-secondry width-auto text-uppercase" onClick={handleShow}>add credits via gift card</button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Body>
                                            <div className="PromoModalWidth overflow-hidden layout column justify-center">
                                                <h4 className="m-b-25 demi-bold">Have a gift card?</h4>
                                                <form action="" className='layout flex xs12'>
                                                    <div className="input-container flex xs9 layout column">
                                                        <input name="" type="text" placeholder="ENTER GIFT CARD CODE" className="" value="" required />
                                                    </div>
                                                    <button type="submit" className="h6 flex btn-enter xs3 demi-bold">REDEEM</button>
                                                </form>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Credits