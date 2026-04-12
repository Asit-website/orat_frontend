// import React, { useState, useEffect } from 'react';
// import Trending from '../components/trending';
// import Recently from '../components/recently';
// import Complete from '../components/complete';
// import { Emptycart } from '../image';
// import { Link, useNavigate } from 'react-router-dom';
// import Footer from '../components/footer';
// import Loader from "../components/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { Razorpay } from '../image';
// import { FaHeart, FaRegHeart, FaWhatsapp } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import { getAllCartsd, changeSizeintoCart } from '../Redux/features/Cart/CartSlice';
// import { getWishListd } from '../Redux/features/wishlist/WishListSlice';
// import {
//   addWishList, getallWishList, removeWishList,
//   getAllCart, getTotalDiscount, removeCart, changeProductSize
// } from '../services/User-service';
// import { RotatingLines } from "react-loader-spinner";
// import { toast } from "react-toastify";

// function Checkout() {
//   const cart = useSelector((state) => state.cart);
//   const userInfo = useSelector((state) => state.user.userInfo);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [totalAmount, settotalAmount] = useState();
//   const [totalPrice, settotalPrice] = useState();
//   const [totalDiscount, settotalDiscount] = useState();
//   const [discountOnTotal, setdiscountOnTotal] = useState();
//   const [totaltaxAmount, settotaltaxAmount] = useState();
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [wishlisticon, setwishlisticon] = useState('');
//   const [selectedBtnId, setSelectedBtnId] = useState([]);
//   const [cartArr, setCartdetails] = useState([]);
//   const [selectedSizeId, setSelectedeSizeId] = useState(-1);
//   const [couponCode, setcouponCode] = useState('');
//   const [showcoLoader, setShowcoLoader] = useState(false);
//   const [showcoerror, setshowcoerror] = useState(false);
//   const [errormsg, seterrormsg] = useState('');
//   const [showRemove, setshowRemove] = useState(false);
//   console.log(errormsg);

//   if (!userInfo) {
//     navigate('/');
//   }
//   const dispatch = useDispatch();
//   const removeCouponCode = () => {
//     setShowcoLoader(true);
//     setshowRemove(false);
//     const userDetailsd = {
//       user_id: userInfo?.data?.user?.id,
//       carts: cart,
//       removeCoupon:1
//     }

//     getTotalDiscount(userDetailsd)
//       .then((data) => {
//         settotaltaxAmount(data.total_tax_amount);
//         setdiscountOnTotal(data.price_slab_discount);
//         settotalAmount(data.total_amount);
//         settotalDiscount(data.total_discount);
//         settotalPrice(data.total_price);
//         setLoading(false);
//         setShowcoLoader(false);
//         if(data.couponapplied!=''){
//         setcouponCode(data.couponapplied);
//         setshowRemove(true);
//        }
//        setcouponCode('');

//       })
//       .catch((error) => {
//         console.error("Error fetching wishlist list:", error);
//         setLoading(false);
//       });

//   };

  
//   const applyCouponCode = () => {
//     if (couponCode != '') {
//       setShowcoLoader(true);
//       const userDetailsd = {
//         user_id: userInfo?.data?.user?.id,
//         carts: cart,
//         couponCode: couponCode,
//       }
//       getTotalDiscount(userDetailsd)
//         .then((data) => {
//           if (data.success) {
//             settotaltaxAmount(data.total_tax_amount);
//             setdiscountOnTotal(data.price_slab_discount);
//             settotalAmount(data.total_amount);
//             settotalDiscount(data.total_discount);
//             settotalPrice(data.total_price);
//             setLoading(false);
//             setShowcoLoader(false);
//             setshowRemove(true);
//             setshowcoerror(false);
//             seterrormsg('');
//           } else {
//             setShowcoLoader(false);
//             setshowcoerror(true);
//             seterrormsg(data.message);
//           }

//         })
//         .catch((error) => {
//           console.error("Error fetching wishlist list:", error);
//           setLoading(false);
//           setShowcoLoader(false);
//         });
//     } else {
//       setshowcoerror(true);
//       seterrormsg("Please enter coupon code.");
//     }
//   };

//   const gettotaldiscount = () => {
//     const userDetailsd = {
//       user_id: userInfo?.data?.user?.id,
//       carts: cart
//     }

//     getTotalDiscount(userDetailsd)
//       .then((data) => {
//         settotaltaxAmount(data.total_tax_amount);
//         setdiscountOnTotal(data.price_slab_discount);
//         settotalAmount(data.total_amount);
//         settotalDiscount(data.total_discount);
//         settotalPrice(data.total_price);
//         setLoading(false);
//         setShowcoLoader(false);
//         if(data.couponapplied!=''){
//         setcouponCode(data.couponapplied);
//         setshowRemove(true);
//        }

//       })
//       .catch((error) => {
//         console.error("Error fetching wishlist list:", error);
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     gettotaldiscount();
//   }, [])

//   const toggleDropdown1 = (varientID) => {
//     setDropdownVisible(!isDropdownVisible);
//     setSelectedeSizeId(varientID);
//   };

//   const handlewishlist = (cartItem) => {

//     setLoading(true);
//     const userDetails = {
//       product_id: cartItem?.id,
//       gift_id:cartItem?.gift_id,
//       user_id: userInfo?.data?.user?.id
//     }

//     addWishList(userDetails).then((data) => {
//       if (data.status) {

//         setLoading(false);
//         setwishlisticon(true);
//         dispatch(getWishListd(userDetails));
//         selectedBtnId.push(cartItem.id);
//         toast.success(data.message, {
//           position: "bottom-right",
//         });
//       }

//     }).catch((error) => {
//       if (error) {
//         setLoading(false);
//         console.log("Add wishlist error:", error);
//       }
//     })

//   };
//   const removewishlist = (cartItem) => {

//     setLoading(true);
//     const userDetails = {
//       product_id: cartItem?.id,
//       gift_id:cartItem?.gift_id,
//       user_id: userInfo?.data?.user?.id
//     }

//     removeWishList(userDetails).then((data) => {
//       if (data.status) {
//         setLoading(false);
//         setwishlisticon(false);
//         const newWishlistd = selectedBtnId.filter(
//           (product) => product !== cartItem.id
//         );
//         setSelectedBtnId(newWishlistd);
//         dispatch(getWishListd(userDetails));
//         toast.success(data.message, {
//           position: "bottom-right",
//         });
//       }

//     }).catch((error) => {
//       if (error) {
//         setLoading(false);
//         console.log("Remove wishlist error:", error);
//       }
//     })

//   };

//   const handleRemoveFromCart = (product) => {
//     setLoading(true);

//   const userDetails = {
//     product_id: product?.id,
//     user_id: userInfo?.data?.user?.id,
//     varient_id: product?.activevar,
//     gift_id:product?.gift_id
//   }

//     removeCart(userDetails).then((data) => {
//       if (data.status) {

//         dispatch(getAllCartsd(userDetails));
//         gettotaldiscount();
//         getallCartList();
//         setLoading(false);
//         toast.success(data.message, {
//           position: "bottom-right",
//         });
//       }

//     }).catch((error) => {
//       if (error) {
//         setLoading(false);
//         console.log("Remove cart error:", error);
//       }
//     })

//   };

//   const handleProductSize = (varient_id, old_varient_id) => {

