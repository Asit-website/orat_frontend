import React, { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userupdate } from '../Redux/features/User/userSlice';
import { userUpdate, changeUserPassword } from '../services/User-service';
import { RotatingLines } from "react-loader-spinner";
import Alerts from '../components/Alerts';
import Footer from '../components/footer';
import Loader from "../components/Loader";
import { Eyep, Eyepoff } from '../image';
import { logout } from '../Redux/features/User/userSlice';
import { BrowserView, MobileView } from 'react-device-detect';
function PersonalDetails() {
    const userInfo = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, seterrors] = useState([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passworderrors, setpassworderrors] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [showpasswordLoader, setShowpasswordLoader] = useState(false);
    const [successm, setsuccessm] = useState('');
    const [successmp, setsuccessmp] = useState('');
    const [loading, setLoading] = useState(true);
    const [icon, setIcon] = useState(Eyepoff);
    const [type, setType] = useState('password');
    const [iconreg, setregIcon] = useState(Eyepoff);
    const [typereg, setregType] = useState('password');
    const [iconregc, setregcIcon] = useState(Eyepoff);
    const [typeregc, setregcType] = useState('password');
    if (!userInfo) {
        navigate('/');
    }
    const handleaccountSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const userDetails = {
            user_id: userInfo?.data?.user?.id,
            token: userInfo?.data?.token,
            name: name,
            email: email,
            phone: phone
        }

        userUpdate(userDetails).then((data) => {
            setShowLoader(false);
            if (data.status) {
                setsuccessm(data.message);
                seterrors([]);
                dispatch(userupdate(data));
            } else {
                setsuccessm('');
                seterrors(data.message);

            }

        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("User update error:", error);
            }
        })

    };
    const handlepasswordSubmit = (e) => {
        e.preventDefault();
        setShowpasswordLoader(true);
        const userDetails = {
            user_id: userInfo?.data?.user?.id,
            token: userInfo?.data?.token,
            password: newPassword,
            oldpassword: oldPassword,
            password_confirmation: confirmPassword
        }

        changeUserPassword(userDetails).then((data) => {
            setShowpasswordLoader(false);
            if (data.status) {
                setsuccessmp(data.message);
                setpassworderrors([]);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setsuccessmp('');
                setpassworderrors(data.message);

            }

        }).catch((error) => {
            if (error) {
                setShowpasswordLoader(false);
                console.log("User password change error:", error);
            }
        })

    };
    const handleLogout = () => {
        dispatch(logout(userInfo));
        navigate('/'); // Redirect to the login page after logout
    };
    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        } else {
            setEmail(userInfo?.data?.user?.email);
            setName(userInfo?.data?.user?.name);
            setPhone(userInfo?.data?.user?.phone_no);
            setLoading(false);
        }
    }, [navigate])
    const handlePasswordToggle = () => {
        if (type === 'password') {
            setIcon(Eyep);
            setType('text')
        } else {
            setIcon(Eyepoff);
            setType('password');
        }
    }
    const handleregPasswordToggle = () => {
        if (typereg === 'password') {
            setregIcon(Eyep);
            setregType('text')
        } else {
            setregIcon(Eyepoff);
            setregType('password');
        }
    }
    const handleregconPasswordToggle = () => {
        if (typeregc === 'password') {
            setregcIcon(Eyep);
            setregcType('text')
        } else {
            setregcIcon(Eyepoff);
            setregcType('password');
        }
    }
    const handlephone = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value.length <= 10 && re.test(e.target.value)) {
            setPhone(e.target.value);
        }
    }
    return (
        loading ? (
            <Loader />
        ) : (
            userInfo ? (
                <>
                    <BrowserView>
                        <div className='App other-page-top my-account-mobile'>
                            <div className="AppContent BreakPointContainer">
                                <div className="MyAccountWrapper prel overflow-hidden">
                                    <div className="MyAccountHeader layout align-center">
                                        <div className="layout demi-bold justify-start h4 align-center">
                                            <span> MY ACCOUNT </span>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                                            </div>
                                            <span className="demi-bold">PERSONAL DETAILS</span>
                                        </div>
                                    </div>
                                    <div className="MyAccBody layout xs12">
                                        <div className="h5 optionListLineHeight xs3 layout column orat-dark-grey-color">
                                            <Link to="/myaccount" className='cursor-pointer demi-bold orat-color'> PERSONAL DETAILS </Link>
                                            <Link to="/orderhistory" className='cursor-pointer demi-bold orat-black-color'> ORDER HISTORY </Link>
                                            <Link to="/addaddress" className='cursor-pointer demi-bold orat-black-color'> MANAGE ADDRESSES </Link>
                                            {/* <Link to="/credits" className='cursor-pointer demi-bold orat-black-color'> MY CREDITS </Link> */}
                                            <Link to="/wishlist" className='cursor-pointer demi-bold orat-black-color'> MY WISHLIST </Link>
                                            {/*  <Link to="/settings" className='cursor-pointer demi-bold orat-black-color'> SETTINGS </Link> */}
                                            <Link onClick={handleLogout} className='cursor-pointer demi-bold orat-black-color'> LOGOUT </Link>

                                        </div>
                                        <div className="MyAccountPageWrapper flex xs9  prel overflow-hidden">
                                            <div>
                                                <div className="layout">
                                                    <div className="h4 flex xs3 m-b-20 demi-bold">MY DETAILS</div>
                                                </div>
                                                <div className="layout wrap align-start form_mobile">
                                                    <form onSubmit={handleaccountSubmit} className='flex xs5 sm4'>
                                                        <div className="layout column flex xs12">
                                                            <Alerts singleerror={errors} successm={successm} />
                                                            <div className="input-container-with-header">
                                                                <div className="form-field-header p3 font-normal text-uppercase">FULL NAME</div>
                                                                <input name="name" onChange={(e) => setName(e.target.value)} className="account-my-detail" pattern="[A-Za-z\W+]{1,25}" type="text" placeholder="Full Name" value={name} required />
                                                            </div>
                                                            <div className="input-container-with-header">
                                                                <div className="form-field-header p3 font-normal text-uppercase">PHONE NUMBER</div>
                                                                <input name="phone" onChange={(e) => handlephone(e)} className="account-my-detail" type="number" pattern="[0-9]" placeholder="Contact Number" value={phone} required />
                                                            </div>
                                                            <div className="input-container-with-header">
                                                                <div className="form-field-header p3 font-normal text-uppercase">EMAIL ADDRESS</div>
                                                                <input name="email" onChange={(e) => setEmail(e.target.value)} className="account-my-detail" type="email" placeholder="Email " value={email} required />
                                                            </div>
                                                            <button className='btn-orat-primary full-width m-t-48' type='submit' disabled={showLoader} >
                                                                {!showLoader ? "SAVE CHANGES" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                            </button>
                                                        </div>
                                                    </form>
                                                    <form onSubmit={handlepasswordSubmit} className='flex xs5 sm4 offset-xs1'>
                                                        <div className="layout column flex xs12">
                                                            <Alerts errors={passworderrors} successm={successmp} />
                                                            <div className="input-container-with-header">
                                                                <div className="form-field-header p3 font-normal text-uppercase d-block">current password</div>
                                                                <div className="PasswordField d-flex align-center">
                                                                    <input name="old_password" type={type} className="flex p-r-32 account-my-detail" value={oldPassword}
                                                                        onChange={(e) => setOldPassword(e.target.value)} placeholder="Current Password" required />
                                                                    <button className="btn-icon d-flex" type="button" onClick={handlePasswordToggle} title="Show Password">
                                                                        <img src={icon} alt="toggle password" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="input-container-with-header">
                                                                <div className="form-field-header p3 font-normal text-uppercase d-block">new password</div>
                                                                <div className="PasswordField d-flex align-center">
                                                                    <input name="new_password" type={typereg} className="flex p-r-32 account-my-detail" value={newPassword}
                                                                        onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
                                                                    <button className="btn-icon d-flex" type="button" onClick={handleregPasswordToggle} title="Show Password">
                                                                        <img src={iconreg} alt="toggle password" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="input-container-with-header">
                                                                <div className="form-field-header p3 font-normal text-uppercase d-block">confirm new password</div>
                                                                <div className="PasswordField d-flex align-center">
                                                                    <input name="confirmnewpassword" type={typeregc} className="flex p-r-32 account-my-detail" value={confirmPassword}
                                                                        onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required />
                                                                    <button className="btn-icon d-flex" type="button" onClick={handleregconPasswordToggle} title="Show Password">
                                                                        <img src={iconregc} alt="toggle password" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <button className='btn-orat-primary full-width m-t-48' type='submit' disabled={showpasswordLoader} >
                                                                {!showpasswordLoader ? "CHANGE PASSWORD" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BrowserView>
                    <MobileView>
                        <div className='App other-page-top my-account-mobile mb-4'>
                            <div className="AppContent BreakPointContainer">
                                <div className="MyAccountWrapper prel container">
                                    <div className="MyAccountHeader  align-center">
                                        <div className="layout demi-bold justify-start h4 align-center">
                                            <Link to="/myaccount"> <span> MY ACCOUNT </span></Link>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                                            </div>
                                            <span className="demi-bold">PERSONAL DETAILS</span>
                                        </div>
                                    </div>
                                    <div className="MyAccBody ">
                                        <div className="personal-details">
                                            <Alerts singleerror={errors} successm={successm} />
                                            <Alerts errors={passworderrors} successm={successmp} />
                                            <div className="details-section">
                                                <h3 className="section-title">MY DETAILS</h3>
                                                <form onSubmit={handleaccountSubmit} className="details-form">
                                                    <input name="name" onChange={(e) => setName(e.target.value)} className="input-field" pattern="[A-Za-z\W+]{1,25}" type="text" placeholder="Full Name" value={name} required />
                                                    <input name="email" onChange={(e) => setEmail(e.target.value)} className="input-field" type="email" placeholder="Email " value={email} required />
                                                    <input name="phone" onChange={(e) => handlephone(e)} className="input-field" type="number" pattern="[0-9]" placeholder="Contact Number" value={phone} required />
                                                    <button className='save-button' type='submit' disabled={showLoader} >
                                                        {!showLoader ? "SAVE CHANGES" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                    </button>
                                                </form>
                                            </div>

                                            <div className="change-password-section">
                                                <h3 className="section-title">CHANGE PASSWORD</h3>
                                                <form onSubmit={handlepasswordSubmit} className="password-form">
                                                    <input name="old_password" type={type} className="input-field" value={oldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)} placeholder="Current Password" required />
                                                    <input name="new_password" type={typereg} className="input-field" value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
                                                    <input name="confirmnewpassword" type={typeregc} className="input-field" value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required />

                                                    <button className='save-button mt-1' type='submit' disabled={showpasswordLoader} >
                                                        {!showpasswordLoader ? "CHANGE PASSWORD" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MobileView >

                    <Footer />
                </>
            ) : ''
        )
    )
}

export default PersonalDetails;