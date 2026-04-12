import React, { useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Noorderhistory } from '../image';
import { orderhistory } from '../services/User-service';
import Footer from '../components/footer';
import Loader from "../components/Loader";
import { formatPrice } from "../utils/formatPrice";

import { logout } from '../Redux/features/User/userSlice';
import { BrowserView, MobileView } from 'react-device-detect';

function Orderhistory() {

    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [orderArr, setOrderArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    if (!userInfo) {
        navigate('/');
    }
    const getOrderList = () => {
        const userDetails = {
            user_id: userInfo?.data?.user?.id
        }

        orderhistory(userDetails)
            .then((data) => {

                setOrderArr(data.data);

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching order list:", error);
                setLoading(false);
            });
    };
    const handleLogout = () => {
        dispatch(logout(userInfo));
        navigate('/'); // Redirect to the login page after logout
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        } else {
            getOrderList();
        }
    }, [navigate]);
    return (
        loading ? (
            <Loader />
        ) : (
            <>
                <BrowserView>
                    <div className='App other-page-top my-orderhistory-mobile'>
                        <div className="AppContent BreakPointContainer container">
                            <div className="MyAccountWrapper prel overflow-hidden">
                                <div className="MyAccountHeader layout align-center">
                                    <div className="layout demi-bold justify-start h4 align-center">
                                        <Link to="/myaccount"> <span> MY ACCOUNT </span></Link>
                                        <div className="DynamicHeightLoaderWrapper icon">
                                            <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                                        </div>
                                        <span className="demi-bold">MY ORDERS</span>
                                    </div>
                                </div>
                                <div className="MyAccBody ">
                                    <div className="MyAccountPageWrapper   prel overflow-hidden">
                                        <div className="OrdersWrap show">
                                            <div className="layout justify-space-between align-center">
                                                <div className="h4 demi-bold"> MY ORDERS </div>
                                            </div>
                                            <div className="layout column justify-space-between align-center m-t-48 m-b-48">
                                                {orderArr && orderArr.length == 0 ? (
                                                    <>
                                                        <div className="NoStateImage m-b-16">
                                                            <div className="DynamicHeightLoaderWrapper icon" style={{ paddingTop: '100%' }}>
                                                                <div className="DynamicHeightLoader layout row align-center justify-center">
                                                                    <img src={Noorderhistory} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <h1 className="h1 demi-bold m-b-8">Your closet is empty!</h1>
                                                        <p className="p1 demi-bold m-b-25">Let’s do some shopping.</p>
                                                        <Link to="/" className="btn-orat-secondry width-auto text-uppercase">start shopping</Link>
                                                    </>
                                                ) : (
                                                    <div className="container orderhistryList">
                                                        <div className="row">
                                                            <div className="col-xl-12">
                                                                {orderArr && orderArr.length > 0 && orderArr?.map((data, index) => (
                                                                    <div className="card border shadow-none" key={index}>
                                                                        <div className="card-body">
                                                                            <div>
                                                                                <div className="row border-bottom pb-3">
                                                                                    <div className="col-md-2">
                                                                                        <div className="mt-3">
                                                                                            <p className="text-muted mb-2">Order Number</p>
                                                                                            <h5 className="mb-0 mt-2">{data.order_number}</h5>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-3">
                                                                                        <div className="mt-3">
                                                                                            <p className="text-muted mb-2">Date Placed</p>
                                                                                            <h5 className="mb-0 mt-2">{data.created_at}</h5>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-2">
                                                                                        <div className="mt-3">
                                                                                            <p className="text-muted mb-2">Total Discount</p>
                                                                                            <h5>{formatPrice(data.discount)}</h5>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-2">
                                                                                        <div className="mt-3">
                                                                                            <p className="text-muted mb-2">Total amount</p>
                                                                                            <h5>{formatPrice(data.total_amount)}</h5>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-3">
                                                                                        <div className="mt-3">
                                                                                            <div className="d-flex flex-column flex-lg-row justify-content-end">
                                                                                                <Link to={`${data.invoice_file}`} target='_blank' className="btn btn-sm btn-outline-secondary " >View Invoice</Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='list-unstyled p-l-0 m-t-0 CartItemWrapper'>
                                                                                {data.productslist &&
                                                                                    data.productslist.map((product, pindex) => (
                                                                                        <div className="d-flex align-items-start pt-3" key={pindex}>
                                                                                            <div className="CartItem w-100 mb-0" >
                                                                                                <div className="layout row">
                                                                                                    <div className="layout row">
                                                                                                        <div className="ProductImage xs3 sm1 flex prel">
                                                                                                            <Link to={`/products/productdetails/${product.product_id}`}>
                                                                                                                <img src={product.cover_image} alt={product.product_title} className='overflow-hidden p4' />
                                                                                                            </Link>
                                                                                                        </div>
                                                                                                        <div className="ProductDetails xs6 sm5 flex">
                                                                                                            <div className="Brand text-uppercase bold">{product.product_title}</div>
                                                                                                            <div className="Name bold">{product.product_short_description}</div>
                                                                                                            <div className="Code m-t-10 bold">CODE: {product.sku}</div>
                                                                                                            <div className="dd-wrapper plainDropdown productSizes">
                                                                                                                <div className="Size bold">{product.size}</div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="ProductPricing xs5 sm5 flex text-right layout column justify-space-between">
                                                                                                            <div>
                                                                                                                <div className="layout align-center justify-end">
                                                                                                                    {product.discount_amount > 0 && (
                                                                                                                        <div className="Discount bold m-r-8">
                                                                                                                            {product.discount_type == 'flat' ? `${product.discount_amount} FLAT OFF` : ''}
                                                                                                                            {product.discount_type == 'percentage' ? `${product.discount_amount}% OFF` : ''}
                                                                                                                        </div>
                                                                                                                    )}
                                                                                                                    {product.discount_amount > 0 && (
                                                                                                                        <div className="ActualPrice m-l-0 m-r-8"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{formatPrice(product.price, { showSymbol: false })} </div>
                                                                                                                    )}
                                                                                                                    <div className="DiscountedPrice bold m-l-0"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{formatPrice(product.saleprice, { showSymbol: false })} </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
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
                <div className='App other-page-top my-orderhistory-mobile'>
                    <div className="AppContent BreakPointContainer container">
                        <div className="MyAccountWrapper prel overflow-hidden">
                            <div className="MyAccountHeader layout align-center">
                                <div className="layout demi-bold justify-start h4 align-center">
                                     <Link to="/myaccount"> <span> MY ACCOUNT </span></Link>
                                    <div className="DynamicHeightLoaderWrapper icon">
                                        <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                                    </div>
                                    <span className="demi-bold">MY ORDERS</span>
                                </div>
                            </div>
                            <div className="MyAccBody ">
                              
                                <div className="MyAccountPageWrapper   prel overflow-hidden">
                                    <div className="OrdersWrap show">
                                        <div className="layout justify-space-between align-center">
                                            <div className="h4 demi-bold"> MY ORDERS </div>

                                        </div>
                                        <div className="layout column justify-space-between align-center m-t-48 m-b-48">
                                            {orderArr && orderArr.length == 0 ? (
                                                <>
                                                    <div className="NoStateImage m-b-16">
                                                        <div className="DynamicHeightLoaderWrapper icon" style={{ paddingTop: '100%' }}>
                                                            <div className="DynamicHeightLoader layout row align-center justify-center">
                                                                <img src={Noorderhistory} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h1 className="h1 demi-bold m-b-8">Your closet is empty!</h1>
                                                    <p className="p1 demi-bold m-b-25">Let’s do some shopping.</p>
                                                    <Link to="/" className="btn-orat-secondry width-auto text-uppercase">start shopping</Link>
                                                </>
                                            ) : (
                                                <div className="container orderhistryList">
                                                    <div className="row">
                                                        <div className="col-xl-12">
                                                            {orderArr && orderArr.length > 0 && orderArr?.map((data, index) => (
                                                                <div className="card border shadow-none" key={index}>
                                                                    <div className="card-body">
                                                                        <div>
                                                                            <div className="row border-bottom pb-3">
                                                                                <div className="col-md-2">
                                                                                    <div className="mt-3">
                                                                                        <p className="text-muted mb-2">Order Number</p>
                                                                                        <h5 className="mb-0 mt-2">{data.order_number}</h5>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className="mt-3">
                                                                                        <p className="text-muted mb-2">Date Placed</p>
                                                                                        <h5 className="mb-0 mt-2">{data.created_at}</h5>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <div className="mt-3">
                                                                                        <p className="text-muted mb-2">Total Discount</p>
                                                                                        <h5>{formatPrice(data.discount)}</h5>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <div className="mt-3">
                                                                                        <p className="text-muted mb-2">Total amount</p>
                                                                                        <h5>{formatPrice(data.total_amount)}</h5>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className="mt-3">
                                                                                        <div className="d-flex flex-column flex-lg-row justify-content-end">
                                                                                        <Link to={`${data.invoice_file}`} target='_blank' className="btn btn-sm btn-outline-secondary " >View Invoice</Link></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='list-unstyled p-l-0 m-t-0 CartItemWrapper'>
                                                                            {data.productslist &&
                                                                                data.productslist.map((product, pindex) => (
                                                                                    <div className="d-flex align-items-start pt-3" key={pindex}>
                                                                                        <div className="CartItem w-100 mb-0" >
                                                                                            <div className="layout row">
                                                                                                <div className="layout row">
                                                                                                    <div className="ProductImage xs3 sm1 flex prel">
                                                                                                        <Link to={`/products/productdetails/${product.product_id}`}>
                                                                                                            <img src={product.cover_image} alt={product.product_title} className='overflow-hidden p4' />
                                                                                                        </Link>
                                                                                                    </div>
                                                                                                    <div className="ProductDetails xs6 sm5 flex">
                                                                                                        <div className="Brand text-uppercase bold">{product.product_title}</div>
                                                                                                        <div className="Name bold">{product.product_short_description}</div>
                                                                                                        <div className="Code m-t-10 bold">CODE: {product.sku}</div>
                                                                                                        <div className="dd-wrapper plainDropdown productSizes">
                                                                                                            <div className="Size bold">{product.size}</div>
                                                                                                        </div>
                                                                                                        {/* <div className="Code m-t-10 bold text-uppercase">Delivered on:
                                                                                                            <span className="text-underline">25th of April</span>
                                                                                                        </div> */}
                                                                                                    </div>
                                                                                                    <div className="ProductPricing xs5 sm5 flex text-right layout column justify-space-between">
                                                                                                        <div>
                                                                                                            <div className="layout align-center justify-end">
                                                                                                                {product.discount_amount > 0 && (
                                                                                                                    <div className="Discount bold m-r-8">
                                                                                                                        {product.discount_type == 'flat' ? `${product.discount_amount} FLAT OFF` : ''}
                                                                                                                        {product.discount_type == 'percentage' ? `${product.discount_amount}% OFF` : ''}
                                                                                                                    </div>
                                                                                                                )}
                                                                                                                {product.discount_amount > 0 && (
                                                                                                                    <div className="ActualPrice m-l-0 m-r-8"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{formatPrice(product.price, { showSymbol: false })} </div>
                                                                                                                )}
                                                                                                                <div className="DiscountedPrice bold m-l-0"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{formatPrice(product.saleprice, { showSymbol: false })} </div>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                        <div>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </MobileView>
                <Footer />
            </>
        )
    )
}

export default Orderhistory;