//     setLoading(true);
//     const userDetails = {
//       user_id: userInfo?.data?.user?.id,
//       varient_id: varient_id,
//       old_varient_id: old_varient_id
//     }

//     changeProductSize(userDetails).then((data) => {
//       if (data.success) {
//         setSelectedeSizeId(varient_id);
//         setDropdownVisible(!isDropdownVisible);
//         dispatch(changeSizeintoCart(varient_id));
//         window.location.reload();
//       } else {
//         setLoading(false);
//         toast.error(data.message, {
//           position: "bottom-right",
//         });
//       }

//     }).catch((error) => {
//       if (error) {
//         setLoading(false);
//         console.log("Remove cart error:", error);
//       }
//     })

//   };

//   const getwishlistList = () => {
//     const userDetailsd = {
//       user_id: userInfo?.data?.user?.id
//     }
//     getallWishList(userDetailsd)
//       .then((data) => {

//         setSelectedBtnId(data.productsList);
//         setLoading(false);

//       })
//       .catch((error) => {
//         console.error("Error fetching wishlist list:", error);
//         setLoading(false);
//       });
//   };
//   const getallCartList = () => {
//     const userDetailsd = {
//       user_id: userInfo?.data?.user?.id,
//       carts: cart
//     }
//     getAllCart(userDetailsd)
//       .then((data) => {
//         setCartdetails(data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching carts list:", error);
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     getallCartList();
//   }, [])
//   useEffect(() => {
//     if (userInfo) {
//       getwishlistList();

//     }
//   }, [])

//   return (
//     loading ? (
//       <Loader />
//     ) : (
//       <>

//         <div className='App other-page-top mobile_checkout'>
//           <div className="CartPage">
//             {cartArr && cartArr.length > 0 ? (
//               <div className="CartWrapper">
//                 <div className="layout CartWrapperContent align-start justify-center mobile_ba">
//                   <div className="ShoppingCart CartWrapperContentLeft">
//                     <div>
//                       <div>
//                         <h4>YOUR SHOPPING CART</h4>
//                         <ul className='list-unstyled p-l-0 m-t-0 CartItemWrapper'>
//                           {cartArr &&
//                             cartArr.map((cartItem) => (
//                               <li className="CartItem" key={cartItem.id}>
//                                 <div className="layout row">
//                                   <div className="layout row">
//                                     <div className="ProductImage xs2 sm2 flex prel">
//                                       <Link to={`/products/productdetails/${cartItem.id}`}>
//                                         <img src={cartItem.cover_image} alt={cartItem.product_title} className='overflow-hidden p4' />
//                                       </Link>
//                                     </div>
//                                     <div className="ProductDetails xs5 sm5 flex">
//                                       <div className="Brand text-uppercase bold">{cartItem.product_title}</div>
//                                       <div className="Name bold">{cartItem.product_short_description}</div>
//                                       <div className="Code m-t-10 bold">CODE: {cartItem.sku}</div>
//                                       {cartItem.envpriceid && (
//                                         <>
//                                       <div className="dd-wrapper plainDropdown cartItemSizes">
//                                         <div className="dd-header" onClick={() => toggleDropdown1(cartItem.envpriceid)}>
//                                           <div className="dd-header-sort-text cartItemSizesHeader demi-bold"> Size: {cartItem.size} </div>
//                                           <span className={`arrow-icon m-r-5 ${selectedSizeId == cartItem.envpriceid && isDropdownVisible ? 'arrow-up-icon' : 'arrow-down-icon'}`}></span>
//                                         </div>
//                                         {selectedSizeId == cartItem.envpriceid && isDropdownVisible && (
//                                           <ul className='dd-list bold'>
//                                             {cartItem.productvariants.length > 0 && (
//                                               cartItem.productvariants.map((data, index) => (
//                                                 <li className='dd-list-item font-normal' key={index} onClick={() => handleProductSize(data?.varid, cartItem?.activevar)}>{data?.size}</li>
//                                               )))}
//                                           </ul>
//                                         )}
//                                       </div>
//                                       </>
//                                       )}
//                                       {cartItem.envpriceid && (
//                                         <>
//                                       {/* <div className="Code m-t-10 bold text-uppercase">estimated shipping date :
//                                         <span className="text-underline">25th of April</span>
//                                       </div> */}
//                                       </>
//                                       )}
//                                     </div>
//                                     <div className="ProductPricing xs5 sm5 flex text-right layout column justify-space-between">
//                                       <div>
//                                         <div className="layout align-center justify-end">
//                                          {cartItem.discount_type && (
//                                           <div className="Discount bold m-r-8">
//                                             {cartItem.discount_type == 'flat' ? `${cartItem.discount_amount} FLAT OFF` : ''}
//                                             {cartItem.discount_type == 'percentage' ? `${cartItem.discount_amount}% OFF` : ''}
//                                           </div>
//                                          )}
//                                          {!cartItem.gift_id && (
//                                         <>
//                                           <div className="ActualPrice m-l-0 m-r-8"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{cartItem.price} </div>
//                                           </>
//                                          )}
//                                           <div className="DiscountedPrice bold m-l-0"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{cartItem.saleprice} </div>
//                                         </div>
//                                         {/* <div className="layout align-center justify-end">
//                                           <div>
//                                             <div className="LoyaltyPoints bold layout align-center">
//                                               <span>EARN 9245 POINTS</span>
//                                             </div>
//                                           </div>
//                                         </div> */}
//                                       </div>
//                                       <div></div>
//                                       <div className="ActionButton">
//                                         <span className='Wishlist'>

//                                           {selectedBtnId.includes(cartItem.id) ?
//                                             <button className=" btn-icon ProductToWishlist flex " onClick={() => removewishlist(cartItem)} >
//                                               <FaHeart />
//                                             </button>
//                                             :
//                                             <button className=" btn-icon ProductToWishlist flex " onClick={() => handlewishlist(cartItem)} >

//                                               <FaRegHeart />
//                                             </button>
//                                           }
//                                         </span>

//                                         <span className='Remove' onClick={() => handleRemoveFromCart(cartItem)} style={{cursor:'pointer'}}>
//                                           <IoMdClose />
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </li>
//                             ))}
//                         </ul>
//                         <div className="layout align-start justify-end">
//                           <img src={Razorpay} alt="logo" style={{ width: '20%' }} className='razorpay' />
//                         </div>
//                         <div className="layout justify-space-between Instructions m-t-25 m-b-25 p-b-25">
//                           <div>
//                             <div>
//                               <p>*Once your order has been placed no subsequent changes can be made in it.</p>
//                               <p>*Shipping cost may vary depending on the delivery destination.</p>
//                               <p>*Please check the final amount on the order summary page before completing the payment.</p>
//                               <p>*An item's price may vary according to the size selected.</p>
//                             </div>
//                             <div className="m-t-10">
//                               <Link to='/shipping-information' target='_blank' className='bold orat-color-hover'> SHIPPING POLICY </Link>
//                               <Link to='/how-to-shop' target='_blank' className='bold orat-color-hover'> HELP </Link>
//                               <Link to='/contact' target='_blank' className='bold orat-color-hover'> CONTACT US </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="CartSummaryWrap CartWrapperContentRight">
//                     <div>
//                       <div className="CartWrapperContentRightContent">
//                         <h4>CART SUMMARY</h4>
//                         <div className="CartSummary">
//                           <div className="CartTotal bold">
//                             <span>Cart Total</span>
//                             <span className="float-right"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{totalPrice}</span>
//                           </div>
//                           <div className="Shipping bold layout justify-space-between">
//                             <span><p>Total Discount</p></span>
//                             <span className="float-right">(-) <i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{totalDiscount}</span>
//                           </div>
//                           {discountOnTotal > 0 ? (
//                             <>
//                               <div className="Shipping bold layout justify-space-between">
//                                 <span><p>Discount on Total Amount</p></span>
//                                 <span className="float-right">(-) <i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{discountOnTotal}</span>
//                               </div>
//                             </>
//                           ) : ''}

