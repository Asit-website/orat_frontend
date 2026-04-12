import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, userregister } from '../Redux/features/User/userSlice';
import { userSignUp } from '../services/User-service';

import Modal from 'react-bootstrap/Modal';
import { FaGooglePlusG } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from "react-loader-spinner";
import { getAllCartsd, addToCart } from '../Redux/features/Cart/CartSlice';
import { getWishListd } from '../Redux/features/wishlist/WishListSlice';
import { addCart } from '../services/User-service';
import ForgotPassword from './ForgotPassword';
import { Eyep, Eyepoff } from '../image';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import {BrowserView, MobileView } from 'react-device-detect';
function LoginModal({ showModal, modalHide, defaultToRegister = false }) {
    const [fullscreen, setFullscreen] = useState(true);
    const [smShow, setSmShow] = useState(false);
    const [regShow, setRegShow] = useState(false);
    const wasOpenRef = useRef(false);

    const [loginDetails, setLoginDetail] = useState({
        email: '',
        password: ''
    });


    let [loading, setLoading] = useState(false);
    let [color] = useState("#ffffff");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regname, setregname] = useState('');
    const [regemail, setregEmail] = useState('');
    const [regpassword, setregPassword] = useState('');
    const [regcpassword, setregcPassword] = useState('');
    const [errors, seterrors] = useState([]);
    const [loginerrors, setloginerrors] = useState('');
    const [successm, setsuccessm] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [showloginLoader, setShowloginLoader] = useState(false);
    const [modalShowf, setModalShowf] = React.useState(false);
    const [icon, setIcon] = useState(Eyepoff);
    const [type, setType] = useState('password');
    const [iconreg, setregIcon] = useState(Eyepoff);
    const [typereg, setregType] = useState('password');
    const [iconregc, setregcIcon] = useState(Eyepoff);
    const [typeregc, setregcType] = useState('password');
    const [agreeTnC, setAgreeTnC] = useState(false);
    const [emailUpdates, setEmailUpdates] = useState(false);
    const [whatsappUpdates, setWhatsappUpdates] = useState(false);
    var modalHidef = () => {
        setModalShowf(false);
    }
    const signupshow = () => {
        setRegShow(true);
        setloginerrors('');
    };

    useEffect(() => {
        if (showModal && !wasOpenRef.current) {
            setRegShow(!!defaultToRegister);
            setloginerrors('');
            seterrors([]);
            setsuccessm('');
            wasOpenRef.current = true;
        }

        if (!showModal) {
            wasOpenRef.current = false;
        }
    }, [showModal, defaultToRegister]);
    const forgotPasswordShow = () => {
        modalHide();
        setModalShowf(true);
    };
    const loginshow = () => {
        setRegShow(false);
        seterrors([]);
        setsuccessm('');
    };
    const hideerrorshow = () => {
        setRegShow(false);
        seterrors([]);
        setloginerrors('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowloginLoader(true);

        dispatch(loginUser({ email, password })).then((data) => {
            setShowloginLoader(false);
            if (data.payload.errors) {
                setloginerrors(data.payload.errors);
            } else {
                setloginerrors(data.payload);
            }
            if (data.payload.success) {
                const userd = {
                    user_id: data.payload.data.user.id,
                }
                
                // Save guest cart items before fetching user cart
                const guestCartItems = cartItems || [];
                
                // Fetch user cart from server
                dispatch(getAllCartsd(userd)).then(async (cartResult) => {
                    // After fetching user cart, merge guest cart items
                    if (guestCartItems.length > 0) {
                        const serverCartItems = cartResult.payload?.data || [];
                        const serverVariantIds = new Set(serverCartItems.map(item => item.activevar || item.varient_id));
                        
                        // Filter out items that already exist in server cart
                        const itemsToAdd = guestCartItems.filter(item => {
                            const variantId = item.activevar || item.varid;
                            return !serverVariantIds.has(variantId);
                        });
                        
                        // Add guest cart items to server
                        if (itemsToAdd.length > 0) {
                            try {
                                const syncPromises = itemsToAdd.map(item => {
                                    const cartData = {
                                        product_id: item.id || item.product_id,
                                        user_id: userd.user_id,
                                        varient_id: item.activevar || item.varid,
                                    };
                                    return addCart(cartData);
                                });
                                
                                await Promise.all(syncPromises);
                                
                                // Refresh cart after syncing
                                dispatch(getAllCartsd(userd));
                            } catch (error) {
                                console.error("Error syncing cart items:", error);
                                // Still refresh cart even if some items failed
                                dispatch(getAllCartsd(userd));
                            }
                        }
                    }
                });
                
                dispatch(getWishListd(userd));
                //navigate("/myaccount")
                setloginerrors('');
            }

        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("User Login error:", error);
            }
        });

    };
    const handleregSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const isMobile = (typeof window !== 'undefined') && window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
        if (isMobile && !agreeTnC) {
            setShowLoader(false);
            seterrors(["Please accept ORAT Shop T&Cs to continue."]);
            return;
        }
        const userDetails = {
            name: regname,
            email: regemail,
            password: regpassword,
            c_password: regcpassword,
            tnc_accepted: agreeTnC ? 1 : 0,
            email_updates_optin: emailUpdates ? 1 : 0,
            whatsapp_updates_optin: whatsappUpdates ? 1 : 0
        }

        userSignUp(userDetails).then((data) => {
            setShowLoader(false);
            if (data.status) {
                seterrors([]);
                setloginerrors('');
                setsuccessm('');
                setsuccessm(data.message);
                dispatch(userregister());
                e.target.reset();
                setAgreeTnC(false);
                setEmailUpdates(false);
                setWhatsappUpdates(false);
            } else {
                seterrors(data.message);
            }


        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("User Register error:", error);
            }
        })

    };

    useEffect(() => {

        if (userInfo) {
            // dispatch(fetchCart());
            // dispatch(fetchWishlist());
            // navigate('/'); // Redirect to the homepage or dashboard after login
            modalHide();
        }
    }, [userInfo, dispatch, navigate]);

    // Lock background scroll while login modal is open
    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        if (!showModal) return;

        const scrollY = window.scrollY || window.pageYOffset || 0;

        const prevBodyOverflow = body.style.overflow;
        const prevBodyPosition = body.style.position;
        const prevBodyTop = body.style.top;
        const prevBodyLeft = body.style.left;
        const prevBodyRight = body.style.right;
        const prevBodyWidth = body.style.width;
        const prevHtmlOverflow = html.style.overflow;

        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
        html.style.overflow = 'hidden';

        return () => {
            body.style.overflow = prevBodyOverflow;
            body.style.position = prevBodyPosition;
            body.style.top = prevBodyTop;
            body.style.left = prevBodyLeft;
            body.style.right = prevBodyRight;
            body.style.width = prevBodyWidth;
            html.style.overflow = prevHtmlOverflow;

            window.scrollTo(0, scrollY);
        };
    }, [showModal]);
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
    const googleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            //console.log("tokenResponse:",tokenResponse);
            // fetching userinfo can be done on the client or the server
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    // Handle the response from your backend server
                    //console.log('Login successful, backend response:', data.email);
                    var logintype = 'google';
                    var userDetailsg = {
                        email: data.email,
                        name: data.name,
                        googleID: data.sub,
                    };
                    dispatch(loginUser({ userDetailsg, logintype })).then((datagg) => {
                        setShowloginLoader(false);
                        if (datagg.payload.errors) {
                            setloginerrors(datagg.payload.errors);
                        } else {
                            setloginerrors(datagg.payload);
                        }
                        if (datagg.payload.success) {
                            const userd = {
                                user_id: datagg.payload.data.user.id,
                            }
                            
                            // Save guest cart items before fetching user cart
                            const guestCartItems = cartItems || [];
                            
                            // Fetch user cart from server
                            dispatch(getAllCartsd(userd)).then((cartResult) => {
                                // After fetching user cart, merge guest cart items
                                if (guestCartItems.length > 0) {
                                    const serverCartItems = cartResult.payload?.data || [];
                                    const serverVariantIds = new Set(serverCartItems.map(item => item.activevar || item.varient_id));
                                    
                                    // Filter out items that already exist in server cart
                                    const itemsToAdd = guestCartItems.filter(item => {
                                        const variantId = item.activevar || item.varid;
                                        return !serverVariantIds.has(variantId);
                                    });
                                    
                                    // Add guest cart items to server
                                    if (itemsToAdd.length > 0) {
                                        itemsToAdd.forEach(async (item) => {
                                            try {
                                                const cartData = {
                                                    product_id: item.id || item.product_id,
                                                    user_id: userd.user_id,
                                                    varient_id: item.activevar || item.varid,
                                                };
                                                await addCart(cartData);
                                            } catch (error) {
                                                console.error("Error syncing cart item:", error);
                                            }
                                        });
                                        
                                        // Refresh cart after syncing
                                        setTimeout(() => {
                                            dispatch(getAllCartsd(userd));
                                        }, 500);
                                    }
                                }
                            });
                            
                            dispatch(getWishListd(userd));
                            //navigate("/myaccount")
                            setloginerrors('');
                        }

                    }).catch((error) => {
                        if (error) {
                            setShowLoader(false);
                            console.log("User Login error:", error);
                        }
                    });

                })
                .catch(error => {
                    // Handle errors in communicating with your backend server
                    console.error('Error exchanging authorization code:', error);
                });
        },
        onError: () => {
            console.error('Google login failed');
            // Handle login errors here
        },
        // flow: 'auth-code', // Use 'auth-code' for the authorization code flow
    });
    // This function will be called upon a successful login
    const handleFacebookCallback = (response) => {
        if (response?.status === "unknown") {
            console.error('Sorry!', 'Something went wrong with facebook Login.');
         return;
        }
        var logintype = 'facebook';
        var userDetailsf = {
            email: response.email,
            name: response.name,
            facebookID: response.id,
        };
        dispatch(loginUser({ userDetailsf, logintype })).then((datagg) => {
            setShowloginLoader(false);
            if (datagg.payload.errors) {
                setloginerrors(datagg.payload.errors);
            } else {
                setloginerrors(datagg.payload);
            }
            if (datagg.payload.success) {
                const userd = {
                    user_id: datagg.payload.data.user.id,
                }
                
                // Save guest cart items before fetching user cart
                const guestCartItems = cartItems || [];
                
                // Fetch user cart from server
                dispatch(getAllCartsd(userd)).then(async (cartResult) => {
                    // After fetching user cart, merge guest cart items
                    if (guestCartItems.length > 0) {
                        const serverCartItems = cartResult.payload?.data || [];
                        const serverVariantIds = new Set(serverCartItems.map(item => item.activevar || item.varient_id));
                        
                        // Filter out items that already exist in server cart
                        const itemsToAdd = guestCartItems.filter(item => {
                            const variantId = item.activevar || item.varid;
                            return !serverVariantIds.has(variantId);
                        });
                        
                        // Add guest cart items to server
                        if (itemsToAdd.length > 0) {
                            try {
                                const syncPromises = itemsToAdd.map(item => {
                                    const cartData = {
                                        product_id: item.id || item.product_id,
                                        user_id: userd.user_id,
                                        varient_id: item.activevar || item.varid,
                                    };
                                    return addCart(cartData);
                                });
                                
                                await Promise.all(syncPromises);
                                
                                // Refresh cart after syncing
                                dispatch(getAllCartsd(userd));
                            } catch (error) {
                                console.error("Error syncing cart items:", error);
                                // Still refresh cart even if some items failed
                                dispatch(getAllCartsd(userd));
                            }
                        }
                    }
                });
                
                dispatch(getWishListd(userd));
                //navigate("/myaccount")
                setloginerrors('');
            }

        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("User Login error:", error);
            }
        });
          
       }
    return (
        <div>
         <BrowserView>
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="login_modal_root"
                dialogClassName="login_modal_dialog"

            >
                <div className="close" style={{position:"relative"}}>
                    <div onClick={function (event) { modalHide(); hideerrorshow() }} style={{ cursor: 'pointer',position:"absolute",right:"8px",top:"9px",zIndex:10000 }}>
                        <img 
                            src="https://img.perniaspopupshop.com/ppus-assets/icons/cross.svg" 
                            alt="Close" 
                            style={{ width: '30px', height: '32px' }} 
                        />
                    </div>
                </div>
                {errors.length > 0 && (
                    <div className="alert alert-danger errors" role="alert" >
                        <ul>
                            {errors.length > 0 && errors?.map((data, index) => (
                                <li key={index}>{data}</li>
                            ))}

                        </ul>
                    </div>
                )}
                {loginerrors && loginerrors != '' && (
                    <div className="alert alert-danger" role="alert">
                        <ul>
                            {loginerrors.email && (
                                <li>{loginerrors.email}</li>
                            )}
                            {loginerrors.password && (
                                <li>{loginerrors.password}</li>
                            )}
                            {loginerrors.error && (
                                <li>{loginerrors.error}</li>
                            )}
                        </ul>
                    </div>

                )}
                {successm && (
                    <div className="alert alert-success" role="alert">
                        {successm}
                    </div>
                )}

                <Modal.Body className='CredentialsModal login'>
                    <div className="layout">
                        <div className="flex xs4 offset-xs1">

                            <div className="layout Login" style={{ display: regShow ? "none" : "flex" }}>
                                <div>
                                    <h3 className="demi-bold p-b-20">LOGIN</h3>
                                    <h4 className="font-normal">For Existing Customers</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-container">
                                            <input name="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                                        </div>
                                        <div className="input-container">
                                            <div className="PasswordField d-flex align-center">
                                                <input name="password" type={type} className="flex p-r-32" value={password}
                                                    onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                                <button className="btn-icon d-flex" type="button" onClick={handlePasswordToggle} title="Show Password">
                                                    <img src={icon} alt="toggle password" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="m-b-10">
                                            <button type="button" onClick={() => forgotPasswordShow()} className="btn-icon ForgotPasswordLink font-normal text-left p-l-0 orat-color-hover">Forgot your password?</button>
                                        </div>
                                        <div className="layout align-center justify-center p-t-5">
                                            <button className='btn-orat-primary flex bold' type='submit' disabled={showloginLoader} >
                                                {!showloginLoader ? "LOGIN" : <RotatingLines color="#FFFFFF" height={30} width={30} />} </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="layout Register" style={{ display: regShow ? "flex" : "none" }}>
                                <div>
                                    <h3 className="demi-bold p-b-20">SIGNUP</h3>
                                    <h4 className="font-normal">To Register a Customer</h4>
                                    <form onSubmit={handleregSubmit}>
                                        <div className="input-container">
                                            <input name="regname" value={regname}
                                                onChange={(e) => setregname(e.target.value)} type="text" placeholder="Name" required />
                                        </div>
                                        <div className="input-container">
                                            <input name="regemail" value={regemail}
                                                onChange={(e) => setregEmail(e.target.value)} type="email" placeholder="Email" required />
                                        </div>
                                        <div className="input-container">
                                            <div className="PasswordField d-flex align-center">
                                                <input name="regpassword" type={typereg} className="flex p-r-32" value={regpassword}
                                                    onChange={(e) => setregPassword(e.target.value)} placeholder="Password" required />
                                                <button className="btn-icon d-flex" type="button" onClick={handleregPasswordToggle} title="Show Password">
                                                    <img src={iconreg} alt="toggle password" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="input-container">
                                            <div className="PasswordField d-flex align-center">
                                                <input name="regcpassword" type={typeregc} className="flex p-r-32" value={regcpassword}
                                                    onChange={(e) => setregcPassword(e.target.value)} placeholder="Confirm Password" required />
                                                <button className="btn-icon d-flex" type="button" onClick={handleregconPasswordToggle} title="Show Password">
                                                    <img src={iconregc} alt="toggle password" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="layout align-center justify-center p-t-5">
                                            <button className='btn-orat-primary flex' type='submit' disabled={showLoader} >
                                                {!showLoader ? "Signup" : <RotatingLines color="#FFFFFF" height={30} width={30} />} </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="flex xs4 offset-xs1 layout xl5">
                            <div className="SocialLoginLinks layout column justify-start">
                                <div>
                                    <h4 className="font-normal ">Log in from Google</h4>
                                    <div className="layout">
                                        <button onClick={() => googleLogin()} className="btn-orat-secondry SocialBtnGoogle flex demi-bold">
                                            <img 
                                                src="https://img.perniaspopupshop.com/ppus-assets/icons/Google__Login__logo_24_02_24.svg" 
                                                alt="Google" 
                                                className="SocialBtnIcon" 
                                                style={{ width: '20px', height: '20px', marginRight: '6px' }} 
                                            />
                                            LOGIN WITH GOOGLE
                                        </button>
                                    </div>
                                </div>
                                {regShow ? (
                                    <div className="layout OtherActions align-end m-t-20">
                                        <p className="font-normal">Already have an account? </p>
                                        <button className="btn-icon font-normal orat-color-hover p-l-5" onClick={() => loginshow()} type="button">Login</button>
                                    </div>
                                ) : (<div className="layout OtherActions align-end m-t-20">
                                    <p className="font-normal">Don't have an account? </p>
                                    <button className="btn-icon font-normal orat-color-hover p-l-5" onClick={() => signupshow()} type="button" style={{ color: '#e83647' }}>
                                        Sign Up
                                    </button>
                                </div>)}
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
            </BrowserView>
            <MobileView>
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="login_modal_root"
                dialogClassName="login_modal_dialog"

            >
                <div className="login_mobile_header">
                    <button
                        type="button"
                        className="login_mobile_header_btn login_mobile_back"
                        onClick={function (event) { modalHide(); hideerrorshow() }}
                        aria-label="Back"
                    >
                        <img
                            src="https://img.perniaspopupshop.com/pwa-assets/icons/back.svg"
                            alt="Back"
                            className="login_mobile_back_icon"
                        />
                    </button>
                    <div className="login_mobile_header_title">{regShow ? "SIGNUP" : "LOGIN"}</div>
                    <div className="login_mobile_header_spacer" />
                </div>
                {errors.length > 0 && (
                    <div className="alert alert-danger errors" role="alert" >
                        <ul>
                            {errors.length > 0 && errors?.map((data, index) => (
                                <li key={index}>{data}</li>
                            ))}

                        </ul>
                    </div>
                )}
                {loginerrors && loginerrors != '' && (
                    <div className="alert alert-danger" role="alert">
                        <ul>
                            {loginerrors.email && (
                                <li>{loginerrors.email}</li>
                            )}
                            {loginerrors.password && (
                                <li>{loginerrors.password}</li>
                            )}
                            {loginerrors.error && (
                                <li>{loginerrors.error}</li>
                            )}
                        </ul>
                    </div>

                )}
                {successm && (
                    <div className="alert alert-success" role="alert">
                        {successm}
                    </div>
                )}

                <Modal.Body className={`CredentialsModal login login_mobile_body ${regShow ? "regModel" :"logModel"}`}>
                    <div className="row justify-content-center">
                        <div className="row">

                            <div className="layout Login" style={{ display: regShow ? "none" : "flex" }}>
                                <div>
                                    <h3 className="demi-bold p-b-20">LOGIN</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-container">
                                            <input name="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                                        </div>
                                        <div className="input-container">
                                            <div className="PasswordField d-flex align-center">
                                                <input name="password" type={type} className="flex p-r-32" value={password}
                                                    onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                                <button className="btn-icon d-flex" type="button" onClick={handlePasswordToggle} title="Show Password">
                                                    <img src={icon} alt="toggle password" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="m-b-10">
                                            <button type="button" onClick={() => forgotPasswordShow()} className="btn-icon ForgotPasswordLink font-normal text-left p-l-0 orat-color-hover">Forgot your password?</button>
                                        </div>
                                        <div className="layout align-center justify-center p-t-5">
                                            <button className='btn-orat-primary flex' type='submit' disabled={showloginLoader} >
                                                {!showloginLoader ? "Login" : <RotatingLines color="#FFFFFF" height={30} width={30} />} </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="layout Register" style={{ display: regShow ? "flex" : "none" }}>
                                <div>
                                    {/* <h3 className="demi-bold p-b-20">SIGNUP</h3>
                                    <h4 className="font-normal">To Register a Customer</h4> */}
                                    <form onSubmit={handleregSubmit}>
                                        <div className="input-container">
                                            <input name="regname" value={regname}
                                                onChange={(e) => setregname(e.target.value)} type="text" placeholder="Name" required />
                                        </div>
                                        <div className="input-container">
                                            <input name="regemail" value={regemail}
                                                onChange={(e) => setregEmail(e.target.value)} type="email" placeholder="Email" required />
                                        </div>
                                        <div className="input-container">
                                            <div className="PasswordField d-flex align-center">
                                                <input name="regpassword" type={typereg} className="flex p-r-32" value={regpassword}
                                                    onChange={(e) => setregPassword(e.target.value)} placeholder="Password" required />
                                                <button className="btn-icon d-flex" type="button" onClick={handleregPasswordToggle} title="Show Password">
                                                    <img src={iconreg} alt="toggle password" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="input-container">
                                            <div className="PasswordField d-flex align-center">
                                                <input name="regcpassword" type={typeregc} className="flex p-r-32" value={regcpassword}
                                                    onChange={(e) => setregcPassword(e.target.value)} placeholder="Confirm Password" required />
                                                <button className="btn-icon d-flex" type="button" onClick={handleregconPasswordToggle} title="Show Password">
                                                    <img src={iconregc} alt="toggle password" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="input-container inpus">
                                            <label className="d-flex" style={{ gap: '8px', alignItems: 'flex-start' }}>
                                                <input type="checkbox" checked={agreeTnC} onChange={(e) => setAgreeTnC(e.target.checked)} required />
                                                <span>I agree to ORAT Shop <a href="/terms-and-conditions" target="_blank" rel="noreferrer">T&Cs</a>.</span>
                                            </label>
                                        </div>
                                        <div className="input-container inpus">
                                            <label className="d-flex" style={{ gap: '8px', alignItems: 'flex-start' }}>
                                                <input type="checkbox" checked={emailUpdates} onChange={(e) => setEmailUpdates(e.target.checked)} />
                                                <span>Send me Email Updates on New Arrivals & Deals.</span>
                                            </label>
                                        </div>
                                        <div className="input-container inpus">
                                            <label className="d-flex" style={{ gap: '8px', alignItems: 'flex-start' }}>
                                                <input type="checkbox" checked={whatsappUpdates} onChange={(e) => setWhatsappUpdates(e.target.checked)} />
                                                <span>Enable WhatsApp Updates.</span>
                                            </label>
                                        </div>
                                        <div className="layout align-center justify-center p-t-5">
                                            <button className='btn-orat-primary flex' type='submit' disabled={showLoader} >
                                                {!showLoader ? "Register" : <RotatingLines color="#FFFFFF" height={30} width={30} />} </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row SocialLoginLinks  justify-start">
                                <div className="col-12">
                                </div>
                                {regShow ? (
                                    <div className="layout OtherActions align-end mt-2">
                                        <p>Already have an account?</p>
                                        <button className="btn-icon font-normal orat-color-hover" onClick={() => loginshow()} type="button">Login</button>
                                    </div>
                                ) : (
                                    <div className="layout OtherActions align-end mt-2">
                                        <p>Don’t have an account?</p>

                                        <button className="btn-icon font-normal orat-color-hover" onClick={() => signupshow()} type="button">
                                            Sign Up
                                        </button>
                                    </div>
                                )}
                                <div className="col-12">
                                    <div className="col-12">
                                        <button onClick={() => googleLogin()} className="btn-orat-secondry SocialBtnGoogle  demi-bold">
                                            <img 
                                                src="https://img.perniaspopupshop.com/ppus-assets/icons/Google__Login__logo_24_02_24.svg" 
                                                alt="Google" 
                                                className="SocialBtnIcon" 
                                                style={{ width: '20px', height: '20px', marginRight: '6px' }} 
                                            />
                                            LOGIN WITH GOOGLE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
            </MobileView>
            

            {
                loading && <ScaleLoader
                    color={color}
                    loading={loading}
                    size={250}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className='my_spanner'
                />
            }
            <ForgotPassword
                showModal={modalShowf}
                modalHide={modalHidef}
            />

        </div>
    )
}

export default LoginModal