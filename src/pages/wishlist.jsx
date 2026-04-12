import React, { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getallWishList } from '../services/User-service';
import Footer from '../components/footer';
import Loader from "../components/Loader";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { removeWishList } from '../services/User-service';
import { removeFromWishListd, getWishListd } from '../Redux/features/wishlist/WishListSlice';
import { EmptyWishList } from '../image';
import { formatPrice } from "../utils/formatPrice";

import { logout } from '../Redux/features/User/userSlice';
import { BrowserView, MobileView } from 'react-device-detect';
function Wishlist() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();
    if (!userInfo) {
        navigate('/');
    }
    const [wishlistArr, setWishlistArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [selectedBtnId, setSelectedBtnId] = useState(-1);
    const getwishlistList = () => {
        const userDetailsd = {
            user_id: userInfo?.data?.user?.id
        }
        getallWishList(userDetailsd)
            .then((data) => {

                setWishlistArr(data.data);
                setLoading(false);

            })
            .catch((error) => {
                console.error("Error fetching wishlist list:", error);
                setLoading(false);
            });
    };
    const removewishlistd = (id, product_id) => {
        setSelectedBtnId(id);
        setShowLoader(true);
        const userDetails = {
            product_id: product_id,
            user_id: userInfo?.data?.user?.id
        }


        removeWishList(userDetails).then((data) => {
            if (data.status) {
                setSelectedBtnId();
                setShowLoader(false);
                dispatch(removeFromWishListd(userDetails))
                toast.success("Removed from wishlist!", {
                    position: "bottom-right",
                });
                setLoading(false);
                dispatch(getWishListd(userDetails));
                getwishlistList();
            }

        }).catch((error) => {
            if (error) {
                setLoading(false);
                console.log("Remove wishlist error:", error);
            }
        })

    };
    const removewishlistdgift = (id, product_id) => {
        setSelectedBtnId(id);
        setShowLoader(true);
        const userDetails = {
            gift_id: product_id,
            user_id: userInfo?.data?.user?.id
        }


        removeWishList(userDetails).then((data) => {
            if (data.status) {
                setSelectedBtnId();
                setShowLoader(false);
                dispatch(removeFromWishListd(userDetails))
                toast.success(data.message, {
                    position: "bottom-right",
                });
                setLoading(false);
                dispatch(getWishListd(userDetails));
                getwishlistList();
            }

        }).catch((error) => {
            if (error) {
                setLoading(false);
                console.log("Remove wishlist error:", error);
            }
        })

    };
    const handleLogout = () => {
        dispatch(logout(userInfo));
        navigate('/'); // Redirect to the login page after logout
    };
    useEffect(() => {
        getwishlistList();
    }, []);
    return (
        loading ? (
            <Loader />
        ) : (
            userInfo ? (
                <>
                    <BrowserView>
                        <div className='App  my-wishlist-mobile'>
                            <div className="AppContent BreakPointContainer">
                                <div className="MyAccountWrapper prel overflow-hidden">
                                    <div className="MyAccountHeader layout align-center">
                                        <div className="layout demi-bold justify-start h4 align-center">
                                            <span> MY ACCOUNT </span>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                                            </div>
                                            <span className="demi-bold">
                                                MY WISHLIST ({wishlistArr?.length || 0} ITEMS)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="MyAccBody layout xs12">
                                        <div className="h5 optionListLineHeight xs3 layout column orat-dark-grey-color">
                                            <Link to="/myaccount" className='cursor-pointer demi-bold orat-black-color'> PERSONAL DETAILS </Link>
                                            <Link to="/orderhistory" className='cursor-pointer demi-bold orat-black-color'> ORDER HISTORY </Link>
                                            <Link to="/addaddress" className='cursor-pointer demi-bold orat-black-color'> MANAGE ADDRESSES </Link>
                                            {/* <Link to="/credits" className='cursor-pointer demi-bold orat-black-color'> MY CREDITS </Link> */}
                                            <Link to="/wishlist" className='cursor-pointer demi-bold orat-color'> MY WISHLIST </Link>
                                            {/*  <Link to="/settings" className='cursor-pointer demi-bold orat-black-color'> SETTINGS </Link> */}
                                            <Link onClick={handleLogout} className='cursor-pointer demi-bold orat-black-color'> LOGOUT </Link>

                                        </div>
                                        <div className="MyAccountPageWrapper flex xs9  prel overflow-hidden">
                                            <div>
                                                <div className="CatalogsearchResult p-t-20 WishListProductsResult">

                                                    {wishlistArr && wishlistArr?.length == 0 ? (
                                                        <>
                                                            <div className="layout column justify-space-between align-center m-t-48 m-b-48">
                                                                <div className="NoStateImage m-b-16">
                                                                    <div className="DynamicHeightLoaderWrapper icon" style={{ paddingTop: '100%' }}>
                                                                        <div className="DynamicHeightLoader layout row align-center justify-center">
                                                                            <img src={EmptyWishList} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h1 className="h1 demi-bold m-b-8">You have no items in your wishlist</h1>
                                                                <Link to="/" className="btn-orat-secondry width-auto text-uppercase">SHOP NOW</Link>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="layout wrap align-start">
                                                            {wishlistArr && wishlistArr?.length > 0 && wishlistArr?.map((data, index) => (
                                                                <div className="flex xs4" key={index}>
                                                                    <div className="ProductCard">

                                                                        <Link to={`/products/productdetails/${data.product_id}`}>
                                                                            <div className="ProductCardImageWrapper">
                                                                                <div className="ProductImageWrapper">
                                                                                    <div className="FirstProductImage">
                                                                                        <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '50%' }}>
                                                                                            <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '100%' }}>
                                                                                                <img src={data.product_thumbail} alt={data.product_title} className='img-resp DynamicHeightLoaderImage' style={{ padding: '0%' }} />
                                                                                            </div>
                                                                                            {/* <div className="animated-bg-placeholder"></div> */}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="HoverProductImage">
                                                                                        <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '50%' }}>
                                                                                            <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '100%' }}>
                                                                                                <img src={data.product_back_image} alt={data.product_title} className='img-resp DynamicHeightLoaderImage' style={{ padding: '0%' }} />
                                                                                            </div>
                                                                                            {/* <div className="animated-bg-placeholder"></div> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                        <div className="ProductCardBottom">
                                                                            <h6 className="ProductCardTitle ellipsis demi-bold">{data.product_title}</h6>
                                                                            <p className="ProductCardDescription p2 ellipsis-two-line">{data.product_short_description}</p>
                                                                            <div>
                                                                                <div className="ProductPrice h6">
                                                                                    <span className="SpecialPrice demi-bold"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{formatPrice((data?.saleprice > 0 ? data?.saleprice : data?.price), { showSymbol: false })}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                {data?.gift_id ? (
                                                                                    <>
                                                                                        <button className="m-t-10 btn-orat-bg-grey full-width" onClick={() => removewishlistdgift(data.gift_id, data.product_id)} {...selectedBtnId === data.id ? `disabled=${showLoader}` : ''}>
                                                                                            {selectedBtnId === data.id ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "REMOVE FROM WISHLIST"}
                                                                                        </button>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <button className="m-t-10 btn-orat-bg-grey full-width" onClick={() => removewishlistd(data.id, data.product_id)} {...selectedBtnId === data.id ? `disabled=${showLoader}` : ''}>
                                                                                            {selectedBtnId === data.id ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "REMOVE FROM WISHLIST"}
                                                                                        </button>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>



                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BrowserView>
                    <MobileView>
                        <div className='App other-page-top my-wishlist-mobile'>
                            <div className="AppContent BreakPointContainer container">
                                <div className="MyAccountWrapper prel overflow-hidden">
                                    <div className="MyAccountHeader layout align-center">
                                        <div className="layout demi-bold justify-start h4 align-center">
                                            <Link to="/">
                                                <FaChevronRight style={{ width: '20px', height: '12px', marginRight: '10px', color: '#000' }} />
                                            </Link>
                                            <span className="demi-bold">MY WISHLIST</span>
                                        </div>
                                    </div>
                                    <div className="wishlist-mobile-grid-wrapper">
                                        {wishlistArr && wishlistArr.length === 0 ? (
                                            <div className="layout column justify-space-between align-center m-t-48 m-b-48">
                                                <div className="NoStateImage m-b-16">
                                                    <div className="DynamicHeightLoaderWrapper icon" style={{ paddingTop: '100%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center">
                                                            <img src={EmptyWishList} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h1 className="h1 demi-bold m-b-8">You have no items in your wishlist</h1>
                                                <Link to="/" className="btn-orat-secondry width-auto text-uppercase">SHOP NOW</Link>
                                            </div>
                                        ) : (
                                            <div className="wishlist-mobile-grid">
                                                {wishlistArr?.map((data) => (
                                                    <div className="wishlist-mobile-card" key={data.id || data.product_id}>
                                                        <button
                                                            type="button"
                                                            className="wishlist-mobile-remove"
                                                            onClick={() => (data?.gift_id ? removewishlistdgift(data.gift_id, data.product_id) : removewishlistd(data.id, data.product_id))}
                                                        >
                                                            ×
                                                        </button>
                                                        <Link to={`/products/productdetails/${data.product_id}`} className="wishlist-mobile-link">
                                                            <div className="wishlist-mobile-image">
                                                                <img src={data.product_thumbail} alt={data.product_title} loading="lazy" />
                                                            </div>
                                                            <div className="wishlist-mobile-info">
                                                                <h6 className="wishlist-mobile-title">{data.product_title}</h6>
                                                                <p className="wishlist-mobile-description">{data.product_short_description}</p>
                                                                <div className="wishlist-mobile-price">
                                                                    <span className="wishlist-mobile-amount">
                                                                        ₹{formatPrice((data?.saleprice > 0 ? data?.saleprice : data?.price), { showSymbol: false })}
                                                                    </span>
                                                                    {data?.discount_amount > 0 || data?.discount_price ? (
                                                                        <span className="wishlist-mobile-discount">
                                                                            {formatPrice(data?.price, { showSymbol: false })}
                                                                        </span>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MobileView>
                    <BrowserView>
                        <Footer />
                    </BrowserView>
                </>
            ) : ''
        )
    )
}

export default Wishlist