//                           {/* <div className="Shipping bold m-b-0">
//                             <span>Shipping</span>
//                             <span className="float-right"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i>0</span>
//                           </div>
//                           <p className="h7 demi-bold">Shipping charges to be calculated on Checkout</p> */}

//                           {totaltaxAmount > 0 ? (
//                             <>
//                               <div className="Shipping bold layout justify-space-between mt-2">
//                                 <span><p>Tax</p></span>
//                                 <span className="float-right">(+) <i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{totaltaxAmount}</span>
//                               </div>
//                             </>
//                           ) : ''}
//                         </div>

//                         {/* <div className="LoyaltyEarnPoints layout align-center">
//                           <img src={Loyalty} alt='logo' />
//                           <p>You are earning <span className="bold">18490 Points</span> on this transaction</p>
//                         </div> */}
//                         {/* <div className="LoyaltyEarnPoints m-t-10 m-b-10 layout align-center">
//                           <div className="PslCheckbox flex">
//                             <label>
//                               <input type="checkbox" className="PslCheckboxInput" />
//                               <span className="PslCheckboxCheckmark"></span>
//                               <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">This is a gift item</span>
//                             </label>
//                           </div>
//                           <Link href="" className='font-normal h6 cursor-pointer'> (Know More) </Link>
//                         </div> */}
//                         <div className="PromoCodeWrapper">
//                           <h4>COUPON CODE</h4>
//                           <div className="ApplyPromoCode m-b-25">
//                             <div className="layout">
//                               {showRemove ? (
//                                 <>
//                                   <input type='text' placeholder="Enter Coupon Code" readOnly value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />

//                                   <button className="btn-orat-primary bold" onClick={() => removeCouponCode()} type="button" disabled={showCoLoader}>
//                                     {!showCoLoader ? "REMOVE" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
//                                   </button>
//                                 </>
//                               ) : (
//                               <>
//                                 <input type='text' placeholder="Enter Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />

//                                 <button className="btn-orat-primary bold" onClick={() => applyCouponCode()} type="button" disabled={showCoLoader}>
//                                   {!showCoLoader ? "APPLY" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
//                                 </button>
//                                 </>
//                               )}
//                             </div>
//                             {showCoError && (
//                               <div>
//                                 <p className="error-msg">{errorMsg}</p>
//                                 <p className="p2 m-t-5">Need More Assistance. Whatsapp Us at
//                                   <span className="orat-black-color">
//                                     <a href="#" className="orat-color">+91 9147072827</a>
//                                   </span>
//                                 </p>
//                               </div>
//                             )}
//                             {couponSuccessMsg && !showCoError && (
//                               <p className="success-msg m-t-5">{couponSuccessMsg}</p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="TotalWrapper">
//                           <span className="Total bold">TOTAL PAYABLE</span>
//                           <span className="float-right ex-bold TotalAmount">₹{totalAmount}</span>
//                         </div>
//                         <div className="Buttons">
//                           <Link to="/address"> <button className="btn-orat-primary bold">  PROCEED TO CHECKOUT </button> </Link>
//                           <Link to="/"> <button className="btn-orat-secondry bold">CONTINUE SHOPPING</button> </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             ) : (
//               <div className="emptyCartWrapper layout column align-center justify-center full-height m-t-25 p-t-25">
//                 <img className="cursor-pointer" src={Emptycart} />
//                 <h4 className="m-t-20 demi-bold">Your Shopping Cart is Empty</h4>
//                 <h6 className="font-normal">You have no items in your cart</h6>
//                 <Link className="m-t-25 h5 demi-bold btn-orat-secondry" to="/">CONTINUE SHOPPING</Link>
//               </div>
//             )}
//             {cartArr && cartArr.length > 0 && <Trending />}
//             <Recently />
//             <Complete />
//           </div>
//         </div>
//         <Footer />
//       </>
//     )
//   );
// }

// export default Checkout;

import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Emptycart, Razorpay } from "../image";
import Footer from "../components/footer";
import Loader from "../components/Loader";
import Trending from "../components/trending";
import Recently from "../components/recently";
import Complete from "../components/complete";
import {
  addWishList,
  getallWishList,
  removeWishList,
  getAllCart,
  getTotalDiscount,
  removeCart,
  changeProductSize,
} from "../services/User-service";
import {
  getAllCartsd,
  changeSizeintoCart,
  updatecartCount,
  removeFromCart,
  getTotals,
  setCartItems,
} from "../Redux/features/Cart/CartSlice";
import { getWishListd } from "../Redux/features/wishlist/WishListSlice";
import LoginModal from "../components/loginmodal";
import Alerts from "../components/Alerts";
import { formatPrice } from "../utils/formatPrice";

