import React from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/features/User/userSlice';
function Settings() {
    const userInfo = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!userInfo) {
        navigate('/');
    }
    const handleLogout = () => {
        dispatch(logout(userInfo));
        navigate('/'); // Redirect to the login page after logout
    };
    return (
        <div className='App other-page-top my-settings-mobile'>
            <div className="AppContent BreakPointContainer">
                <div className="MyAccountWrapper prel overflow-hidden">
                    <div className="MyAccountHeader layout align-center">
                        <div className="layout demi-bold justify-start h4 align-center">
                            <span> MY ACCOUNT </span>
                            <div className="DynamicHeightLoaderWrapper icon">
                                <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                            </div>
                            <span className="demi-bold">MY SETTINGS</span>
                        </div>
                    </div>
                    <div className="MyAccBody layout xs12">
                        <div className="h5 optionListLineHeight xs3 layout column orat-dark-grey-color">
                        <Link to="/myaccount" className='cursor-pointer demi-bold orat-black-color'> PERSONAL DETAILS </Link>
                            <Link to="/orderhistory" className='cursor-pointer demi-bold orat-black-color'> ORDER HISTORY </Link>
                            <Link to="/addaddress" className='cursor-pointer demi-bold orat-black-color'> MANAGE ADDRESSES </Link>
                            {/* <Link to="/credits" className='cursor-pointer demi-bold orat-black-color'> MY CREDITS </Link> */}
                            <Link to="/wishlist" className='cursor-pointer demi-bold orat-black-color'> MY WISHLIST </Link>
                            <Link to="/settings" className='cursor-pointer demi-bold orat-color'> SETTINGS </Link>
                            <Link onClick={handleLogout} className='cursor-pointer demi-bold orat-black-color'> LOGOUT </Link>
         
                        </div>
                        <div className="MyAccountPageWrapper flex xs9  prel overflow-hidden">
                            <div className="MySettings">
                                <h4 className="m-b-20 demi-bold">MY SETTINGS</h4>
                                <div className="flex xs7">
                                    <div className="MySettingsRow p-t-15 p-b-15 layout align-center justify-space-between">
                                        <h5 className="demi-bold">Whatsapp Notifications</h5>
                                    </div>
                                    <div className="layout align-start justify-content">
                                        <p className="p2 orat-dark-grey-color m-r-20 m-b-15">By opting for WhatsApp updates, you consent to receiving notifications from ORAT Pop-Up Shop regarding your order status, and shipping details, as well as updates on marketing and promotional&nbsp;activities.</p>
                                        <div className="SwitchCheckbox">
                                            <input type="checkbox" id="switch" />
                                            <label for="switch">Toggle</label>
                                        </div>
                                    </div>
                                    <div className="MySettingsRow p-t-15 p-b-15 layout column">
                                        <div className="DeleteAccountContainer layout justify-space-between align-center">
                                            <div className="layout column justify-space-between align-start">
                                                <h5 className="demi-bold text-capitalize m-b-5">delete my account</h5>
                                                <div className="PslCheckbox flex">
                                                    <label>
                                                        <input name="" type="checkbox" className="PslCheckboxInput" />
                                                        <span className="PslCheckboxCheckmark"></span>
                                                        <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2 orat-dark-grey-color">Yes, I want to permanently close my Account and delete my data.</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <button className="btn-orat-primary text-uppercase">delete my account</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings