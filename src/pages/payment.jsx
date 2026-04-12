import React, { useState } from 'react'
import { Norton, Visa, Logo, Cartbanner1 } from '../image'
import { MdLockOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    clearCart,
    getTotals
} from '../Redux/features/Cart/CartSlice';
import { ordersuccess } from '../Redux/features/Order/OrderSlice';
import { placeorder } from '../services/Product-service';
import Footer from '../components/footer';
import Loader from "../components/Loader";
import { useNavigate } from 'react-router-dom';
import { getTotalDiscount, getAllCart, geteaddress } from '../services/User-service';
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { getShippingTimeAndDeliveryDate } from '../services/BlueDart-service';
import { formatPrice } from "../utils/formatPrice";

function Payment() {
    const userInfo = useSelector((state) => state.user.userInfo);
    const cart = useSelector((state) => state.cart);

    const [errors, seterror] = useState();
    const [totalAmount, settotalAmount] = useState();
    const [totalPrice, settotalPrice] = useState();
    const [totalDiscount, settotalDiscount] = useState();
    const [cartArr, setCartdetails] = useState([]);
    const [shipAddress, setshipAddress] = useState([]);
    const [billAddress, setbillAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [discountOnTotal, setdiscountOnTotal] = useState();
    const [totaltaxAmount, settotaltaxAmount] = useState();
    const [shippingInfo, setShippingInfo] = useState(null);
    const [loadingShipping, setLoadingShipping] = useState(false);
    const [queryParameters] = useSearchParams();
    const address = queryParameters.get('address');
    const billaddress = queryParameters.get('billaddress');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getTotals(userInfo));
    }, [cart, dispatch]);
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function handlepaynow() {
        setShowLoader(true);
        if (!shipAddress || !shipAddress.address) {
            setShowLoader(false);
            seterror("Please add a shipping address before proceeding.");
            return;
        }
        if (userInfo) {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!res) {
                setShowLoader(false);
                toast.error("Razorpay SDK failed to load. Check your internet connection.", {
                    position: "top-right",
                });
                return;
            }
            const options = {
                key: "rzp_live_R8lbSj2uoUaRGc", // test key rzp_test_feqNGJw6DXnznp  
                amount: totalAmount * 100,
                currency: "INR",
                name: "ORAT",
                description: "ORAT Orders Payment",
                image: { Logo },
                netbanking: true,
                handler: async function (response) {
                    setShowLoader(true);
                    const orderDetails = {
                        cartDetails: cart,
                        user: userInfo.data.user,
                        payment_id: response.razorpay_payment_id,
                        user_address_id: address,
                    }
                    placeorder(orderDetails).then((data) => {
                        setShowLoader(false);
                        dispatch(clearCart());
                        dispatch(getTotals(userInfo)); // Update cart totals immediately
                        dispatch(ordersuccess());
                        toast.success(data.message || "Payment successful! Your order has been placed.", {
                            position: "top-right",
                        });
                        
                        // Redirect to checkout page with success parameter
                        navigate(`/checkout?payment=success&orderId=${data?.data?.id || ''}`);

                    }).catch((error) => {
                        setShowLoader(false);
                        console.error("Order create error:", error);
                        toast.error("Payment successful", {
                            position: "top-right",
                        });
                        navigate(`/checkout`);
                    })
                },
                prefill: {
                    name: userInfo?.data?.user?.name,
                    email: userInfo?.data?.user?.email,
                    contact: userInfo?.data?.user?.phone_no,
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setShowLoader(false);

        } else {
            setShowLoader(false);
            seterror("Please Login to make an order.");
        }
    };
    const gettotaldiscount = () => {
        const userDetailsd = {
            user_id: userInfo?.data?.user?.id,
            carts: cart
        }
        console.log("Payment page - Cart data being sent:", userDetailsd);
        console.log("Payment page - Cart items:", cart?.cartItems);
        
        getTotalDiscount(userDetailsd)
            .then((data) => {
                console.log("Payment page - getTotalDiscount response:", data);
                
                // Check if API returned an error
                if (data.success === false) {
                    console.error("Payment page - API Error:", data.message);
                    // Try to calculate totals manually from cart items as fallback
                    const cartItems = cart?.cartItems || [];
                    if (cartItems.length > 0) {
                        const manualTotal = cartItems.reduce((sum, item) => {
                            const price = parseFloat(item.saleprice || item.price || 0);
                            const quantity = parseInt(item.cartQuantity || 1);
                            return sum + (price * quantity);
                        }, 0);
                        console.log("Payment page - Calculating totals manually:", manualTotal);
                        settotalPrice(manualTotal);
                        settotalAmount(manualTotal);
                        settotalDiscount(0);
                        settotaltaxAmount(0);
                        setdiscountOnTotal(0);
                    } else {
                        // If no cart items, set to 0
                        settotalPrice(0);
                        settotalAmount(0);
                        settotalDiscount(0);
                        settotaltaxAmount(0);
                        setdiscountOnTotal(0);
                    }
                } else {
                    settotaltaxAmount(data.total_tax_amount || 0);
                    setdiscountOnTotal(data.price_slab_discount || 0);
                    settotalAmount(data.total_amount || 0);
                    settotalDiscount(data.total_discount || 0);
                    settotalPrice(data.total_price || 0);
                }
                setLoading(false);

            })
            .catch((error) => {
                console.error("Payment page - Error fetching total discount:", error);
                console.error("Payment page - Error response:", error.response);
                
                // Fallback: calculate totals manually
                const cartItems = cart?.cartItems || [];
                if (cartItems.length > 0) {
                    const manualTotal = cartItems.reduce((sum, item) => {
                        const price = parseFloat(item.saleprice || item.price || 0);
                        const quantity = parseInt(item.cartQuantity || 1);
                        return sum + (price * quantity);
                    }, 0);
                    console.log("Payment page - Fallback: Calculating totals manually:", manualTotal);
                    settotalPrice(manualTotal);
                    settotalAmount(manualTotal);
                    settotalDiscount(0);
                    settotaltaxAmount(0);
                    setdiscountOnTotal(0);
                } else {
                    settotalPrice(0);
                    settotalAmount(0);
                    settotalDiscount(0);
                    settotaltaxAmount(0);
                    setdiscountOnTotal(0);
                }
                setLoading(false);
            });
    };
    const getAddressDetails = () => {
        const userDetailsd = {
            id: address,
        }
        geteaddress(userDetailsd)
            .then((data) => {
                setshipAddress(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching address details:", error);
                setLoading(false);
            });
    };
    // Removed this useEffect - totals are now calculated in getallCartList after cart is loaded
    // useEffect(() => {
    //     gettotaldiscount();
    // }, [])
    const getallCartList = () => {
        const userDetailsd = {
            user_id: userInfo?.data?.user?.id,
            carts: cart
        }
        getAllCart(userDetailsd)
            .then((data) => {
                setCartdetails(data.data);
                
                // After cart is loaded, calculate totals
                // Use the cart data from API to ensure we have the latest
                const cartDataForAPI = {
                    cartItems: data.data || [],
                    cartTotalAmount: 0,
                    cartTotalQuantity: 0,
                };
                
                const userDetailsForDiscount = {
                    user_id: userInfo?.data?.user?.id,
                    carts: cartDataForAPI,
                };
                
                // Calculate totals with the cart data
                getTotalDiscount(userDetailsForDiscount)
                    .then((discountData) => {
                        console.log("Payment page - getTotalDiscount response:", discountData);
                        
                        if (discountData.success === false) {
                            console.error("Payment page - API Error:", discountData.message);
                            // Calculate totals manually
                            const cartItems = cartDataForAPI.cartItems || [];
                            if (cartItems.length > 0) {
                                const manualTotal = cartItems.reduce((sum, item) => {
                                    const price = parseFloat(item.saleprice || item.price || 0);
                                    const quantity = parseInt(item.cartQuantity || 1);
                                    return sum + (price * quantity);
                                }, 0);
                                console.log("Payment page - Calculating totals manually:", manualTotal);
                                settotalPrice(manualTotal);
                                settotalAmount(manualTotal);
                                settotalDiscount(0);
                                settotaltaxAmount(0);
                                setdiscountOnTotal(0);
                            }
                        } else {
                            settotaltaxAmount(discountData.total_tax_amount || 0);
                            setdiscountOnTotal(discountData.price_slab_discount || 0);
                            settotalAmount(discountData.total_amount || 0);
                            settotalDiscount(discountData.total_discount || 0);
                            settotalPrice(discountData.total_price || 0);
                        }
                    })
                    .catch((error) => {
                        console.error("Payment page - Error in getTotalDiscount:", error);
                        // Fallback: calculate manually
                        const cartItems = cartDataForAPI.cartItems || [];
                        if (cartItems.length > 0) {
                            const manualTotal = cartItems.reduce((sum, item) => {
                                const price = parseFloat(item.saleprice || item.price || 0);
                                const quantity = parseInt(item.cartQuantity || 1);
                                return sum + (price * quantity);
                            }, 0);
                            settotalPrice(manualTotal);
                            settotalAmount(manualTotal);
                            settotalDiscount(0);
                            settotaltaxAmount(0);
                            setdiscountOnTotal(0);
                        }
                    });

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching carts list:", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        getallCartList();
        getAddressDetails();
    }, [])

    return (
        loading ? (
            <Loader />
        ) : (
            <>
                <div className='App other-page-top mobile_payment_page'>
                    <div className="BreakPointContainer AppContent">

                        <div className="CartPage CheckoutPage">
                            <div className="CartWrapper">

                                <div className="layout CartWrapperContent justify-center responsive">
                                    <div className="CheckoutSteps CartWrapperContentLeft">
                                        {errors &&
                                            (
                                                <>
                                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                        {errors}
                                                    </div>
                                                </>
                                            )}
                                        <div className="StepsUserDetails CheckoutStep">
                                            <div className="CheckoutStepHeader layout align-center justify-space-between">
                                                <div className="layout align-center">
                                                    <h4 className='h4 Fade mb-0'> 1. USER DETAILS </h4>
                                                    <div className="p3 bold m-l-12 UserEmailAddress ellipsis orat-dark-grey-color">{userInfo?.data?.user?.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="StepsShippingAddress CheckoutStep">
                                            <div className="CheckoutStepHeader layout align-center justify-space-between">
                                                <div className="layout align-center">
                                                    <div className="h4 Fade mb-0">2. SHIPPING &amp; BILLING INFO</div>
                                                    {shipAddress && shipAddress.address ? (
                                                        <div className="layout m-l-10 m-r-20">
                                                            <div className="p3 bold ellipsis ShippingAddressTag">{shipAddress.address},{shipAddress.city},{shipAddress.state}</div>
                                                        </div>
                                                    ) : (
                                                        <div className="layout m-l-10 m-r-20">
                                                            <div className="p3 bold ellipsis ShippingAddressTag" style={{color: 'red'}}>
                                                                No shipping address found. <Link to="/address">Add Address</Link>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <Link to="/address" className="btn-icon p3 bold orat-color-hover">Change</Link>
                                            </div>
                                        </div>
                                        <div className="PaymentMethodsStep CheckoutStep">
                                            <div className="CheckoutStepHeader layout align-center justify-space-between active">
                                                <div>
                                                    <div className="h4 mb-0">3. PAYMENT METHOD</div>
                                                </div>
                                            </div>
                                            <div className="CheckoutStepContent prel p-t-10">
                                                {/* <div className="PaymentMethodsList layout wrap">
                                                <div className="layout wrap">
                                                    <div className="flex xs6">
                                                        <div className="PaymentMethod">
                                                            <h5>NETBANKING</h5>
                                                            <span className="TicBox"></span>
                                                        </div>
                                                    </div>
                                                    <div className="flex xs6">
                                                        <div className="PaymentMethod">
                                                            <h5>CREDIT / DEBIT CARD</h5>
                                                            <span className="TicBox"></span>
                                                        </div>
                                                    </div>
                                                    <div className="flex xs6">
                                                        <div className="PaymentMethod">
                                                            <h5>UPI</h5>
                                                            <span className="TicBox"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                                <div className="PaymentMethodsAction p-t-25 m-t-25 m-l-12 m-r-12">
                                                    <div className="layout justify-space-between align-center">
                                                        <div className="layout column flex xs12 sm7">
                                                            <div className="layout align-center justify-start m-r-12">
                                                                <div className="small PslCheckbox flex">
                                                                    <label>
                                                                        <input type="checkbox" className="PslCheckboxInput" checked />
                                                                        <span className="PslCheckboxCheckmark"></span>
                                                                        <div className="PslCheckboxText withLink m-r-5 m-l-5 ellipsis">I understand and agree to ORAT SHOP
                                                                            <Link to="/terms-and-conditions" target='_blank'><span className="orat-color-hover btn-tandc btn-icon bold text-underline">T&amp;C</span></Link>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="layout flex xs6 sm5">
                                                            <button className="flex m-l-12 bold btn-orat-primary" onClick={handlepaynow} disabled={showLoader || !shipAddress || !shipAddress.address}>
                                                                {!showLoader ? "PAY NOW" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="m-t-25 m-b-25 layout align-center justify-end">
                                                <div className="layout align-center PaymentMethodIcons">
                                                    <div className="flex xs5">
                                                        <div className="layout align-center">
                                                            <img src={Norton} alt="logo" />
                                                            <MdLockOutline />
                                                            <div className="p3 bold orat-dark-grey-color m-l-5">SECURE CHECKOUT</div>
                                                        </div>
                                                    </div>
                                                    <div className="layout align-center PaymentMethodIcons justify-end justify-sm-none">
                                                        <img src="https://res.cloudinary.com/dgif730br/image/upload/v1764402481/Payment_options_tsgyn5.jpg" alt="Payment Options" className='payment-options-img' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="CartSummaryWrap CartWrapperContentRight CartWrapperContentRight">
                                        {/* <Pricesummary/> */}
                                        <div className="CartWrapperContentRightContent">
                                            <h4>CART SUMMARY</h4>
                                            <div className="CartSummary">
                                                <div className="CartTotal bold">
                                                    <span>Cart Total</span>
                                                    <span className="float-right">{formatPrice(totalPrice)}</span>
                                                </div>
                                                <div className="Shipping bold layout justify-space-between">
                                                    <span>
                                                        <p>Total Discount</p>
                                                    </span>
                                                    <span className="float-right">(-) {formatPrice(totalDiscount)}</span>
                                                </div>
                                                {discountOnTotal > 0 ? (
                                                    <>
                                                        <div className="Shipping bold layout justify-space-between">
                                                            <span><p>Discount on Total Amount</p></span>
                                                            <span className="float-right">(-) {formatPrice(discountOnTotal)}</span>
                                                        </div>
                                                    </>
                                                ) : ''}
                                                <div className="Shipping bold">
                                                    <span>Shipping</span>
                                                    <span className="float-right">{formatPrice(0)}</span>
                                                </div>
                                                {totaltaxAmount > 0 ? (
                                                    <>
                                                    <div className="Shipping bold layout justify-space-between mt-2">
                                                        <span><p>Tax</p></span>
                                                        <span className="float-right">(+) {formatPrice(totaltaxAmount)}</span>
                                                    </div>
                                                    </>
                                            ) : ''}
                                                <div className="TotalWrapper">
                                                    <span className="Total bold">TOTAL PAYABLE</span>
                                                    <span className="float-right bold">{formatPrice(totalAmount)}</span>
                                                </div>
                                            </div>
                                            {/* <div className="LoyaltyEarnPoints layout align-center">
                                            <img src={Loyalty} alt='logo' />
                                            <p>You are earning <span className="bold">18490 Points</span> on this transaction</p>
                                        </div> */}
                                            <div className="LoyaltyEarnPoints m-t-10 m-b-10 layout align-center">
                                                <div className="PslCheckbox flex">
                                                    <label>
                                                        <input type="checkbox" className="PslCheckboxInput" />
                                                        <span className="PslCheckboxCheckmark"></span>
                                                        <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">This is a gift item</span>
                                                    </label>
                                                </div>
                                                <Link href="" className='font-normal h6 cursor-pointer'> (Know More) </Link>
                                            </div>

                                            <div className="ProductSummary CartSummaryWrap">
                                                <h4>PRODUCT SUMMARY</h4>
                                                <ul className='list-unstyled p-l-0 m-t-0 CartItemWrapper'>
                                                    {cartArr &&
                                                        cartArr.map((cartItem) => (
                                                            <li className="CartItem" key={cartItem.id}>
                                                                <div className="layout">
                                                                    <div className="ProductImage">
                                                                        <img src={cartItem.cover_image} alt={cartItem.product_title} className='overflow-hidden p4' />
                                                                    </div>
                                                                    <div>
                                                                        <div className="ProductDetails flex m-l-12">
                                                                            <div className="Brand text-uppercase bold">{cartItem.product_title}</div>
                                                                            <div className="Name bold">{cartItem.product_short_description}</div>
                                                                            <div className="ProductPricing">
                                                                                <div className="layout align-center">
                                                                                    <div className="DiscountedPrice bold m-l-0"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{formatPrice(cartItem.saleprice, { showSymbol: false })} </div>
                                                                                </div>
                                                                            </div>
                                                                            {cartItem.envpriceid && cartItem.size &&(
                                                                            <div className="Size bold">{cartItem.size}</div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    )
}

export default Payment;