function Checkout() {
  // State Management
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState();
  const [discountOnTotal, setDiscountOnTotal] = useState();
  const [totalTaxAmount, setTotalTaxAmount] = useState();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [wishlistIcon, setWishlistIcon] = useState("");
  const [selectedBtnId, setSelectedBtnId] = useState([]);
  const [cartArr, setCartDetails] = useState([]);
  const [selectedSizeId, setSelectedSizeId] = useState(-1);
  const [couponCode, setCouponCode] = useState("");
  const [showCoLoader, setShowCoLoader] = useState(false);
  const [showCoError, setShowCoError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showRemove, setShowRemove] = useState(false); // Added missing state
  const [couponSuccessMsg, setCouponSuccessMsg] = useState("");
  const [couponItemStatus, setCouponItemStatus] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState("");
  // Mobile remove bottom sheet state
  const [removeSheetOpen, setRemoveSheetOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);

  // Redux and Navigation
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPayable = useMemo(() => {
    const cartTotal = Number(totalPrice) || 0;
    const discount = Number(totalDiscount) || 0;
    const slabDiscount = Number(discountOnTotal) || 0;
    const tax = Number(totalTaxAmount) || 0;
    const payable = cartTotal - discount - slabDiscount + tax;
    return payable > 0 ? payable : 0;
  }, [totalPrice, totalDiscount, discountOnTotal, totalTaxAmount]);

  const isRealDiscounted = (item) => {
    const amount = Number(item?.discount_amount) || 0;
    const price = Number(item?.price) || 0;
    const sale = Number(item?.saleprice) || 0;
    return amount > 0 && price > 0 && sale > 0 && price > sale;
  };

  const buildCouponItemStatus = (items, code) => {
    if (!code || !Array.isArray(items)) return {};
    const nextStatus = {};
    items.forEach((item) => {
      nextStatus[item?.id] = isRealDiscounted(item) ? "not_applicable" : "applied";
    });
    return nextStatus;
  };

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("orat_coupon_status");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.code && parsed?.statusMap) {
        setCouponItemStatus(parsed.statusMap);
        if (!couponCode) {
          setCouponCode(parsed.code);
          setShowRemove(true);
        }
      }
    } catch (e) {
      // ignore
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!couponSuccessMsg && !errorMsg) return;
    const timer = setTimeout(() => {
      setCouponSuccessMsg("");
      setErrorMsg("");
      setShowCoError(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [couponSuccessMsg, errorMsg]);

  // console.log("cart", cart);

  // Helper Functions
  const getUserDetails = () => ({
    user_id: userInfo?.data?.user?.id,
    carts: cart,
  });

  const getTotalDiscountData = (userDetails, removeCoupon = false) => {
    if (removeCoupon) userDetails.removeCoupon = 1;
    setShowCoLoader(true);
    setShowRemove(false); // Correct reference
    setCouponSuccessMsg("");

    console.log("getTotalDiscountData called with:", userDetails);
    console.log("Cart items in userDetails:", userDetails.carts?.cartItems);
    console.log("Cart items length:", userDetails.carts?.cartItems?.length);

    getTotalDiscount(userDetails)
      .then((data) => {
        console.log("getTotalDiscount response:", data);
        console.log("total_price:", data.total_price);
        console.log("total_amount:", data.total_amount);
        console.log("success:", data.success);
        console.log("message:", data.message);

        // Check if API returned an error
        if (data.success === false) {
          console.error("API Error:", data.message);
          // Try to calculate totals manually from cart items as fallback
          const cartItems = userDetails.carts?.cartItems || [];
          if (cartItems.length > 0) {
            const manualTotal = cartItems.reduce((sum, item) => {
              const price = parseFloat(item.saleprice || item.price || 0);
              const quantity = parseInt(item.cartQuantity || 1);
              return sum + (price * quantity);
            }, 0);
            console.log("Calculating totals manually:", manualTotal);
            setTotalPrice(manualTotal);
            setTotalAmount(manualTotal);
            setTotalDiscount(0);
            setTotalTaxAmount(0);
            setDiscountOnTotal(0);
          }
        } else {
          setTotalTaxAmount(data.total_tax_amount || 0);
          setDiscountOnTotal(data.price_slab_discount || 0);
          setTotalAmount(data.total_amount || 0);
          setTotalDiscount(data.total_discount || 0);
          setTotalPrice(data.total_price || 0);
        }

        setLoading(false);
        setShowCoLoader(false);
        if (data.couponapplied) {
          setCouponCode(data.couponapplied);
          setShowRemove(true); // Correct reference
          setCouponSuccessMsg("Coupon code has been applied successfully.");

          const items = userDetails?.carts?.cartItems || [];
          const nextStatus = buildCouponItemStatus(items, data.couponapplied);
          setCouponItemStatus(nextStatus);
          try {
            sessionStorage.setItem(
              "orat_coupon_status",
              JSON.stringify({ code: data.couponapplied, statusMap: nextStatus })
            );
          } catch (e) {
            // ignore
          }
        }
        if (removeCoupon) setCouponCode("");
      })
      .catch((error) => {
        console.error("Error fetching total discount:", error);
        console.error("Error response:", error.response);
        console.error("Error data:", error.response?.data);

        // Fallback: calculate totals manually
        const cartItems = userDetails.carts?.cartItems || [];
        if (cartItems.length > 0) {
          const manualTotal = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.saleprice || item.price || 0);
            const quantity = parseInt(item.cartQuantity || 1);
            return sum + (price * quantity);
          }, 0);
          console.log("Fallback: Calculating totals manually:", manualTotal);
          setTotalPrice(manualTotal);
          setTotalAmount(manualTotal);
          setTotalDiscount(0);
          setTotalTaxAmount(0);
          setDiscountOnTotal(0);
        }

        setLoading(false);
        setShowCoLoader(false);
      });
  };

  const applyCouponCode = () => {
    if (!couponCode) {
      setShowCoError(true);
      setErrorMsg("Please enter coupon code.");
      setCouponSuccessMsg("");
      return;
    }

    const itemsToCheck = (cartArr && cartArr.length ? cartArr : cart.cartItems) || [];

    const eligibleItems = itemsToCheck.filter((item) => !isRealDiscounted(item));
    const ineligibleItems = itemsToCheck.filter((item) => isRealDiscounted(item));

    if (!eligibleItems.length) {
      setShowCoError(true);
      setErrorMsg("Coupon code cannot be applied on already discounted products.");
      setShowCoLoader(false);
      setCouponSuccessMsg("");
      return;
    }

    setShowCoLoader(true);
    const baseDetails = getUserDetails();
    const userDetails = {
      ...baseDetails,
      couponCode,
      carts: {
        ...baseDetails.carts,
        cartItems: eligibleItems,
      },
    };

    getTotalDiscount(userDetails)
      .then((data) => {
        if (data.success) {
          const qtyOf = (item) => Number(item?.cartQuantity || 1);
          const originalPriceOf = (item) => Number(item?.price || 0);
          const payablePriceOf = (item) => Number(item?.saleprice || item?.price || 0);

          const allOriginalTotal = itemsToCheck.reduce(
            (sum, item) => sum + originalPriceOf(item) * qtyOf(item),
            0
          );

          const allPayableNoCoupon = itemsToCheck.reduce(
            (sum, item) => sum + payablePriceOf(item) * qtyOf(item),
            0
          );

          const eligiblePayableNoCoupon = eligibleItems.reduce(
            (sum, item) => sum + payablePriceOf(item) * qtyOf(item),
            0
          );

          const ineligiblePayableTotal = ineligibleItems.reduce(
            (sum, item) => sum + payablePriceOf(item) * qtyOf(item),
            0
          );

          const apiTotalAmountRaw = Number(data.total_amount);
          const apiTotalPriceRaw = Number(data.total_price);
          const apiTotalDiscountRaw = Number(data.total_discount);
          const apiSlabDiscountRaw = Number(data.price_slab_discount);

          let apiEligiblePayable = Number.isFinite(apiTotalAmountRaw) ? apiTotalAmountRaw : 0;
          if (!apiEligiblePayable) {
            const derived = (Number.isFinite(apiTotalPriceRaw) ? apiTotalPriceRaw : 0) -
              (Number.isFinite(apiTotalDiscountRaw) ? apiTotalDiscountRaw : 0) -
              (Number.isFinite(apiSlabDiscountRaw) ? apiSlabDiscountRaw : 0);
            apiEligiblePayable = derived > 0 ? derived : 0;
          }
          if (!apiEligiblePayable) {
            apiEligiblePayable = eligiblePayableNoCoupon;
          }

          const couponExtraDiscount = Math.max(0, eligiblePayableNoCoupon - apiEligiblePayable);
          const itemLevelDiscount = Math.max(0, allOriginalTotal - allPayableNoCoupon);
          const finalPayable = apiEligiblePayable + ineligiblePayableTotal;

          setTotalTaxAmount(data.total_tax_amount || 0);
          setDiscountOnTotal(Number.isFinite(apiSlabDiscountRaw) ? apiSlabDiscountRaw : 0);
          setTotalAmount(finalPayable);
          setTotalDiscount(itemLevelDiscount + couponExtraDiscount);
          setTotalPrice(allOriginalTotal);
          setShowCoLoader(false);
          setShowRemove(true); // Correct reference
          setShowCoError(false);
          setErrorMsg("");
          setCouponSuccessMsg("Coupon code has been applied successfully.");

          const nextStatus = buildCouponItemStatus(itemsToCheck, couponCode);
          setCouponItemStatus(nextStatus);
          try {
            sessionStorage.setItem(
              "orat_coupon_status",
              JSON.stringify({ code: couponCode, statusMap: nextStatus })
            );
          } catch (e) {
            // ignore
          }

          setTimeout(() => {
            window.location.reload();
          }, 200);
        } else {
          setShowCoLoader(false);
          setShowCoError(true);
          setErrorMsg(data.message);
          setCouponSuccessMsg("");
          setCouponItemStatus({});
        }
      })
      .catch((error) => {
        console.error("Error applying coupon:", error);
        setLoading(false);
        setShowCoLoader(false);
        setCouponSuccessMsg("");
        setCouponItemStatus({});
      });
  };

  const removeCouponCode = () => {
    getTotalDiscountData(getUserDetails(), true);
    setCouponSuccessMsg("Coupon code has been removed.");
    setCouponItemStatus({});
    try {
      sessionStorage.removeItem("orat_coupon_status");
    } catch (e) {
      // ignore
    }
  };

  const toggleDropdown = (variantId) => {
    setDropdownVisible(!isDropdownVisible);
    setSelectedSizeId(variantId);
  };

  const handleWishlist = (cartItem) => {
    // If user is not logged in, open login modal
    if (!userInfo) {
      setModalShow(true);
      return;
    }

    setLoading(true);
    const userDetails = {
      product_id: cartItem?.id,
      gift_id: cartItem?.gift_id,
      user_id: userInfo?.data?.user?.id,
    };

    addWishList(userDetails)
      .then((data) => {
        if (data.status) {
          setLoading(false);
          setWishlistIcon(true);
          dispatch(getWishListd(userDetails));
          setSelectedBtnId([...selectedBtnId, cartItem.id]);
          toast.success(data.message, { position: "bottom-right" });
        }
      })
      .catch((error) => {
        console.error("Add wishlist error:", error);
        setLoading(false);
      });
  };

  const removeWishlist = (cartItem) => {
    // If user is not logged in, open login modal
    if (!userInfo) {
      setModalShow(true);
      return;
    }

    setLoading(true);
    const userDetails = {
      product_id: cartItem?.id,
      gift_id: cartItem?.gift_id,
      user_id: userInfo?.data?.user?.id,
    };

    removeWishList(userDetails)
      .then((data) => {
        if (data.status) {
          setLoading(false);
          setWishlistIcon(false);
          setSelectedBtnId(selectedBtnId.filter((id) => id !== cartItem.id));
          dispatch(getWishListd(userDetails));
          toast.success("Removed from wishlist!", { position: "bottom-right" });
        }
      })
      .catch((error) => {
        console.error("Remove wishlist error:", error);
        setLoading(false);
      });
  };

  const executeRemove = (product) => {
    setLoading(true);

    // If user is not logged in, remove from localStorage (Redux) directly
    if (!userInfo) {
      dispatch(removeFromCart(product));
      dispatch(getTotals());
      // Update local state immediately
      const updatedCart = cart.cartItems.filter(
        (item) => item.activevar !== product.activevar
      );
      setCartDetails(updatedCart);
      // Recalculate totals
      const guestTotal = updatedCart.reduce((sum, item) => sum + (item.saleprice || item.price || 0) * (item.cartQuantity || 1), 0) || 0;
      setTotalPrice(guestTotal);
      setTotalAmount(guestTotal);
      setTotalDiscount(0);
      setTotalTaxAmount(0);
      setLoading(false);
      return;
    }

    // If user is logged in, proceed with API call
    const gift_id = product?.gift_id ?? null;
    const userDetails = {
      product_id: product?.id,
      user_id: userInfo?.data?.user?.id,
      variant_id: product?.activevar,
      ...(gift_id !== null && { gift_id }),
    };

    removeCart(userDetails)
      .then((data) => {
        if (data.status) {
          dispatch(getAllCartsd(userDetails));
          getTotalDiscountData(getUserDetails());
          getAllCartList();
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Remove cart error:", error);
        setLoading(false);
      });
  };

  const handleRemoveFromCart = (product) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
    if (isMobile) {
      setRemoveTarget(product);
      setRemoveSheetOpen(true);
      return;
    }
    // Desktop: remove directly
    executeRemove(product);
  };

  const handleProductSize = (variantId, oldVariantId, cartItem) => {
    setLoading(true);
    const applyVariantLocally = (variant) => {
      const mapper = (item) => {
        if (item.activevar !== oldVariantId) return item;
        return {
          ...item,
          activevar: variant?.varid || variantId,
          envpriceid: variant?.envpriceid || variantId,
          size: variant?.size || item.size,
          price: variant?.price ?? item.price,
          saleprice: variant?.saleprice ?? item.saleprice,
          discount_amount:
            variant?.discount_amount ?? item.discount_amount ?? 0,
          discount_type: variant?.discount_type ?? item.discount_type ?? "",
        };
      };

      const updatedCart = (cartArr || []).map(mapper);
      setCartDetails(updatedCart);

      const updatedReduxCart = (cart.cartItems || []).map(mapper);
      dispatch(setCartItems(updatedReduxCart));
      dispatch(getTotals());
      setLoading(false);
    };

    if (!userInfo) {
      const chosenVariant =
        cartItem?.productvariants?.find((variant) => variant?.varid === variantId) ||
        null;

      if (!chosenVariant) {
        setLoading(false);
        toast.error("Unable to change size. Please try again.", {
          position: "bottom-right",
        });
        return;
      }

      applyVariantLocally(chosenVariant);
      return;
    }

    const userDetails = {
      user_id: userInfo?.data?.user?.id,
      variant_id: variantId,
      old_variant_id: oldVariantId,
    };

    changeProductSize(userDetails)
      .then((data) => {
        if (data.success) {
          setSelectedSizeId(variantId);
          setDropdownVisible(!isDropdownVisible);
          dispatch(changeSizeintoCart(variantId));
          window.location.reload();
        } else {
          setLoading(false);
          toast.error(data.message, { position: "bottom-right" });
        }
      })
      .catch((error) => {
        console.error("Change product size error:", error);
        setLoading(false);
      });
  };

  const getWishlistList = () => {
    const userDetails = getUserDetails();
    getallWishList(userDetails)
      .then((data) => {
        setSelectedBtnId(data.productsList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wishlist list:", error);
        setLoading(false);
      });
  };

  const getAllCartList = () => {
    // If user is not logged in, use cart from localStorage (Redux state)
    if (!userInfo) {
      const items = cart.cartItems || [];
      setCartDetails(items);

      // If cart is empty, also clear any coupon state on frontend
      if (!items.length) {
        setTotalPrice(0);
        setTotalAmount(0);
        setTotalDiscount(0);
        setTotalTaxAmount(0);
        setCouponCode("");
        setShowRemove(false);
        setShowCoError(false);
        setErrorMsg("");
        setLoading(false);
        return;
      }

      // Calculate totals from localStorage cart
      const guestTotal = items.reduce(
        (sum, item) =>
          sum + (item.saleprice || item.price || 0) * (item.cartQuantity || 1),
        0
      );
      setTotalPrice(guestTotal);
      setTotalAmount(guestTotal);
      setTotalDiscount(0);
      setTotalTaxAmount(0);
      setLoading(false);
      return;
    }

    // If user is logged in, fetch from API
    const userDetails = getUserDetails();
    getAllCart(userDetails)
      .then((data) => {
        setCartDetails(data.data);
        // dispatch(updatecartCount(data.data.length));
        console.log(data.data);

        // Update Redux state first, then use the result payload
        dispatch(getAllCartsd(userDetails)).then((result) => {
          // Use the cart data from the API response directly
          // Structure it exactly like Redux cart (which is what API expects)
          const cartDataForAPI = {
            cartItems: result.payload?.data || data.data || [],
            cartTotalAmount: 0,
            cartTotalQuantity: 0,
          };

          // If logged-in cart is now empty, clear coupon both frontend and backend
          if (!cartDataForAPI.cartItems.length) {
            const userDetailsForDiscount = {
              user_id: userInfo?.data?.user?.id,
              carts: cartDataForAPI,
            };

            setTotalPrice(0);
            setTotalAmount(0);
            setTotalDiscount(0);
            setTotalTaxAmount(0);
            setDiscountOnTotal(0);
            setCouponCode("");
            setShowRemove(false);
            setShowCoError(false);
            setErrorMsg("");

            // Inform backend to drop any previously applied coupon
            getTotalDiscountData(userDetailsForDiscount, true);
            setLoading(false);
            return;
          }

          const userDetailsForDiscount = {
            user_id: userInfo?.data?.user?.id,
            carts: cartDataForAPI,
          };

          console.log("Cart data being sent to getTotalDiscount:", userDetailsForDiscount);
          console.log("Cart items:", cartDataForAPI.cartItems);
          console.log("Cart items count:", cartDataForAPI.cartItems?.length);
          console.log("First cart item:", cartDataForAPI.cartItems[0]);

          // Calculate totals with the cart data
          getTotalDiscountData(userDetailsForDiscount);
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching carts list:", error);
        setLoading(false);
      });
  };

  // Side Effects
  useEffect(() => {
    if (userInfo) {
      getAllCartList();
      getWishlistList();
    } else {
      // For guest users, use cart from localStorage
      getAllCartList();
      dispatch(getTotals());
      setLoading(false);
    }
  }, []);

  // Check for payment success query parameter
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const orderId = searchParams.get('orderId');

    if (paymentStatus === 'success') {
      setPaymentSuccessMessage('Your order has been placed successfully! Thank you for shopping with us.');

      // Remove query parameters from URL after showing message
      setTimeout(() => {
        setSearchParams({});
        setPaymentSuccessMessage('');
      }, 3000); // Show message for 5 seconds
    }
  }, [searchParams, setSearchParams]);

  // useEffect(() => {
  //   const userDetails = getUserDetails();
  //   dispatch(getAllCartsd(userDetails));
  // }, []);

  // Render
  return loading ? (
    <Loader />
  ) : (
    <div className="App  mobile_checkout">
      <div className="CartPage">
        {paymentSuccessMessage && (
          <div style={{ marginTop: '20px', marginBottom: '20px', padding: '0 15px' }}>
            <Alerts successm={paymentSuccessMessage} />
          </div>
        )}
        {cartArr?.length > 0 ? (
          <div className="CartWrapper">
            <div className="layout CartWrapperContent align-start justify-center mobile_ba">
              {/* Shopping Cart Section */}
              <div className="ShoppingCart CartWrapperContentLeft">
                <h4 className="jjj">YOUR SHOPPING CART</h4>
                <ul className="list-unstyled m-t-0 CartItemWrapper cartWrap_desktop">
                  {cartArr.map((cartItem) => (
                    <li className="CartItem" key={cartItem.id}>
                      <div className="layout row">
                        <div className="ProductImage xs2 sm2 flex prel">
                          <Link to={`/products/productdetails/${cartItem.id}`}>
                            <img
                              src={cartItem.product_thumbail}
                              alt={cartItem.product_title}
                              className="overflow-hidden p4"
                            />
                          </Link>
                        </div>
                        <div className="ProductDetails xs5 sm5 flex">
                          <div className="Brand text-uppercase bold">
                            {cartItem.product_title}
                          </div>
                          <div className="Name bold">
                            {cartItem.product_short_description}
                          </div>
                          <div className="Code m-t-10 bold">
                            CODE: {cartItem.sku}
                          </div>
                          {cartItem.envpriceid && (!cartItem.gift_id || cartItem.gift_id === '') && (
                            <div className="dd-wrapper plainDropdown cartItemSizes">
                              <div
                                className="dd-header"
                                onClick={() =>
                                  toggleDropdown(cartItem.envpriceid)
                                }
                              >
                                <div className="dd-header-sort-text cartItemSizesHeader demi-bold">
                                  Size: {cartItem.size}
                                </div>
                                <span
                                  className={`arrow-icon m-r-5 ${selectedSizeId === cartItem.envpriceid &&
                                      isDropdownVisible
                                      ? "arrow-up-icon"
                                      : "arrow-down-icon"
                                    }`}
                                ></span>
                              </div>
                              {selectedSizeId === cartItem.envpriceid &&
                                isDropdownVisible && (
                                  <ul className="dd-list bold">
                                    {Array.isArray(cartItem.productvariants) &&
                                      cartItem.productvariants.length > 0 ? (
                                      cartItem.productvariants.map(
                                        (data, index) => (
                                          <li
                                            className="dd-list-item font-normal"
                                            key={index}
                                            onClick={() =>
                                              handleProductSize(
                                                data?.varid,
                                                cartItem?.activevar,
                                                cartItem
                                              )
                                            }
                                          >
                                            {data?.size}
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li className="dd-list-item font-normal disabled">
                                        Size options unavailable
                                      </li>
                                    )}
                                  </ul>
                                )}
                            </div>
                          )}
                        </div>
                        <div className="ProductPricing xs5 sm5 flex text-right layout column justify-space-between">
                          <div>
                            <div className="layout align-center justify-end">
                              {cartItem.discount_type && cartItem.discount_amount > 0 && (
                                <div className="Discount bold m-r-8">
                                  {cartItem.discount_type === "flat"
                                    ? `${cartItem.discount_amount} FLAT OFF`
                                    : `${cartItem.discount_amount}% OFF`}
                                </div>
                              )}
                              {!cartItem.gift_id && cartItem.discount_amount > 0 && (
                                <div className="ActualPrice m-l-0 m-r-8">
                                  {/* <i
                                    className="fa fa-inr"
                                    style={{ fontSize: "13px" }}
                                  ></i> */}
                                  {formatPrice(cartItem.price)}
                                </div>
                              )}
                              <div className="DiscountedPrice bold m-l-0">
                                {formatPrice(cartItem.saleprice)}
                              </div>
                            </div>
                            {couponCode && couponItemStatus?.[cartItem.id] && (
                              <div className="m-t-8 layout justify-end">
                                <span
                                  className="p3 demi-bold"
                                  style={
                                    couponItemStatus?.[cartItem.id] === "applied"
                                      ? {
                                        color: "#1B5E20",
                                        background: "#E8F5E9",
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        display: "inline-block",
                                      }
                                      : {
                                        color: "#B71C1C",
                                        background: "#FFEBEE",
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        display: "inline-block",
                                      }
                                  }
                                >
                                  {couponItemStatus?.[cartItem.id] === "applied"
                                    ? `${couponCode} applied`
                                    : `${couponCode} not applicable`}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ActionButton">
                            <span className="Wishlist">
                              {selectedBtnId.includes(cartItem.id) ? (
                                <button
                                  className="btn-icon ProductToWishlist flex"
                                  onClick={() => removeWishlist(cartItem)}
                                >
                                  <FaHeart />
                                </button>
                              ) : (
                                <button
                                  className="btn-icon ProductToWishlist flex"
                                  onClick={() => handleWishlist(cartItem)}
                                >
                                  <FaRegHeart />
                                </button>
                              )}
                            </span>
                            <span
                              className="Remove"
                              onClick={() => handleRemoveFromCart(cartItem)}
                              style={{ cursor: "pointer" }}
                            >
                              <IoMdClose />
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* ===============mobile shopping cart======= */}
                <ul className="list-unstyled m-t-0 CartItemWrapper cartWrap_mobile">
                  {cartArr.map((cartItem) => (
                    <li className="CartItem" key={cartItem.id}>
                      <div className="layout row">
                        <div className="ProductImage xs3 sm2 flex prel">
                          <Link to={`/products/productdetails/${cartItem.id}`}>
                            <img
                              src={cartItem.product_thumbail}
                              alt={cartItem.product_title}
                              className="overflow-hidden p4 imkio"
                            />
                          </Link>
                        </div>
                        <div className="ProductDetails xs7 sm5 flex">
                          <div className="Brand text-uppercase bold">
                            {cartItem.product_title}
                          </div>
                          <div className="Name bold">
                            {cartItem.product_short_description}
                          </div>
                          <div className="Code m-t-10 bold">
                            Code: {cartItem.sku}
                          </div>
                          {cartItem.envpriceid && (!cartItem.gift_id || cartItem.gift_id === '') && (
                            <div className="dd-wrapper plainDropdown cartItemSizes">
                              {/* <div
                                className="dd-header"
                                onClick={() =>
                                  toggleDropdown(cartItem.envpriceid)
                                }
                              >
                                <div className="dd-header-sort-text cartItemSizesHeader demi-bold">
                                  Size: {cartItem.size}
                                </div>
                                <span
                                  className={`arrow-icon m-r-5 ${selectedSizeId === cartItem.envpriceid &&
                                      isDropdownVisible
                                      ? "arrow-up-icon"
                                      : "arrow-down-icon"
                                    }`}
                                ></span>
                              </div> */}
                              {
                                // isDropdownVisible && (
                                //   <ul className="dd-list bold">
                                //     {Array.isArray(cartItem.productvariants) &&
                                //       cartItem.productvariants.length > 0 ? (
                                //       cartItem.productvariants.map(
                                //         (data, index) => (
                                //           <li
                                //             className="dd-list-item font-normal"
                                //             key={index}
                                //             onClick={() =>
                                //               handleProductSize(
                                //                 data?.varid,
                                //                 cartItem?.activevar,
                                //                 cartItem
                                //               )
                                //             }
                                //           >
                                //             {data?.size}
                                //           </li>
                                //         )
                                //       )
                                //     ) : (
                                //       <li className="dd-list-item font-normal disabled">
                                //         Size options unavailable
                                //       </li>
                                //     )}
                                //   </ul>
                                // )}
                                 <div className="dd-header-sort-text larts cartItemSizesHeader demi-bold">
                                  Size: {cartItem.size}
                                </div>
}
                              <div>
                                <div className="layout align-center row-reverse">
                                  <div className="DiscountedPrice bold m-l-0">
                                    {formatPrice(cartItem.saleprice)}
                                  </div>
                                  {!cartItem.gift_id && cartItem.discount_amount > 0 && (
                                    <div className="ActualPrice m-l-0 m-r-8">
                                      {/* <i
                                    className="fa fa-inr"
                                    style={{ fontSize: "13px" }}
                                  ></i> */}
                                      {formatPrice(cartItem.price)}
                                    </div>
                                  )}
                                 
                                   {cartItem.discount_type && cartItem.discount_amount > 0 && (
                                    <div className="Discount bold m-r-8">
                                      {cartItem.discount_type === "flat"
                                        ? `${cartItem.discount_amount} FLAT OFF`
                                        : `-${cartItem.discount_amount}%`}
                                    </div>
                                  )}
                                </div>
                                {couponCode && couponItemStatus?.[cartItem.id] && (
                                  <div className="m-t-8 layout justify-end">
                                    <span
                                      className="p3 demi-bold"
                                      style={
                                        couponItemStatus?.[cartItem.id] === "applied"
                                          ? {
                                            color: "#1B5E20",
                                            background: "#E8F5E9",
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            display: "inline-block",
                                          }
                                          : {
                                            color: "#B71C1C",
                                            background: "#FFEBEE",
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            display: "inline-block",
                                          }
                                      }
                                    >
                                      {couponItemStatus?.[cartItem.id] === "applied"
                                        ? `${couponCode} applied`
                                        : `${couponCode} not applicable`}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="ProductPricing xs2 sm5 flex text-right layout column justify-space-between">
                          <div className="ActionButton">
                            <span className="Wishlist">
                              {selectedBtnId.includes(cartItem.id) ? (
                                <button
                                  className="btn-icon ProductToWishlist flex"
                                  onClick={() => removeWishlist(cartItem)}
                                >
                                  <FaHeart />
                                </button>
                              ) : (
                                <button
                                  className="btn-icon ProductToWishlist flex"
                                  onClick={() => handleWishlist(cartItem)}
                                >
                                  <FaRegHeart />
                                </button>
                              )}
                            </span>
                            <span
                              className="Remove"
                              onClick={() => handleRemoveFromCart(cartItem)}
                              style={{ cursor: "pointer" }}
                            >
                              <IoMdClose />
                            </span>
                          </div>


                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* ===============mobile shopping cart end========= */}
                <div className="layout align-start justify-end">
                  <img
                    src={"https://res.cloudinary.com/dgif730br/image/upload/v1764586400/Payment_options_hicxg3.png"}
                    alt="logo"
                    style={{ width: "23.5%" }}
                    className="razorpay"
                  />
                </div>
                <div className="layout justify-space-between Instructions m-t-25 m-b-25 p-b-25">
                  <div>
                    <div>
                      <p>
                        *Once your order has been placed no subsequent changes
                        can be made in it.
                      </p>
                      <p>
                        *Shipping cost may vary depending on the delivery
                        destination.
                      </p>
                      <p>
                        *Please check the final amount on the order summary page
                        before completing the payment.
                      </p>
                      <p>
                        *An item's price may vary according to the size
                        selected.
                      </p>
                    </div>
                    <div className="m-t-10">
                      <Link
                        to="/shipping-information"
                        target="_blank"
                        className="bold orat-color-hover"
                      >
                        SHIPPING POLICY
                      </Link>
                      <Link
                        to="/how-to-shop"
                        target="_blank"
                        className="bold orat-color-hover"
                      >
                        HELP
                      </Link>
                      <Link
                        to="/contact"
                        target="_blank"
                        className="bold orat-color-hover"
                      >
                        CONTACT US
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cart Summary Section */}
              <div className="CartSummaryWrap CartWrapperContentRight">
                <div className="CartWrapperContentRightContent">
                  <h4>PAYMENT SUMMARY</h4>

                  <div className="CartSummary cartSummary_desktop">
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
                    {discountOnTotal > 0 && (
                      <div className="Shipping bold layout justify-space-between">
                        <span>
                          <p>Discount on Total Amount</p>
                        </span>
                        <span className="float-right">(-) {formatPrice(discountOnTotal)}</span>
                      </div>
                    )}
                    {totalTaxAmount > 0 && (
                      <div className="Shipping bold layout justify-space-between mt-2">
                        <span>
                          <p>Tax</p>
                        </span>
                        <span className="float-right">(+ ) {formatPrice(totalTaxAmount)}</span>
                      </div>
                    )}
                    {/* Shipping row & note (charges calculated later like reference site) */}
                    <div className="Shipping bold m-b-0 layout justify-space-between mt-2">
                      <span>Shipping</span>
                      <span className="float-right">{formatPrice(0)}</span>
                    </div>
                    <p className="h7 demi-bold">
                      Shipping charges to be calculated on Checkout
                    </p>
                  </div>

                  {/* Gift option (right side, below shipping) */}
                  <div className="LoyaltyEarnPoints m-t-10 m-b-10 layout align-center">
                    <div className="PslCheckbox flex">
                      <label>
                        <input
                          type="checkbox"
                          className="PslCheckboxInput"
                        />
                        <span className="PslCheckboxCheckmark"></span>
                        <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">
                          This is a gift item
                        </span>
                      </label>
                    </div>
                    <Link to="/contact" className="font-normal h6 cursor-pointer">
                      (Know More)
                    </Link>
                  </div>
                  <div className="PromoCodeWrapper">
                    <h4>COUPON CODE</h4>
                    <div className="ApplyPromoCode m-b-25">
                      <div className="layout">
                        {showRemove ? (
                          <>
                            <input
                              type="text"
                              placeholder="Enter Coupon Code"
                              readOnly
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <button
                              className="btn-orat-primary bold"
                              onClick={removeCouponCode}
                              type="button"
                              disabled={showCoLoader}
                            >
                              {!showCoLoader ? (
                                "REMOVE"
                              ) : (
                                <RotatingLines
                                  color="#FFFFFF"
                                  height={30}
                                  width={30}
                                />
                              )}
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              placeholder="Enter Coupon Code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !showCoLoader) {
                                  e.preventDefault();
                                  applyCouponCode();
                                }
                              }}
                            />
                            <button
                              className="btn-orat-primary bold"
                              onClick={applyCouponCode}
                              type="button"
                              disabled={showCoLoader}
                            >
                              {!showCoLoader ? (
                                "APPLY"
                              ) : (
                                <RotatingLines
                                  color="#FFFFFF"
                                  height={30}
                                  width={30}
                                />
                              )}
                            </button>
                          </>
                        )}
                      </div>
                      {showCoError && (
                        <div>
                          <p className="error-msg">{errorMsg}</p>
                          <p className="p2 m-t-5">For any applicable offers on this cart.</p>
                          <p className="p2 m-t-5" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <FaWhatsapp style={{ color: "#25D366", fontSize: "16px" }} />
                            <span>WhatsApp us at</span>
                            <a
                              href="https://wa.me/919147072827"
                              className="orat-color"
                              style={{ textDecoration: "underline" }}
                            >
                              +91 9147072827
                            </a>
                          </p>
                        </div>
                      )}
                      {couponSuccessMsg && !showCoError && (
                        <p className="success-msg m-t-5">{couponSuccessMsg}</p>
                      )}
                    </div>
                  </div>
                  <div className="TotalWrapper">
                    <span className="Total bold">TOTAL PAYABLE</span>
                    <span className="float-right ex-bold TotalAmount">
                      {formatPrice(totalPayable)}
                    </span>
                  </div>
                  <div className="Buttons">
                    {userInfo ? (
                      <Link to="/address">
                        <button className="btn-orat-primary bold">
                          PROCEED TO CHECKOUT
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="btn-orat-primary bold"
                        onClick={() => setModalShow(true)}
                      >
                        PROCEED TO CHECKOUT
                      </button>
                    )}
                    <Link to="/">
                      <button className="btn-orat-secondry bold">
                        CONTINUE SHOPPING
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="emptyCartWrapper layout column align-center justify-center full-height m-t-25 p-t-25">
            <img className="cursor-pointer" src={Emptycart} alt="Empty Cart" />
            <h4 className="m-t-20 demi-bold">Your Shopping Cart is Empty</h4>
            <h6 className="font-normal">You have no items in your cart</h6>
            <Link className="m-t-25 h5 demi-bold btn-orat-secondry" to="/">
              CONTINUE SHOPPING
            </Link>
          </div>
        )}
        {/* <Trending /> */}
         {cartArr && cartArr.length > 0 && <Trending />}
        <Recently showrecentviewed={true} />
          {cartArr && cartArr.length > 0 && (
        <div className="MobileGreyNote mobile-only">
          <ul className="points">
            <li>Once your order has been placed no subsequent changes can be made in it.</li>
            <li>Shipping cost may vary depending on the delivery destination.</li>
            <li>Please check the final amount on the order summary page before completing the payment.</li>
            <li>An item's price may vary according to the size selected.</li>
             <div className="links">
            <Link to="/shipping-information" target="_blank">SHIPPING POLICY</Link>
            <Link to="/contact" target="_blank">CONTACT US</Link>
            <Link to="/how-to-shop" target="_blank">HELP</Link>
          </div>
          </ul>
         
        </div>
      )}
        <Complete />
      </div>
      {/* Mobile note bar – grey background text at the bottom */}
    
      {/* Sticky bottom checkout bar – mobile only */}
      {cartArr && cartArr.length > 0 && (
        <div className="StickyCheckoutBar mobile-only">
          <div className="StickyCheckoutBar__total">
            <span className="label">TOTAL PAYABLE</span>
            <span className="amount">{formatPrice(totalPayable)}</span>
          </div>
          <Link to="/address" className="StickyCheckoutBar__cta">
            <button type="button">CHECKOUT</button>
          </Link>
        </div>
      )}
      {/* Mobile Remove Bottom Sheet */}
      {removeSheetOpen && (
        <div className="RemoveSheetBackdrop" onClick={() => setRemoveSheetOpen(false)}>
          <div className="RemoveSheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet_handle"/>
            <h4 className="m-b-8 demi-bold">REMOVE ITEM</h4>
            <p className="p2 m-b-12">Are you sure you want to remove the following item from your cart?</p>
            {removeTarget && (
              <div className="layout align-center product_sheet">
                <div className="ProductImage xs1 sm2 flex prel">
                  <img src={removeTarget.cover_image} alt={removeTarget.product_title} style={{width:'60px',height:'80px',objectFit:'cover',borderRadius:'2px'}}/>
                </div>
                <div className="m-l-12" style={{flex:1}}>
                  <div className="Brand text-uppercase bold">{removeTarget.product_title}</div>
                  <div className="Name p2">{removeTarget.product_short_description}</div>
                  {removeTarget.size && <div className="p2 demi-bold m-t-4 sizes_sheet">Size: {removeTarget.size}</div>}
                </div>
              </div>
            )}
            <div className="layout align-center justify-space-between m-t-8">
              <button type="button" className="btn-orat-secondry orat_sheet" style={{width:'48%'}} onClick={() => setRemoveSheetOpen(false)}>CANCEL</button>
              <button type="button" className="btn-orat-primary orat_sheet1" style={{width:'48%'}} onClick={() => { setRemoveSheetOpen(false); if(removeTarget){ executeRemove(removeTarget);} }}>REMOVE</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <LoginModal showModal={modalShow} modalHide={() => setModalShow(false)} />
    </div>
  );
}

export default Checkout;
