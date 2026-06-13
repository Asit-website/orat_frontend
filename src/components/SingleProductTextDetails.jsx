// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
// import { MdInfoOutline } from "react-icons/md";
// import { Women, Womenm, StandardShipping, Measurement } from "../image";
// import { Modal, Tabs, Tab } from "react-bootstrap";
// import { FaFacebookSquare } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaPinterestP } from "react-icons/fa";
// import { FaWhatsapp } from "react-icons/fa6";
// import { IoMdClose } from "react-icons/io";
// import Table from "react-bootstrap/Table";
// import { useDispatch } from "react-redux";
// import {
//   getAllCartsd,
//   getTotals,
//   addToCart,
// } from "../Redux/features/Cart/CartSlice";
// import { getWishListd } from "../Redux/features/wishlist/WishListSlice";
// import Loader from "../components/Loader";
// import {
//   addWishList,
//   getWishList,
//   removeWishList,
//   addCart,
//   addNewsletter,
// } from "../services/User-service";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import LoginModal from "./loginmodal";
// import { RotatingLines } from "react-loader-spinner";
// import {
//   addCustomTailored,
//   addDontKnowCustomTailored,
// } from "../services/Product-service";
// import Alerts from "./Alerts";
// export default function SingleProductTextDetails({
//   productDetails,
//   productVars,
//   couponslist,
// }) {
//   const dispatch = useDispatch();
//   const userInfo = useSelector((state) => state.user.userInfo);
//   const [showSizeModal, setShowSizeModal] = useState(false);
//   const [showCustomModal, setShowCustomModal] = useState(false);
//   const [activevarient, setactivevarient] = useState("");
//   const [activeprice, setactiveprice] = useState("");
//   const [activesaleprice, setactivesaleprice] = useState("");
//   const [activediscountamount, setactivediscountamount] = useState("");
//   const [activediscounttype, setactivediscounttype] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [successm, setsuccessm] = useState("");
//   const [errors, seterrors] = useState([]);
//   const [successmdontknow, setsuccessmdontknow] = useState("");
//   const [errorsdontknow, seterrorsdontknow] = useState([]);
//   const [wishlisticon, setwishlisticon] = useState("");
//   const [modalShow, setModalShow] = React.useState(false);
//   const [fitinfo, setFitInfo] = useState("");
//   const [shippinginfo, setshipping] = useState("");
//   const [showLoader, setShowLoader] = useState(false);
//   const [showLoaderdn, setShowLoaderdn] = useState(false);
//   const navigate = useNavigate();
//   const handleCloseSizeModal = () => setShowSizeModal(false);
//   const handleShowSizeModal = () => setShowSizeModal(true);
//   const handleCloseCustomModal = () => setShowCustomModal(false);
//   const handleShowCustomModal = () => setShowCustomModal(true);
//   var modalHide = () => {
//     setModalShow(false);
//   };
//   const [variants, setVariants] = useState(productVars || []);
//   // console.log(variants);

//   const [proddetails, setProddetails] = useState([]);

//   const handlewishlist = (e) => {
//     if (userInfo) {
//       e.preventDefault();
//       setLoading(true);
//       const userDetails = {
//         product_id: productDetails?.id,
//         user_id: userInfo?.data?.user?.id,
//       };
//       addWishList(userDetails)
//         .then((data) => {
//           if (data.status) {
//             setLoading(false);
//             setwishlisticon(true);
//             getWishListData();
//             dispatch(getWishListd(userDetails));
//           }
//         })
//         .catch((error) => {
//           if (error) {
//             setLoading(false);
//             console.log("Add wishlist error:", error);
//           }
//         });
//     } else {
//       setModalShow(true);
//     }
//   };
//   const removewishlist = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const userDetails = {
//       product_id: productDetails?.id,
//       user_id: userInfo?.data?.user?.id,
//     };

//     removeWishList(userDetails)
//       .then((data) => {
//         if (data.status) {
//           setLoading(false);
//           setwishlisticon(false);
//           dispatch(getWishListd(userDetails));
//           toast.success(data.message, {
//             position: "bottom-right",
//           });
//         }
//       })
//       .catch((error) => {
//         if (error) {
//           setLoading(false);
//           console.log("Remove wishlist error:", error);
//         }
//       });
//   };
//   useEffect(() => {
//     // Update variants state when productDetails change
//     if (productVars) {
//       setVariants(productVars);
//     }
//     if (productDetails) {
//       // setactivevarient(productDetails?.envpriceid);
//       setactiveprice(productDetails?.price);
//       setactivesaleprice(productDetails?.saleprice);
//       setactivediscountamount(productDetails?.discount_amount);
//       setactivediscounttype(productDetails?.discount_type);
//     }
//     setLoading(false);
//     if (userInfo) {
//       getWishListData();
//     }
//   }, [productDetails, productVars]);

//   const handleSizeClick = (
//     envpriceid,
//     price,
//     product_fit_info,
//     discount_type,
//     discount_amount,
//     saleprice
//   ) => {
//     setactivevarient(envpriceid);
//     setactiveprice(price);
//     setactivesaleprice(saleprice);
//     setactivediscountamount(discount_amount);
//     setactivediscounttype(discount_type);
//     setFitInfo(product_fit_info);
//     setshipping(true);
//   };

//   // const handleAddToCart = (e) => {
//   //     if (userInfo) {
//   //         if (activevarient == '') {
//   //             toast.error("Please select a product size", {
//   //                 position: "bottom-right",
//   //             });
//   //         } else {
//   //             setLoading(true);
//   //             const userDetails = {
//   //                 product_id: productDetails?.id,
//   //                 user_id: userInfo?.data?.user?.id,
//   //                 varient_id: activevarient
//   //             }
//   //             // Optimistically update cart state
//   //             dispatch(addToCart({ ...productDetails, activevar: activevarient, cartQuantity: 1 }));
//   //             dispatch(getTotals());
//   //             addCart(userDetails).then((data) => {
//   //                 if (data.success) {
//   //                     productDetails.activevar = activevarient;
//   //                     productDetails.user_id = userInfo?.data?.user?.id;
//   //                     dispatch(getAllCartsd(userDetails));
//   //                     setLoading(false);
//   //                     toast.success(data.message, {
//   //                         position: "bottom-right",
//   //                     });
//   //                 } else {
//   //                     setLoading(false);
//   //                     toast.error(data.message, {
//   //                         position: "bottom-right",
//   //                     });
//   //                 }
//   //             }).catch((error) => {
//   //                 if (error) {
//   //                     setLoading(false);
//   //                     console.log("Add wishlist error:", error);
//   //                 }
//   //             })
//   //         }

//   //     } else {
//   //         setModalShow(true);
//   //     }

//   // };

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     if (!userInfo) {
//       setModalShow(true);
//       return;
//     }

//     if (!activevarient) {
//       toast.error("Please select a product size", {
//         position: "bottom-right",
//       });
//       return;
//     }

//     setLoading(true);
//     const userDetails = {
//       product_id: productDetails?.id,
//       user_id: userInfo?.data?.user?.id,
//       varient_id: activevarient,
//     };

//     try {
//       const data = await addCart(userDetails);
//       if (data.success) {
//         // Update Redux store
//         dispatch(
//           addToCart({
//             ...productDetails,
//             activevar: activevarient,
//             cartQuantity: 1,
//           })
//         );
//         dispatch(getTotals());
//         dispatch(getAllCartsd(userDetails));

//         // Show success message
//         toast.success(data.message, {
//           position: "bottom-right",
//         });
//       } else {
//         toast.error(data.message || "Failed to add product to cart", {
//           position: "bottom-right",
//         });
//       }
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       toast.error("An error occurred while adding to cart. Please try again.", {
//         position: "bottom-right",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleAddToBuy = async (e) => {
//     e.preventDefault();
//     if (!userInfo) {
//       setModalShow(true);
//       return;
//     }

//     if (!activevarient) {
//       toast.error("Please select a product size", {
//         position: "bottom-right",
//       });
//       return;
//     }

//     setLoading(true);
//     const userDetails = {
//       product_id: productDetails?.id,
//       user_id: userInfo?.data?.user?.id,
//       varient_id: activevarient,
//     };

//     try {
//       const data = await addCart(userDetails);
//       if (data.success) {
//         // Update Redux store
//         dispatch(
//           addToCart({
//             ...productDetails,
//             activevar: activevarient,
//             cartQuantity: 1,
//           })
//         );
//         dispatch(getTotals());
//         dispatch(getAllCartsd(userDetails));

//         // Show success message
//         toast.success(data.message, {
//           position: "bottom-right",
//         });

//         // Navigate to checkout
//         navigate("/checkout");
//       } else {
//         toast.error(data.message || "Failed to add product to cart", {
//           position: "bottom-right",
//         });
//       }
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       toast.error("An error occurred while adding to cart. Please try again.", {
//         position: "bottom-right",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   // const handleAddToBuy = (e) => {
//   //     if (userInfo) {
//   //         if (activevarient == '') {
//   //             toast.error("Please select a product size", {
//   //                 position: "bottom-right",
//   //             });
//   //         } else {
//   //             setLoading(true);
//   //             const userDetails = {
//   //                 product_id: productDetails?.id,
//   //                 user_id: userInfo?.data?.user?.id,
//   //                 varient_id: activevarient
//   //             }
//   //             // Optimistically update cart state
//   //             dispatch(addToCart({ ...productDetails, activevar: activevarient, cartQuantity: 1 }));
//   //             dispatch(getTotals());
//   //             addCart(userDetails).then((data) => {
//   //                 if (data.success) {
//   //                     // productDetails.activevar = activevarient;
//   //                     // productDetails.user_id = userInfo?.data?.user?.id;
//   //                     dispatch(getAllCartsd(userDetails));
//   //                     setLoading(false);
//   //                     navigate("/checkout");
//   //                 } else {
//   //                     setLoading(false);
//   //                     toast.error(data.message, {
//   //                         position: "bottom-right",
//   //                     });
//   //                 }
//   //             }).catch((error) => {
//   //                 if (error) {
//   //                     setLoading(false);
//   //                     console.log("Add wishlist error:", error);
//   //                 }
//   //             })
//   //         }

//   //     } else {
//   //         setModalShow(true);
//   //     }

//   // };
//   const getWishListData = () => {
//     const userDetailsd = {
//       user_id: userInfo?.data?.user?.id,
//       product_id: productDetails?.id,
//     };
//     getWishList(userDetailsd)
//       .then((data) => {
//         if (data.status) {
//           setwishlisticon(true);
//         } else {
//           setwishlisticon(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching withlist list:", error);
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     if (userInfo) {
//       getWishListData();
//     }
//   }, []);

//   const [formData, setFormData] = useState({
//     shoulder: "",
//     toplength: "",
//     bust: "",
//     bottomlengthwithheels: "",
//     underbust: "",
//     kurtalengthwithheels: "",
//     armhole: "",
//     frontneckdepth: "",
//     sleevelength: "",
//     backneckdepth: "",
//     bicep: "",
//     crotchlength: "",
//     elbow: "",
//     thighcircumference: "",
//     kneecircumference: "",
//     waist: "",
//     calfcircumference: "",
//     lowerwaist: "",
//     anklecircumference: "",
//     hip: "",
//     knowemail: "",
//     knowmobile: "",
//   });
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name == "knowmobile") {
//       const re = /^[0-9\b]+$/;
//       if (e.target.value.length <= 10 && re.test(e.target.value)) {
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           [name]: value,
//         }));
//       }
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleaddCustomTailoredSubmit = (e) => {
//     e.preventDefault();
//     if (userInfo) {
//       setShowLoader(true);
//       const userDetails = {
//         formData: formData,
//         user_id: userInfo?.data?.user?.id,
//         product_id: productDetails?.id,
//         varient_id: activevarient,
//       };

//       addCustomTailored(userDetails)
//         .then((data) => {
//           setShowLoader(false);
//           if (data.success) {
//             setsuccessm(data.message);
//             seterrors([]);
//             setFormData({
//               shoulder: "",
//               toplength: "",
//               bust: "",
//               bottomlengthwithheels: "",
//               underbust: "",
//               kurtalengthwithheels: "",
//               armhole: "",
//               frontneckdepth: "",
//               sleevelength: "",
//               backneckdepth: "",
//               bicep: "",
//               crotchlength: "",
//               elbow: "",
//               thighcircumference: "",
//               kneecircumference: "",
//               waist: "",
//               calfcircumference: "",
//               lowerwaist: "",
//               anklecircumference: "",
//               hip: "",
//               knowemail: "",
//               knowmobile: "",
//             });
//             navigate(`/ordersuccess/${data?.data?.id}`);
//           } else {
//             setsuccessm("");
//             seterrors(data.message);
//           }
//         })
//         .catch((error) => {
//           if (error) {
//             setShowLoader(false);
//             console.log("Add address error:", error);
//           }
//         });
//     } else {
//       setModalShow(true);
//     }
//   };

//   const [dontKnowformData, setDontKnowFormData] = useState({
//     neme: "",
//     email: "",
//     mobile: "",
//     special_request: "",
//   });
//   const handledontKnowInputChange = (e) => {
//     const { name, value } = e.target;
//     console.log("name", name);
//     if (name == "mobile") {
//       const re = /^[0-9\b]+$/;
//       if (value.length <= 10 && re.test(value)) {
//         setDontKnowFormData((prevFormData) => ({
//           ...prevFormData,
//           [name]: value,
//         }));
//       }
//     } else {
//       setDontKnowFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const handledontKnowaddCustomTailoredSubmit = (e) => {
//     e.preventDefault();
//     if (userInfo) {
//       setShowLoaderdn(true);
//       const userDetails = {
//         formData: dontKnowformData,
//         user_id: userInfo?.data?.user?.id,
//         product_id: productDetails?.id,
//         varient_id: activevarient,
//       };

//       addDontKnowCustomTailored(userDetails)
//         .then((data) => {
//           setShowLoaderdn(false);
//           if (data.success) {
//             setsuccessmdontknow(data.message);
//             seterrorsdontknow([]);
//             setDontKnowFormData({
//               name: "",
//               email: "",
//               mobile: "",
//               special_request: "",
//             });
//             navigate(`/ordersuccess/${data?.data?.id}`);
//           } else {
//             setsuccessmdontknow("");
//             seterrorsdontknow(data.message);
//           }
//         })
//         .catch((error) => {
//           if (error) {
//             setShowLoader(false);
//             console.log("Add Dont Know Custom Tailored error:", error);
//           }
//         });
//     } else {
//       setModalShow(true);
//     }
//   };
//   const couponCopy = (couponCode) => {
//     navigator.clipboard.writeText(couponCode);
//     toast.success("Coupon Copied", {
//       position: "bottom-right",
//     });
//   };

//   const [shownewsLoader, setShownewsLoader] = useState(false);
//   const [newsemail, setnewsemail] = useState("");
//   const [errorsnews, seterrorsnews] = useState([]);
//   const [successmnews, setsuccessmnews] = useState("");
//   const handleNewslSubmit = (e) => {
//     e.preventDefault();
//     setShownewsLoader(true);
//     const userDetailsnews = {
//       email: newsemail,
//     };

//     addNewsletter(userDetailsnews)
//       .then((data) => {
//         setShownewsLoader(false);
//         if (data.status) {
//           setnewsemail("");

//           setsuccessmnews(data.message);
//           seterrorsnews([]);
//         } else {
//           setsuccessm("");
//           seterrorsnews(data.message);
//         }
//       })
//       .catch((error) => {
//         if (error) {
//           setShownewsLoader(false);
//           console.log("Add newsletter error:", error);
//         }
//       });
//   };
//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <div className="flex offset-xs1 xs6">
//         <div className="ProductDetailRight">
//           <div className="layout justify-space-between">
//             <Link className="ProductTitle demi-bold h1">
//               {" "}
//               {productDetails?.product_title}{" "}
//             </Link>
//             <div className="m-l-10 btn-icon ProductToWishlist flex xs1">
//               {wishlisticon ? (
//                 <button
//                   className="m-l-10 btn-icon ProductToWishlist flex xs1"
//                   onClick={removewishlist}
//                 >
//                   <BsHeartFill
//                     style={{ color: "red", width: "18px", height: "18px" }}
//                   />
//                 </button>
//               ) : (
//                 <button
//                   className="m-l-10 btn-icon ProductToWishlist flex xs1"
//                   onClick={handlewishlist}
//                 >
//                   <BsHeart style={{ width: "18px", height: "18px" }} />
//                 </button>
//               )}
//             </div>
//           </div>
//           <p className="ProductDesc p1 orat-dark-grey-color">
//             {" "}
//             {productDetails?.product_short_description}{" "}
//           </p>
//           <div className="layout align-start justify-space-between sectionSeparator sectionSeparator-bg">
//             <div>
//               <div className="ProductPrice">
//                 <div className="layout align-center">
//                   <span className="h4 m-r-10 demi-bold mb-0">
//                     <i className="fa fa-inr" style={{ fontSize: "13px" }}></i>
//                     {activesaleprice}
//                   </span>
//                   {activediscountamount > 0 && (
//                     <span className="p2 m-r-10 orat-light-grey demi-bold InitialPrice">
//                       <i className="fa fa-inr" style={{ fontSize: "13px" }}></i>
//                       {activeprice}
//                     </span>
//                   )}
//                   <span className="p2 orat-color demi-bold m-r-10">
//                     {activediscounttype == "flat"
//                       ? `${activediscountamount} FLAT OFF`
//                       : ""}
//                     {activediscounttype == "percentage"
//                       ? `${activediscountamount}% OFF`
//                       : ""}
//                   </span>
//                   <div className="psl-tooltip start-from-right">
//                     <MdInfoOutline
//                       style={{
//                         width: "24px",
//                         height: "24px",
//                         marginBottom: "8px",
//                         marginLeft: "10px",
//                       }}
//                     />
//                     <div className="psl-tooltip-content p2">
//                       <p className="bold p-b-5">Price Details</p>
//                       <div className="layout justify-space-between border-b-grey p-b-10 m-b-10">
//                         <div>
//                           <p>Maximum Retail Price</p>
//                           <p>(Incl. of all taxes)</p>
//                         </div>
//                         <span className="demi-bold">
//                           <i
//                             className="fa fa-inr"
//                             style={{ fontSize: "13px" }}
//                           ></i>
//                           {activeprice}
//                         </span>
//                       </div>
//                       <div className="layout justify-space-between p-b-10">
//                         <p>Discount</p>
//                         <span className="demi-bold">
//                           {activediscounttype == "flat"
//                             ? `${activediscountamount} FLAT OFF`
//                             : ""}
//                           {activediscounttype == "percentage"
//                             ? `${activediscountamount}% OFF`
//                             : ""}
//                         </span>
//                       </div>
//                       <div className="layout justify-space-between p-b-5">
//                         <div>
//                           <p>Selling Price</p>
//                           <p>(Incl. of all taxes)</p>
//                         </div>
//                         <span className="demi-bold">
//                           <i
//                             className="fa fa-inr"
//                             style={{ fontSize: "13px" }}
//                           ></i>
//                           {activesaleprice}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="p3 orat-dark-grey-color demi-bold">
//                   inclusive of all taxes
//                 </p>
//                 {productDetails?.quantity <= 0 ? (
//                   <>
//                     <div className="casdP col-12-12">
//                       <div className="Z8JjpR">Sold Out</div>
//                       <div className="nbiUlm">
//                         This item is currently out of stock
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="AvailableProductColorContainer sectionSeparator sectionSeparator-bg ">
//             <h6 className="h6 text-uppercase fw-bold ms-1">Available Colors</h6>
//             <div className="layout row align-center justify-start ms-0">
//               {variants.length > 0 &&
//                 variants.map((data, index) => (
//                   <Link
//                     className="AvailableProductColor"
//                     to={`?coolorvar=${data?.varid}`}
//                     key={index}
//                   >
//                     <div
//                       className="DynamicHeightLoaderWrapper"
//                       style={{ paddingTop: "60%" }}
//                     >
//                       <div
//                         className="DynamicHeightLoader layout row align-center justify-center"
//                         style={{ paddingTop: "89%" }}
//                       >
//                         <img
//                           src={data?.color_thumbnail}
//                           className="img-resp DynamicHeightLoaderImage"
//                         />
//                         <div class="animated-bg-placeholder"></div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//             </div>
//           </div>
//           <div className="ProductSizes m-b-15">
//             <div>
//               <div className="layout m-b-10 m-l-5 p-t-15 justify-content-between-sm">
//                 <p className="m-r-5 demi-bold p2">Select your size</p>
//                 <button
//                   className="btn-icon p2 demi-bold p-t-0 bold"
//                   onClick={handleShowSizeModal}
//                 >
//                   Size Guide
//                 </button>
//                 <Modal
//                   show={showSizeModal}
//                   onHide={handleCloseSizeModal}
//                   size="lg"
//                 >
//                   <Modal.Body className="CustomTailoredModal ProductInfoModal">
//                     <div className="singleproduct rc-tabs rc-tabs-top layout column">
//                       <div className="d-none-lg">
//                         <div className="layout toolbarWrap2">
//                           <button
//                             type="button"
//                             className="m12 close-btn btn btn--icon"
//                             onClick={handleCloseSizeModal}
//                           >
//                             <div className="btn__content">
//                               <IoMdClose className="iconNew" />
//                             </div>
//                           </button>
//                         </div>
//                       </div>
//                       <Tabs
//                         id="controlled-tab-example"
//                         // activeKey={key} // Remove if not used
//                         // onSelect={(k) => setKey(k)} // Remove if not used
//                         className="mt-5-sm mb-3 layout custom-tailored-header row"
//                       >
//                         <Tab eventKey="home" title="SIZE GUIDE">
//                           <div className="ProductInfoModalContent layout p-0">
//                             <div className="flex">
//                               <div className="layout align-center justify-space-between full-width">
//                                 <h5 className="bold d-none-sm">
//                                   Size Chart for Women
//                                 </h5>
//                                 <div>
//                                   <div className="layout align-center">
//                                     <h5 className="m-r-8 demi-bold">in</h5>
//                                     <div className="SwitchCheckbox black">
//                                       <input type="checkbox" id="switch" />
//                                       <label for="switch">Toggle</label>
//                                     </div>
//                                     <h5 className="m-l-8 demi-bold orat-light-grey">
//                                       cms
//                                     </h5>
//                                   </div>
//                                 </div>
//                               </div>
//                               <Table
//                                 text-center
//                                 responsive
//                                 className="whats-model"
//                               >
//                                 <thead>
//                                   <tr>
//                                     <th>(in inches)</th>
//                                     <th>UK</th>
//                                     <th>Bust</th>
//                                     <th>Waist</th>
//                                     <th>Hip</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   <tr>
//                                     <td>XS</td>
//                                     <td>4</td>
//                                     <td>32</td>
//                                     <td>26</td>
//                                     <td>36</td>
//                                   </tr>
//                                   <tr>
//                                     <td>S</td>
//                                     <td>4</td>
//                                     <td>32</td>
//                                     <td>26</td>
//                                     <td>36</td>
//                                   </tr>
//                                   <tr>
//                                     <td>M</td>
//                                     <td>4</td>
//                                     <td>32</td>
//                                     <td>26</td>
//                                     <td>36</td>
//                                   </tr>
//                                 </tbody>
//                               </Table>
//                               <div className="SizeGuideHelpSection">
//                                 <div className="layout align-center m-b-8">
//                                   <FaWhatsapp className="whatsapp-icon" />
//                                   <p className="p1 orat-black-color bold m-l-5">
//                                     Whatsapp Us at{" "}
//                                     <span className="orat-black-color">
//                                       {" "}
//                                       <Link className="orat-color">
//                                         {" "}
//                                         +91 9147072827{" "}
//                                       </Link>{" "}
//                                       if you are unsure of your size.{" "}
//                                     </span>
//                                   </p>
//                                 </div>
//                                 <p className="p5">
//                                   This is a standard size guide for the basic
//                                   body measurements. Length will vary according
//                                   to style. There may also be variations in some
//                                   brands commonly with Indian clothing, so
//                                   please refer to the product measurements
//                                   displayed on the product page. Alternatively,
//                                   you may contact our customer care for specific
//                                   queries at
//                                   <Link className="orat-color">
//                                     {" "}
//                                     orth@gmail.com{" "}
//                                   </Link>
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </Tab>
//                         <Tab eventKey="profile" title="MEASURING GUIDE">
//                           <div className="ProductInfoModalContent p-0">
//                             <div className="flex xs12 m-t-15">
//                               <img
//                                 src={Womenm}
//                                 alt="logo"
//                                 className="w-100 d-none-sm"
//                               />
//                               <img
//                                 src={Women}
//                                 alt="logo"
//                                 className="w-100 img-resp d-none-lg"
//                               />
//                             </div>
//                           </div>
//                           <div className="SizeGuideHelpSection">
//                             <div className="layout align-center m-b-8">
//                               <FaWhatsapp className="whatsapp-icon" />
//                               <p className="p1 orat-black-color bold m-l-5">
//                                 Whatsapp Us at{" "}
//                                 <span className="orat-black-color">
//                                   {" "}
//                                   <Link className="orat-color">
//                                     {" "}
//                                     +91 9147072827{" "}
//                                   </Link>{" "}
//                                   if you are unsure of your size.{" "}
//                                 </span>
//                               </p>
//                             </div>
//                             <p className="p5">
//                               This is a standard size guide for the basic body
//                               measurements. Length will vary according to style.
//                               There may also be variations in some brands
//                               commonly with Indian clothing, so please refer to
//                               the product measurements displayed on the product
//                               page. Alternatively, you may contact our customer
//                               care for specific queries at
//                               <Link className="orat-color">
//                                 {" "}
//                                 orth@gmail.com{" "}
//                               </Link>
//                             </p>
//                           </div>
//                         </Tab>
//                         <Tab eventKey="contact" title="HOW TO MEASURE">
//                           <div className="ProductInfoModalContent HowtomeasureguideContent p-0">
//                             <div className="ytplayer-video-container">
//                               <iframe
//                                 width="100%"
//                                 src="https://www.youtube.com/embed/YzfbpPQLmtE?si=xFJrLFZlUIFCIzPN"
//                                 title="YouTube video player"
//                                 frameborder="0"
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                                 allowfullscreen
//                               ></iframe>
//                             </div>
//                           </div>
//                           <div className="SizeGuideHelpSection">
//                             <div className="layout align-center m-b-8">
//                               <FaWhatsapp className="whatsapp-icon" />
//                               <p className="p1 orat-black-color bold m-l-5">
//                                 Whatsapp Us at{" "}
//                                 <span className="orat-black-color">
//                                   {" "}
//                                   <Link className="orat-color">
//                                     {" "}
//                                     +91 9147072827{" "}
//                                   </Link>{" "}
//                                   if you are unsure of your size.{" "}
//                                 </span>
//                               </p>
//                             </div>
//                             <p className="p5">
//                               This is a standard size guide for the basic body
//                               measurements. Length will vary according to style.
//                               There may also be variations in some brands
//                               commonly with Indian clothing, so please refer to
//                               the product measurements displayed on the product
//                               page. Alternatively, you may contact our customer
//                               care for specific queries at
//                               <Link className="orat-color">
//                                 {" "}
//                                 orth@gmail.com{" "}
//                               </Link>
//                             </p>
//                           </div>
//                         </Tab>
//                       </Tabs>
//                     </div>
//                   </Modal.Body>
//                 </Modal>
//               </div>
//               <div className="prel m-l-5 p-t-5">
//                 <div className="ProductSizesOptions layout wrap">
//                   {variants.length > 0 &&
//                     variants.map((data, index) => (
//                       <div
//                         className={
//                           activevarient == data?.varid
//                             ? "active demi-bold"
//                             : "demi-bold"
//                         }
//                         key={index}
//                         onClick={() =>
//                           handleSizeClick(
//                             data?.varid,
//                             data?.price,
//                             data?.product_fit_info,
//                             data?.discount_type,
//                             data?.discount_amount,
//                             data?.saleprice
//                           )
//                         }
//                       >
//                         <span className="text-uppercase p2 demi-bold">
//                           {data?.size}
//                         </span>
//                       </div>
//                     ))}
//                 </div>
//                 <div className="ProductSizesOptions">
//                   <div className=" p-r-12 p-l-12 demi-bold w-40">
//                     {/* <span className="text-uppercase p2 demi-bold" onClick={handleShow}>CUSTOM TAILORED</span> */}
//                     <span
//                       className="text-uppercase p2 demi-bold"
//                       onClick={handleShowCustomModal}
//                     >
//                       CUSTOM TAILORED
//                     </span>
//                     <Modal
//                       show={showCustomModal}
//                       onHide={handleCloseCustomModal}
//                       size="lg"
//                     >
//                       <Modal.Body className="CustomTailoredModal ProductInfoModal CUSTOM-TAILORED">
//                         <div className="singleproduct rc-tabs rc-tabs-top layout column">
//                           <div className="d-none-lg">
//                             <div className="layout toolbarWrap2">
//                               <button
//                                 type="button"
//                                 className="m12 close-btn btn btn--icon"
//                                 onClick={handleCloseCustomModal}
//                               >
//                                 <div className="btn__content">
//                                   <IoMdClose className="iconNew" />
//                                 </div>
//                               </button>
//                               <h3 className="txt-u demi-bold pt15 lh-20">
//                                 Custom Tailored
//                               </h3>
//                             </div>
//                           </div>
//                           {/* <Tabs
//                                                             id="controlled-tab-example"
//                                                             activeKey={key}
//                                                             onSelect={(k) => setKey(k)}
//                                                             className="mt-5-sm mb-3 layout custom-tailored-header row"
//                                                         > */}
//                           <Tabs
//                             id="controlled-tab-example"
//                             // activeKey={key} // Remove if not used
//                             // onSelect={(k) => setKey(k)} // Remove if not used
//                             className="mt-5-sm mb-3 layout custom-tailored-header row"
//                           >
//                             <Tab eventKey="home" title="I KNOW MY SIZE">
//                               <div className="ProductInfoModalContent layout">
//                                 <div className="flex xs6 flexxs10">
//                                   <Alerts
//                                     singleerror={errors}
//                                     successm={successm}
//                                   />
//                                   <form
//                                     onSubmit={handleaddCustomTailoredSubmit}
//                                   >
//                                     <div className="layout column">
//                                       <div className="input-container">
//                                         <div className="layout align-center">
//                                           <label>Choose your units</label>
//                                           <input
//                                             name="unittype"
//                                             onChange={handleInputChange}
//                                             type="radio"
//                                             className="m-r-5 m-l-25"
//                                             value="cms"
//                                             checked={
//                                               formData.unittype === "cms"
//                                             }
//                                           />
//                                           <label>inches</label>
//                                           <input
//                                             name="unittype"
//                                             onChange={handleInputChange}
//                                             type="radio"
//                                             className="m-r-5 m-l-25"
//                                             value="inches"
//                                             checked={
//                                               formData.unittype === "inches"
//                                             }
//                                           />
//                                           <label>cms</label>
//                                         </div>
//                                         {/* <div>
//                                                                                         <div className="layout align-center">
//                                                                                             <label style={{ marginRight: '5px', }}>Choose your units</label>
//                                                                                             <h5 className="m-r-8 demi-bold">in</h5>
//                                                                                             <div className="SwitchCheckbox black">
//                                                                                                 <input type="checkbox" id="switch" name="unittype" value={formData.unittype} onChange={handleInputChange}  />
//                                                                                                 <label for="switch">Toggle</label>
//                                                                                             </div>
//                                                                                             <h5 className="m-l-8 demi-bold orat-light-grey">cms</h5>
//                                                                                         </div>
//                                                                                     </div> */}
//                                       </div>
//                                       <div className="m-b-10">
//                                         <label>
//                                           Tell us your body measurements
//                                         </label>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="shoulder"
//                                               onChange={handleInputChange}
//                                               value={formData.shoulder}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Shoulder"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="toplength"
//                                               onChange={handleInputChange}
//                                               value={formData.toplength}
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Top Length"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="bust"
//                                               onChange={handleInputChange}
//                                               value={formData.bust}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Bust"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="bottomlengthwithheels"
//                                               onChange={handleInputChange}
//                                               value={
//                                                 formData.bottomlengthwithheels
//                                               }
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Bottom Length (with heels)"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="underbust"
//                                               onChange={handleInputChange}
//                                               value={formData.underbust}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Under Bust"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="kurtalengthwithheels"
//                                               onChange={handleInputChange}
//                                               value={
//                                                 formData.kurtalengthwithheels
//                                               }
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Kurta Length (with heels)"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="armhole"
//                                               onChange={handleInputChange}
//                                               value={formData.armhole}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Armhole"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="frontneckdepth"
//                                               onChange={handleInputChange}
//                                               value={formData.frontneckdepth}
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Front Neck Depth"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="sleevelength"
//                                               onChange={handleInputChange}
//                                               value={formData.sleevelength}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Sleeve Length"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="backneckdepth"
//                                               onChange={handleInputChange}
//                                               value={formData.backneckdepth}
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Back Neck Depth"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="bicep"
//                                               onChange={handleInputChange}
//                                               value={formData.bicep}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Bicep"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="crotchlength"
//                                               onChange={handleInputChange}
//                                               value={formData.crotchlength}
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Crotch Length"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="elbow"
//                                               onChange={handleInputChange}
//                                               value={formData.elbow}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Elbow"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="thighcircumference"
//                                               onChange={handleInputChange}
//                                               value={
//                                                 formData.thighcircumference
//                                               }
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Thigh Circumference"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="kneecircumference"
//                                               onChange={handleInputChange}
//                                               value={formData.kneecircumference}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Knee Circumference"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="waist"
//                                               onChange={handleInputChange}
//                                               value={formData.waist}
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Waist"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="calfcircumference"
//                                               onChange={handleInputChange}
//                                               value={formData.calfcircumference}
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Calf Circumference"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="lowerwaist"
//                                               onChange={handleInputChange}
//                                               value={formData.lowerwaist}
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Lower Waist"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="anklecircumference"
//                                               onChange={handleInputChange}
//                                               value={
//                                                 formData.anklecircumference
//                                               }
//                                               className="flex m-r-12"
//                                               type="number"
//                                               placeholder="Ankle Circumference"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="hip"
//                                               onChange={handleInputChange}
//                                               value={formData.hip}
//                                               className="flex m-l-12"
//                                               type="number"
//                                               placeholder="Hip"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>

//                                       <div className="m-b-10">
//                                         <label>Your Contact Details</label>
//                                       </div>
//                                       <div className="input-container m-b-5">
//                                         <div className="layout justify-space-between align-start">
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="knowemail"
//                                               onChange={handleInputChange}
//                                               value={formData.knowemail}
//                                               className="m-r-12"
//                                               type="email"
//                                               placeholder="Email Address"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                           <div className="layout column flex xs6">
//                                             <input
//                                               name="knowmobile"
//                                               onChange={handleInputChange}
//                                               value={formData.knowmobile}
//                                               className="m-l-12"
//                                               type="number"
//                                               placeholder="Mobile Number"
//                                               defaultValue=""
//                                               required
//                                             />
//                                           </div>
//                                         </div>
//                                       </div>
//                                       <div className="">
//                                         <div className="PslCheckbox flex">
//                                           <label>
//                                             <input
//                                               type="checkbox"
//                                               name="detailscorrect"
//                                               className="PslCheckboxInput"
//                                               required
//                                             />
//                                             <span className="PslCheckboxCheckmark"></span>
//                                             <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">
//                                               All the above details are correct
//                                             </span>
//                                           </label>
//                                         </div>
//                                       </div>
//                                       <div className="input-container">
//                                         <div className="layout column flex">
//                                           <div className="layout align-center justify-center">
//                                             <button
//                                               className="flex btn-orat-primary mb-4"
//                                               type="submit"
//                                               disabled={showLoader}
//                                             >
//                                               {!showLoader ? (
//                                                 "SUBMIT"
//                                               ) : (
//                                                 <RotatingLines
//                                                   color="#FFFFFF"
//                                                   height={30}
//                                                   width={30}
//                                                 />
//                                               )}
//                                             </button>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </form>
//                                   <div className="d-none-lg">
//                                     <div className="layout custom-tailored-footer">
//                                       <div className="layout contact-info justify-space-between row wrap">
//                                         <Link className="layout flex xs3 column align-center justify-center">
//                                           <h4>WHATSAPP US</h4>
//                                           <h6>+91 9147072827</h6>
//                                         </Link>
//                                         <Link className="layout column flex xs3 align-center justify-center">
//                                           <h4>PHONE</h4>
//                                           <h6>+91 9147072827</h6>
//                                         </Link>
//                                         <Link className="layout flex xs12 column mt15 pl15 justify-center mb-4">
//                                           <h4>EMAIL</h4>
//                                           <h6>orth@gmail.com</h6>
//                                         </Link>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex xs5 offset-xs1 d-none-sm">
//                                   <div>
//                                     <div className="dynamicImgContainer prel layout row align-center justify-center">
//                                       <img
//                                         src={Women}
//                                         alt="logo"
//                                         className="img-resp"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </Tab>
//                             <Tab
//                               eventKey="profile"
//                               title="I DON'T KNOW MY SIZE"
//                             >
//                               <div className="ProductInfoModalContent">
//                                 <div className="flex xs12 m-t-15">
//                                   <Alerts
//                                     singleerror={errorsdontknow}
//                                     successm={successmdontknow}
//                                   />
//                                   <form
//                                     onSubmit={
//                                       handledontKnowaddCustomTailoredSubmit
//                                     }
//                                   >
//                                     <div className="m-b-10">
//                                       <label className="bold m-b-5">
//                                         Tell us how to get in touch with you
//                                       </label>
//                                     </div>
//                                     <div className="input-container">
//                                       <div className="layout column flex">
//                                         <input
//                                           name="name"
//                                           onChange={handledontKnowInputChange}
//                                           value={dontKnowformData.name}
//                                           type="text"
//                                           placeholder="Full Name"
//                                           defaultValue=""
//                                           required
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="input-container">
//                                       <div className="layout column flex">
//                                         <input
//                                           name="email"
//                                           onChange={handledontKnowInputChange}
//                                           value={dontKnowformData.email}
//                                           type="email"
//                                           placeholder="Email Address"
//                                           defaultValue=""
//                                           required
//                                         />
//                                       </div>
//                                     </div>
//                                     <div className="input-container">
//                                       <input
//                                         name="mobile"
//                                         onChange={handledontKnowInputChange}
//                                         value={dontKnowformData.mobile}
//                                         type="number"
//                                         placeholder="Mobile Number"
//                                         defaultValue=""
//                                         required
//                                       />
//                                     </div>
//                                     <div className="input-container">
//                                       <input
//                                         name="special_request"
//                                         onChange={handledontKnowInputChange}
//                                         value={dontKnowformData.special_request}
//                                         type="text"
//                                         placeholder="Special Request"
//                                         defaultValue=""
//                                         required
//                                       />
//                                     </div>
//                                     <div className="input-container m-t-15">
//                                       <div className="layout align-center justify-center">
//                                         <button
//                                           className="flex btn-orat-primary"
//                                           type="submit"
//                                           disabled={showLoaderdn}
//                                         >
//                                           {!showLoaderdn ? (
//                                             "SUBMIT"
//                                           ) : (
//                                             <RotatingLines
//                                               color="#FFFFFF"
//                                               height={30}
//                                               width={30}
//                                             />
//                                           )}
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </form>
//                                   <div className="d-none-lg">
//                                     <div className="layout custom-tailored-footer">
//                                       <div className="layout contact-info justify-space-between row wrap">
//                                         <Link className="layout flex xs3 column align-center justify-center">
//                                           <h4>WHATSAPP US</h4>
//                                           <h6>+91 9147072827</h6>
//                                         </Link>
//                                         <Link className="layout column flex xs3 align-center justify-center">
//                                           <h4>PHONE</h4>
//                                           <h6>+91 9147072827</h6>
//                                         </Link>
//                                         <Link className="layout flex xs12 column mt15 pl15 justify-center mb-4">
//                                           <h4>EMAIL</h4>
//                                           <h6>orth@gmail.com</h6>
//                                         </Link>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </Tab>
//                             <Tab eventKey="contact" title="HOW TO MEASURE">
//                               <div className="ProductInfoModalContent HowtomeasureguideContent">
//                                 <div className="ytplayer-video-container">
//                                   <iframe
//                                     width="100%"
//                                     src="https://www.youtube.com/embed/YzfbpPQLmtE?si=xFJrLFZlUIFCIzPN"
//                                     title="YouTube video player"
//                                     frameborder="0"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                                     allowfullscreen
//                                   ></iframe>
//                                 </div>
//                               </div>
//                             </Tab>
//                           </Tabs>
//                         </div>
//                       </Modal.Body>
//                     </Modal>
//                   </div>
//                 </div>
//                 {fitinfo && (
//                   <div className="m-b-25 StandardShippingInfo">
//                     <div className="layout align-start justify-start">
//                       <div>
//                         <div className="prel layout align-center">
//                           <img src={Measurement} className="psl-icon" />
//                           <span className="p2 demi-bold m-l-25 m-r-8 text-nowrap p-l-5">
//                             To Fit :
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="layout row">
//                           <div className="layout  font-normal">
//                             <p className="p2 orat-dark-grey-color">
//                               {fitinfo}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {shippinginfo && (
//                   <div className="m-b-25 StandardShippingInfo">
//                     <div className="layout align-start justify-start">
//                       <div>
//                         <div className="prel layout align-center">
//                           <img src={StandardShipping} className="psl-icon" />
//                           <span className="p2 demi-bold m-l-25 m-r-5 text-nowrap p-l-5">
//                             Standard Shipping :{" "}
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <p className="p2 orat-dark-grey-color">
//                           The estimated shipping date for this product is by
//                           20th of October. Please note that this is the shipping
//                           date and not the delivery date.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="layout ProductActionButtons sectionSeparator sectionSeparator-bg">
//             {productDetails?.quantity > 0 ? (
//               <>
//                 <button
//                   onClick={handleAddToBuy}
//                   className="btn-orat-primary flex xs6 bold p2 bold orat-white-color"
//                 >
//                   BUY NOW
//                 </button>
//                 <button
//                   onClick={handleAddToCart}
//                   className="flex xs6 bold p2 bold btn-orat-secondry"
//                 >
//                   ADD TO CART
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button className="btn-orat-primary flex xs6 bold p2 bold orat-white-color opacity-25">
//                   BUY NOW
//                 </button>
//                 <button className="flex xs6 bold p2 bold btn-orat-secondry opacity-25">
//                   ADD TO CART
//                 </button>
//               </>
//             )}
//           </div>
//           <div className="ProductInfo">
//             {couponslist && couponslist?.length > 0 && (
//               <div className="prel">
//                 {couponslist?.map((data, index) => (
//                   <div
//                     className="layout column justify-center ProductInfoBox sectionSeparator merryPromoCode"
//                     key={index}
//                   >
//                     <p className="text-uppercase demi-bold p2">
//                       {data?.coupon_code}
//                     </p>
//                     <div className="layout justify-space-between align-start">
//                       <p className="flex xs9 p4 orat-dark-grey-color">
//                         Purchase this product and receive {data.discount}{" "}
//                         {data.coupon_type == "1" ? `%` : `FLAT`} discount!
//                         <Link
//                           to="/terms-and-conditions"
//                           className="orat-color"
//                           target="_blank"
//                         >
//                           {" "}
//                           (T&amp;C Applied)
//                         </Link>
//                       </p>
//                       <p className="orat-color divWithCaret cursor-pointer layout align-start justify-end p4 demi-bold">
//                         <span onClick={() => couponCopy(data?.coupon_code)}>
//                           COPY CODE
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {/* <div className="prel">
//                                 <div className="layout column justify-center ProductInfoBox sectionSeparator merryPromoCode">
//                                     <p className="text-uppercase demi-bold p2">PRICE MATCH PROMISE</p>
//                                     <div className="layout justify-space-between align-start">
//                                         <p className="flex xs9 p4 orat-dark-grey-color">If you find the product for less we'll match it!
//                                             <Link className="orat-color" target="_blank"> (T&amp;C Applied)</Link></p>
//                                         <p className='orat-color divWithCaret cursor-pointer layout align-start justify-end p4 demi-bold'>
//                                             <span>KNOW MORE</span>
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div> */}
//           </div>
//           <div className="layout row sectionSeparator">
//             <div className="ProductDescription flex xs8">
//               <p className="demi-bold p2">PRODUCT DESCRIPTION</p>
//               <p className="p4 orat-dark-grey-color">
//                 {productDetails?.description}
//               </p>
//             </div>
//             <div className="flex xs4">
//               <p className="demi-bold p2">PRODUCT CODE</p>
//               <p className="p4 orat-dark-grey-color">{productDetails?.sku}</p>
//               {/* <button className="btn-icon orat-color p3 font-normal text-left p-t-0 p-l-0">View Supplier Information</button> */}
//             </div>
//           </div>
//           {/* <div className="layout row wrap ProductSpec sectionSeparator">
//                             <div className="flex xs4">
//                                 <div className="m-r-10">
//                                     <p className="demi-bold p2">Components</p>
//                                     <p className="p4 orat-dark-grey-color">3</p>
//                                 </div>
//                             </div>
//                             <div className="flex xs4">
//                                 <div className="m-r-10">
//                                     <p className="demi-bold p2">FIT</p>
//                                     <p className="p4 orat-dark-grey-color">Fitted at bust and waist.</p>
//                                 </div>
//                             </div>
//                             <div className="flex xs4">
//                                 <div className="m-r-10">
//                                     <p className="demi-bold p2">Composition</p>
//                                     <p className="p4 orat-dark-grey-color">Tulle.</p>
//                                 </div>
//                             </div>
//                             <div className="flex xs4">
//                                 <div className="m-r-10">
//                                     <p className="demi-bold p2">Care</p>
//                                     <p className="p4 orat-dark-grey-color">Dry clean only.</p>
//                                 </div>
//                             </div>
//                         </div> */}
//           <div className="sectionSeparator">
//             <p className="p2 demi-bold">SHIPPING INFORMATION</p>
//             {productDetails?.readytoship_enable == 1 ? (
//               <p className="p4 orat-dark-grey-color">
//                 This product is Ready to be shipped ( will be delivered in next
//                 day ).
//               </p>
//             ) : (
//               <p className="p4 orat-dark-grey-color">
//                 This product will be delivered within 7 days.
//               </p>
//             )}
//           </div>
//           <div className="sectionSeparator">
//             <p className="p2 demi-bold text-uppercase">Disclaimer</p>
//             <ul className="m-l-0 p-l-15 m-t-5 m-b-5">
//               <li className="p4 orat-dark-grey-color">
//                 This product will be exclusively handcrafted for you, making the
//                 colour/texture/pattern slightly vary from the image shown, due
//                 to multiple artisan-led techniques and processes involved.
//               </li>
//             </ul>
//           </div>
//           <div className="sectionSeparator">
//             <div className="flex xs9">
//               <div>
//                 <p className="p4">
//                   <FaWhatsapp style={{ fontSize: "20px" }} /> at +91 9147072827
//                   to know more about the product
//                 </p>
//                 <Alerts singleerror={errorsnews} successm={successmnews} />
//                 <form
//                   onSubmit={handleNewslSubmit}
//                   className="layout justify-space-between"
//                 >
//                   <div className="flex">
//                     <input
//                       type="email"
//                       name="newsemail"
//                       value={newsemail}
//                       onChange={(e) => setnewsemail(e.target.value)}
//                       required=""
//                       className="su-inputBox mobile_input"
//                       placeholder="Here's my Email"
//                       defaultValue=""
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="su-btn btn-orat-primary flex bold h-33"
//                   >
//                     {!shownewsLoader ? (
//                       "Sign Up"
//                     ) : (
//                       <RotatingLines color="#FFFFFF" height={30} width={30} />
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className="layout align-center justify-space-between m-b-25 p-b-25">
//             <div className="flex xs4 mt-0">
//               <div className="layout align-center SocialMediaLinks">
//                 <Link
//                   className="m-r-5"
//                   to="https://www.facebook.com/oratkolkata"
//                   target="_blank"
//                 >
//                   {" "}
//                   <FaFacebookSquare
//                     style={{
//                       width: "18px",
//                       height: "18px",
//                       color: "#000",
//                       margin: "0px 5px",
//                     }}
//                   />{" "}
//                 </Link>
//                 <Link
//                   className="m-r-5"
//                   to="https://www.instagram.com/orat.in?igsh=NDNnOWZzY2JwenU="
//                   target="_blank"
//                 >
//                   {" "}
//                   <FaInstagram
//                     style={{
//                       width: "18px",
//                       height: "18px",
//                       color: "#000",
//                       margin: "0px 5px",
//                     }}
//                   />{" "}
//                 </Link>
//                 {/* <Link className='m-r-5' target="_blank"> <FaTwitter style={{ width: '18px', height: '18px', color: '#000', margin: '0px 5px' }} /> </Link>
//                                     <Link className='m-r-5' target="_blank"> <FaPinterestP style={{ width: '18px', height: '18px', color: '#000', margin: '0px 5px' }} /> </Link> */}
//               </div>
//             </div>
//             <div className="flex xs8">
//               <div className="layout align-center justify-end">
//                 <Link
//                   to="/shipping-information"
//                   target="_blank"
//                   className="m-r-10 p4 demi-bold orat-color-hover text-capitalize"
//                 >
//                   {" "}
//                   SHIPPING POLICY{" "}
//                 </Link>
//                 <Link
//                   to="/how-to-shop"
//                   target="_blank"
//                   className="m-r-10 p4 demi-bold orat-color-hover text-capitalize"
//                 >
//                   {" "}
//                   HELP{" "}
//                 </Link>
//                 <Link
//                   to="/contact"
//                   target="_blank"
//                   className="m-r-10 p4 demi-bold orat-color-hover text-capitalize"
//                 >
//                   {" "}
//                   CONTACT US{" "}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <LoginModal showModal={modalShow} modalHide={modalHide} />
//     </>
//   );
// }
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { MdInfoOutline } from "react-icons/md";
import { Women, Womenm, StandardShipping, Measurement } from "../image";
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { FaFacebookSquare, FaInstagram, FaTwitter, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { FaWhatsapp as FaWhatsapp6 } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartsd, getTotals, addToCart } from '../Redux/features/Cart/CartSlice';
import { getWishListd } from '../Redux/features/wishlist/WishListSlice';
import Loader from "../components/Loader";
import { addWishList, getWishList, removeWishList, addCart, addNewsletter } from '../services/User-service';
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import LoginModal from './loginmodal';
import { addCustomTailored, addDontKnowCustomTailored } from '../services/Product-service';
import Alerts from './Alerts';
import { MobileView, BrowserView } from 'react-device-detect';

export default function SingleProductTextDetails({ productDetails, productVars, couponslist }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const prevProductIdRef = useRef(null);
    const handleShareProduct = () => {
        if (typeof window === "undefined") return;
        const shareUrl = window.location.href;
        const shareTitle = productDetails?.product_title || "ORAT Product";
        const shareText = `Check out ${shareTitle} on ORAT`;
        if (navigator.share) {
            navigator
                .share({ title: shareTitle, text: shareText, url: shareUrl })
                .catch(() => toast.error("Unable to share right now"));
            return;
        }

        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(shareUrl)
                .then(() => toast.success("Product link copied"))
                .catch(() => toast.error("Failed to copy link"));
        } else {
            toast.error("Sharing is not supported in this browser");
        }
    };
    const cartItems = useSelector((state) => state.cart.cartItems); // Access cart items from Redux
    const [showSizeModal, setShowSizeModal] = useState(false);
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [activevarient, setactivevarient] = useState('');
    const [activeprice, setactiveprice] = useState('');
    const [activesaleprice, setactivesaleprice] = useState('');
    const [activediscountamount, setactivediscountamount] = useState('');
    const [activediscounttype, setactivediscounttype] = useState('');
    const [loading, setLoading] = useState(true);
    const [successm, setsuccessm] = useState('');
    const [errors, seterrors] = useState([]);
    const [successmdontknow, setsuccessmdontknow] = useState('');
    const [errorsdontknow, seterrorsdontknow] = useState([]);
    const [wishlisticon, setwishlisticon] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [fitinfo, setFitInfo] = useState('');
    const [shippinginfo, setshipping] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [showSizeError, setShowSizeError] = useState(false);
    const [isCms, setIsCms] = useState(false); // false => inches, true => cms
    
    // Size to Fit mapping based on CSV data
    const sizeToFitMap = {
        'S': { bust: '36in', waist: '34in', hip: '38in' },
        'M': { bust: '38in', waist: '36in', hip: '40in' },
        'L': { bust: '40in', waist: '38in', hip: '42in' },
        'XL': { bust: '42in', waist: '40in', hip: '44in' },
        '2XL': { bust: '44in', waist: '42in', hip: '46in' },
        '3XL': { bust: '46in', waist: '44in', hip: '48in' }
    };
    
    // Helper function to get fit info for a size
    const getFitInfo = (size) => {
        if (!size) return null;
        const sizeUpper = size.toUpperCase().trim();
        // Handle variations like "M-L-XL" by taking the first size
        const firstSize = sizeUpper.split('-')[0].split('/')[0].trim();
        return sizeToFitMap[firstSize] || null;
    };
    const [showLoaderdn, setShowLoaderdn] = useState(false);
    const [shakeSizeSelection, setShakeSizeSelection] = useState(false);
    const [showSizeSuggestionPopup, setShowSizeSuggestionPopup] = useState(false);
    const [variants, setVariants] = useState(productVars || []);

    const sizeChart = productDetails?.size_chart || null;
    const sizeChartColumns = useMemo(() => {
        const cols = Array.isArray(sizeChart?.columns) ? [...sizeChart.columns] : [];
        return cols.sort((a, b) => (Number(a?.sort_order) || 0) - (Number(b?.sort_order) || 0));
    }, [sizeChart]);

    const sizeChartRows = useMemo(() => {
        const rows = Array.isArray(sizeChart?.rows) ? [...sizeChart.rows] : [];
        return rows.sort((a, b) => (Number(a?.sort_order) || 0) - (Number(b?.sort_order) || 0));
    }, [sizeChart]);

    const getRowLabel = (row) => {
        return (
            row?.label ||
            row?.title ||
            row?.name ||
            row?.key ||
            row?.size ||
            row?.id ||
            ''
        );
    };

    const getCellValue = (row, col) => {
        if (!row || !col) return '';
        const key = col?.key || col?.label;

        // 0) cells as an object map by column id: row.cells = { "13": 4, "14": 32 }
        const cellsMap = row?.cells;
        if (cellsMap && !Array.isArray(cellsMap) && typeof cellsMap === 'object') {
            const byId = cellsMap?.[col?.id];
            if (byId !== undefined && byId !== null && byId !== '') return byId;

            if (col?.id !== undefined && col?.id !== null) {
                const byStringId = cellsMap?.[String(col.id)];
                if (byStringId !== undefined && byStringId !== null && byStringId !== '') return byStringId;
            }

            if (key) {
                const byKey = cellsMap?.[key];
                if (byKey !== undefined && byKey !== null && byKey !== '') return byKey;
                const byLowerKey = cellsMap?.[String(key).toLowerCase()];
                if (byLowerKey !== undefined && byLowerKey !== null && byLowerKey !== '') return byLowerKey;
            }
        }

        // 1) direct properties on row: row['UK'], row['bust'], etc.
        if (key) {
            const direct = row?.[key];
            if (direct !== undefined && direct !== null && direct !== '') return direct;

            const lower = row?.[String(key).toLowerCase()];
            if (lower !== undefined && lower !== null && lower !== '') return lower;
        }

        // 2) values as an object map: row.values = { UK: 4, BUST: 32 }
        const values = row?.values;
        if (values && !Array.isArray(values) && typeof values === 'object') {
            if (key) {
                const v1 = values?.[key];
                if (v1 !== undefined && v1 !== null && v1 !== '') return v1;
                const v2 = values?.[String(key).toLowerCase()];
                if (v2 !== undefined && v2 !== null && v2 !== '') return v2;
            }

            const byId = values?.[col?.id];
            if (byId !== undefined && byId !== null && byId !== '') return byId;
        }

        // 3) values as an array: row.values = [{column_id: 13, value: 4}, ...]
        if (Array.isArray(values)) {
            const found = values.find((v) => {
                const cid = v?.column_id ?? v?.columnId ?? v?.col_id ?? v?.id;
                if (col?.id && cid && String(cid) === String(col.id)) return true;

                const vKey = v?.key ?? v?.column_key ?? v?.columnKey ?? v?.label;
                if (key && vKey && String(vKey).toLowerCase() === String(key).toLowerCase()) return true;

                const vLabel = v?.label ?? v?.column_label;
                if (col?.label && vLabel && String(vLabel).toLowerCase() === String(col.label).toLowerCase()) return true;

                return false;
            });

            if (found) {
                const val = found?.value ?? found?.val ?? found?.data ?? found?.size_value;
                if (val !== undefined && val !== null) return val;
            }
        }

        // 4) alternate naming used by some APIs
        const alt = row?.row_values || row?.rowValues || row?.cells;
        if (Array.isArray(alt)) {
            const found = alt.find((v) => {
                const cid = v?.column_id ?? v?.columnId ?? v?.col_id ?? v?.id;
                if (col?.id && cid && String(cid) === String(col.id)) return true;
                const vKey = v?.key ?? v?.column_key ?? v?.columnKey ?? v?.label;
                if (key && vKey && String(vKey).toLowerCase() === String(key).toLowerCase()) return true;
                return false;
            });
            if (found) {
                const val = found?.value ?? found?.val ?? found?.data;
                if (val !== undefined && val !== null) return val;
            }
        }

        return '';
    };

    const formatSizeNumber = (raw) => {
        if (raw === null || raw === undefined || raw === '') return '';
        const num = Number(raw);
        if (!Number.isFinite(num)) return raw;

        const unitRaw = (sizeChart?.unit || '').toString().toLowerCase();
        const baseUnit = unitRaw.includes('cm') ? 'cms' : 'in';
        const targetUnit = isCms ? 'cms' : 'in';

        if (baseUnit === targetUnit) return num;
        if (baseUnit === 'in' && targetUnit === 'cms') return Math.round(num * 2.54);
        if (baseUnit === 'cms' && targetUnit === 'in') return Math.round((num / 2.54) * 10) / 10;
        return num;
    };
    const [formData, setFormData] = useState({
        unittype: "inches",
        shoulder: "",
        toplength: "",
        bust: "",
        bottomlengthwithheels: "",
        underbust: "",
        kurtalengthwithheels: "",
        armhole: "",
        frontneckdepth: "",
        sleevelength: "",
        backneckdepth: "",
        bicep: "",
        crotchlength: "",
        elbow: "",
        thighcircumference: "",
        kneecircumference: "",
        waist: "",
        calfcircumference: "",
        lowerwaist: "",
        anklecircumference: "",
        hip: "",
        knowemail: "",
        knowmobile: "",
    });
    const [dontKnowformData, setDontKnowFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        special_request: "",
    });
    const [shownewsLoader, setShownewsLoader] = useState(false);
    const [newsemail, setnewsemail] = useState('');
    const [errorsnews, seterrorsnews] = useState([]);
    const [successmnews, setsuccessmnews] = useState('');

    // Helper to format price with Indian-style commas
    const formatPrice = (value) => {
        if (value === null || value === undefined || value === '') return value;
        const num = Number(value);
        if (Number.isNaN(num)) return value;
        return num.toLocaleString('en-IN');
    };

    // Helper to get discount text for tooltip (always show percentage, even 0% OFF)
    const getTooltipDiscountText = () => {
        const mrpRaw = activeprice || productDetails?.price;
        const sellingRaw = activesaleprice || productDetails?.saleprice || mrpRaw;

        const mrp = Number(mrpRaw) || 0;
        const selling = Number(sellingRaw) || 0;

        if (mrp <= 0) {
            return '0% OFF';
        }

        const diff = mrp - selling;
        if (diff <= 0) {
            return '0% OFF';
        }

        const percent = Math.round((diff / mrp) * 100);
        if (!Number.isFinite(percent) || percent <= 0) {
            return '0% OFF';
        }
        return `${percent}% OFF`;
    };

    // Helper to get discount percentage for a given variant (for size chips)
    const getVariantDiscountPercent = (variant) => {
        if (!variant) return 0;

        const type = (variant.discount_type || '').toString().toLowerCase();
        const amount = Number(variant.discount_amount) || 0;
        const price = Number(variant.price) || 0;
        const sale = Number(variant.saleprice) || 0;

        if (type === 'percentage' && amount > 0) return Math.round(amount);

        if (price > 0 && sale > 0 && sale < price) {
            const percent = Math.round(((price - sale) / price) * 100);
            return percent > 0 ? percent : 0;
        }

        return 0;
    };

    // Check if product with same size is in cart
    const isProductInCart = () => {
        return cartItems.some(
            (item) => item.id === productDetails?.id && item.activevar === activevarient
        );
    };

    const handleCloseSizeModal = () => setShowSizeModal(false);
    const handleShowSizeModal = () => setShowSizeModal(true);
    const handleCloseCustomModal = () => setShowCustomModal(false);
    const handleShowCustomModal = () => setShowCustomModal(true);
    const modalHide = () => setModalShow(false);

    const handlewishlist = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            setModalShow(true);
            return;
        }
        setLoading(true);
        const userDetails = {
            product_id: productDetails?.id,
            user_id: userInfo?.data?.user?.id,
        };
        try {
            const data = await addWishList(userDetails);
            if (data.status) {
                setwishlisticon(true);
                dispatch(getWishListd(userDetails));
                toast.success("Product added to wish list successful...", { position: "bottom-right" });
            }
        } catch (error) {
            console.error("Add wishlist error:", error);
            toast.error("Failed to add to wishlist", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    const removewishlist = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            setModalShow(true);
            return;
        }
        setLoading(true);
        const userDetails = {
            product_id: productDetails?.id,
            user_id: userInfo?.data?.user?.id,
        };
        try {
            const data = await removeWishList(userDetails);
            if (data.status) {
                setwishlisticon(false);
                dispatch(getWishListd(userDetails));
                toast.success("Removed from wishlist!", { position: "bottom-right" });
            }
        } catch (error) {
            console.error("Remove wishlist error:", error);
            toast.error("Failed to remove from wishlist", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    const handleSizeClick = (envpriceid, price, product_fit_info, discount_type, discount_amount, saleprice, size) => {
        setactivevarient(envpriceid);
        setactiveprice(price);
        setactivesaleprice(saleprice);
        setactivediscountamount(discount_amount);
        setactivediscounttype(discount_type);
        setFitInfo(product_fit_info);
        setSelectedSize(size);
        setshipping(true);
        setShowSizeError(false);
        // Close size suggestion popup on mobile once a size is selected
        setShowSizeSuggestionPopup(false);
    };

    const buildCartPayload = () => {
        const selectedVariant = variants.find((variant) => variant?.varid === activevarient) || {};
        return {
            ...productDetails,
            activevar: activevarient,
            envpriceid: selectedVariant?.envpriceid || activevarient,
            size: selectedSize || selectedVariant?.size || "",
            productvariants: variants || [],
            price: selectedVariant?.price ?? activeprice ?? productDetails?.price,
            saleprice: selectedVariant?.saleprice ?? activesaleprice ?? productDetails?.saleprice,
            discount_amount: selectedVariant?.discount_amount ?? activediscountamount ?? productDetails?.discount_amount,
            discount_type: selectedVariant?.discount_type ?? activediscounttype ?? productDetails?.discount_type,
            cartQuantity: 1,
        };
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!activevarient) {
            setShowSizeError(true);
            // Check if animation already shown for this product in current page load
            const pageLoadKey = `pageLoad_${productDetails?.id}`;
            const animationKey = `shakeAnimation_${productDetails?.id}`;
            const currentPageLoad = sessionStorage.getItem(pageLoadKey);
            const lastAnimationPageLoad = sessionStorage.getItem(animationKey);
            
            // Only show animation if not shown in current page load
            if (currentPageLoad !== lastAnimationPageLoad) {
                setShakeSizeSelection(true);
                setTimeout(() => {
                    setShakeSizeSelection(false);
                }, 500);
                // Mark animation as shown for current page load
                sessionStorage.setItem(animationKey, currentPageLoad);
            }
            
            // Mobile: show size suggestion popup, Desktop: show toast
            if (window.innerWidth <= 768) {
                setShowSizeSuggestionPopup(true);
            }
            return;
        }
        // If product is already in cart, navigate to cart
        if (isProductInCart()) {
            navigate("/checkout");
            return;
        }
        setLoading(true);
        
        const cartPayload = buildCartPayload();

        // If user is not logged in, add to cart using localStorage only
        if (!userInfo) {
            try {
                dispatch(addToCart(cartPayload));
                dispatch(getTotals());
                toast.success("Added to Cart", { position: "bottom-right" });
            } catch (error) {
                console.error("Add to cart error:", error);
                toast.error("An error occurred while adding to cart. Please try again.", {
                    position: "bottom-right",
                });
            } finally {
                setLoading(false);
            }
            return;
        }
        
        // If user is logged in, proceed with API call
        const userDetails = {
            product_id: productDetails?.id,
            user_id: userInfo?.data?.user?.id,
            varient_id: activevarient,
        };
        try {
            const data = await addCart(userDetails);
            if (data.success) {
                dispatch(addToCart(cartPayload));
                dispatch(getTotals());
                dispatch(getAllCartsd(userDetails));
                toast.success("Added to Cart", { position: "bottom-right" });
            } else {
                toast.error(data.message || "Failed to add product to cart", {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("An error occurred while adding to cart. Please try again.", {
                position: "bottom-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddToBuy = async (e) => {
        e.preventDefault();
        if (!activevarient) {
            setShowSizeError(true);
            // Check if animation already shown for this product in current page load
            const pageLoadKey = `pageLoad_${productDetails?.id}`;
            const animationKey = `shakeAnimation_${productDetails?.id}`;
            const currentPageLoad = sessionStorage.getItem(pageLoadKey);
            const lastAnimationPageLoad = sessionStorage.getItem(animationKey);
            
            // Only show animation if not shown in current page load
            if (currentPageLoad !== lastAnimationPageLoad) {
                setShakeSizeSelection(true);
                setTimeout(() => {
                    setShakeSizeSelection(false);
                }, 500);
                // Mark animation as shown for current page load
                sessionStorage.setItem(animationKey, currentPageLoad);
            }
            
            // Mobile: show size suggestion popup, Desktop: show toast
            if (window.innerWidth <= 768) {
                setShowSizeSuggestionPopup(true);
            }
            return;
        }
        // If product is already in cart, navigate to checkout
        if (isProductInCart()) {
            navigate("/checkout");
            return;
        }
        setLoading(true);
        
        const cartPayload = buildCartPayload();

        // If user is not logged in, add to cart using localStorage and navigate to checkout
        if (!userInfo) {
            try {
                dispatch(addToCart(cartPayload));
                dispatch(getTotals());
                toast.success("Added to Cart", { position: "bottom-right" });
                navigate("/checkout");
            } catch (error) {
                console.error("Add to cart error:", error);
                toast.error("An error occurred while adding to cart. Please try again.", {
                    position: "bottom-right",
                });
            } finally {
                setLoading(false);
            }
            return;
        }
        
        // If user is logged in, proceed with API call
        const userDetails = {
            product_id: productDetails?.id,
            user_id: userInfo?.data?.user?.id,
            varient_id: activevarient,
        };
        try {
            const data = await addCart(userDetails);
            if (data.success) {
                dispatch(addToCart(cartPayload));
                dispatch(getTotals());
                dispatch(getAllCartsd(userDetails));
                toast.success(data.message, { position: "bottom-right" });
                navigate("/checkout");
            } else {
                toast.error(data.message || "Failed to add product to cart", {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("An error occurred while adding to cart. Please try again.", {
                position: "bottom-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const getWishListData = async () => {
        if (!userInfo) return;
        const userDetailsd = {
            user_id: userInfo?.data?.user?.id,
            product_id: productDetails?.id,
        };
        try {
            const data = await getWishList(userDetailsd);
            setwishlisticon(data.status);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    useEffect(() => {
        // Store page load timestamp for animation tracking
        const pageLoadKey = `pageLoad_${productDetails?.id}`;
        const currentPageLoad = Date.now().toString();
        sessionStorage.setItem(pageLoadKey, currentPageLoad);
        
        if (productVars) setVariants(productVars);

        const isNewProduct = prevProductIdRef.current !== productDetails?.id;
        const shouldInitSize = isNewProduct || (!activevarient && productVars && productVars.length > 0);
        
        if (productDetails?.id) {
            prevProductIdRef.current = productDetails.id;
        }

        if (shouldInitSize && productDetails) {
            if (productVars && productVars.length > 0) {
                const sizeOrder = ['3xs', 'xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', 'xxl', '3xl', 'xxxl', '4xl', '5xl', '6xl'];
                const sortedVars = [...productVars].sort((a, b) => {
                    const sizeA = (a.size || '').toLowerCase().trim();
                    const sizeB = (b.size || '').toLowerCase().trim();
                    const indexA = sizeOrder.indexOf(sizeA);
                    const indexB = sizeOrder.indexOf(sizeB);
                    if (indexA === -1 && indexB === -1) return 0;
                    if (indexA === -1) return 1;
                    if (indexB === -1) return -1;
                    return indexA - indexB;
                });
                const lowestVariant = sortedVars[0];
                if (lowestVariant) {
                    setactivevarient(lowestVariant.varid);
                    setactiveprice(lowestVariant.price);
                    setactivesaleprice(lowestVariant.saleprice);
                    setactivediscountamount(lowestVariant.discount_amount || 0);
                    setactivediscounttype(lowestVariant.discount_type || '');
                    setFitInfo(lowestVariant.product_fit_info);
                    setSelectedSize(lowestVariant.size);
                    setshipping(true);
                }
            } else {
                setactivevarient('');
                setactiveprice(productDetails?.price);
                setactivesaleprice(productDetails?.saleprice);
                setactivediscountamount(productDetails?.discount_amount || 0);
                setactivediscounttype(productDetails?.discount_type || '');
            }
        }
        
        setLoading(false);
        if (userInfo) getWishListData();
    }, [productDetails, productVars, userInfo, activevarient]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'knowmobile') {
            const re = /^[0-9\b]+$/;
            if (value.length <= 10 && re.test(value)) {
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleaddCustomTailoredSubmit = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            setModalShow(true);
            return;
        }
        setShowLoader(true);
        const userDetails = {
            formData,
            user_id: userInfo?.data?.user?.id,
            product_id: productDetails?.id,
            varient_id: activevarient,
        };
        try {
            const data = await addCustomTailored(userDetails);
            setShowLoader(false);
            if (data.success) {
                setsuccessm(data.message);
                seterrors([]);
                setFormData({
                    unittype: "inches",
                    shoulder: "",
                    toplength: "",
                    bust: "",
                    bottomlengthwithheels: "",
                    underbust: "",
                    kurtalengthwithheels: "",
                    armhole: "",
                    frontneckdepth: "",
                    sleevelength: "",
                    backneckdepth: "",
                    bicep: "",
                    crotchlength: "",
                    elbow: "",
                    thighcircumference: "",
                    kneecircumference: "",
                    waist: "",
                    calfcircumference: "",
                    lowerwaist: "",
                    anklecircumference: "",
                    hip: "",
                    knowemail: "",
                    knowmobile: "",
                });
                navigate(`/ordersuccess/${data?.data?.id}`);
            } else {
                setsuccessm('');
                seterrors(data.message);
            }
        } catch (error) {
            setShowLoader(false);
            console.error("Add custom tailored error:", error);
            toast.error("An error occurred. Please try again.", { position: "bottom-right" });
        }
    };

    const handledontKnowInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mobile') {
            const re = /^[0-9\b]+$/;
            if (value.length <= 10 && re.test(value)) {
                setDontKnowFormData((prev) => ({ ...prev, [name]: value }));
            }
        } else {
            setDontKnowFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handledontKnowaddCustomTailoredSubmit = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            setModalShow(true);
            return;
        }
        setShowLoaderdn(true);
        const userDetails = {
            formData: dontKnowformData,
            user_id: userInfo?.data?.user?.id,
            product_id: productDetails?.id,
            varient_id: activevarient,
        };
        try {
            const data = await addDontKnowCustomTailored(userDetails);
            setShowLoaderdn(false);
            if (data.success) {
                setsuccessmdontknow(data.message);
                seterrorsdontknow([]);
                setDontKnowFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    special_request: "",
                });
                navigate(`/ordersuccess/${data?.data?.id}`);
            } else {
                setsuccessmdontknow('');
                seterrorsdontknow(data.message);
            }
        } catch (error) {
            setShowLoaderdn(false);
            console.error("Add dont know custom tailored error:", error);
            toast.error("An error occurred. Please try again.", { position: "bottom-right" });
        }
    };

    const couponCopy = (couponCode) => {
        navigator.clipboard.writeText(couponCode);
        toast.success("Coupon Copied", { position: "bottom-right" });
    };

    const handleNewslSubmit = async (e) => {
        e.preventDefault();
        setShownewsLoader(true);
        const userDetailsnews = { email: newsemail };
        try {
            const data = await addNewsletter(userDetailsnews);
            setShownewsLoader(false);
            if (data.status) {
                setnewsemail('');
                setsuccessmnews(data.message);
                seterrorsnews([]);
            } else {
                setsuccessmnews('');
                seterrorsnews(data.message);
            }
        } catch (error) {
            setShownewsLoader(false);
            console.error("Add newsletter error:", error);
            toast.error("An error occurred. Please try again.", { position: "bottom-right" });
        }
    };

    return (
        loading ? (
            <Loader />
        ) : (
            <>
                <div className='flex offset-xs1 xs6'>
                    <div className="ProductDetailRight">
                        <div className="layout justify-space-between">
                            <Link className="ProductTitle demi-bold h1">{productDetails?.product_title}</Link>
                            <div className="m-l-10 btn-icon ProductToWishlist flex xs1 sys_share">
                                {wishlisticon ? (
                                    <button className="m-l-10 btn-icon ProductToWishlist flex xs1" onClick={removewishlist}>
                                        <BsHeartFill style={{ color: 'red', width: '18px', height: '18px' }} />
                                    </button>
                                ) : (
                                    <button className="m-l-10 btn-icon ProductToWishlist flex xs1" onClick={handlewishlist}>
                                        <BsHeart style={{ width: '16px', height: '16px' }} />
                                        {/* <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path> <path d="M17.943 6.88a4.002 4.002 0 0 1 1.056 2.808 4.299 4.299 0 0 1-.368 1.575C17.975 12.673 12 18.35 12 18.35s-5.968-5.681-6.631-7.087A3.707 3.707 0 0 1 5 9.688a4.013 4.013 0 0 1 1.06-2.804A3.503 3.503 0 0 1 8.684 5.75C10.941 5.75 12 8.113 12 8.113s1.055-2.362 3.315-2.362a3.492 3.492 0 0 1 2.628 1.13z" stroke-width="1.5" fill-opacity=".5" fill="#FFF" stroke-linejoin="round" style={{stroke: 'rgb(33, 33, 33)'}}></path></g></svg> */}
                                    </button>
                                )}
                                <button className="m-l-10 btn-icon ProductShareIcon flex xs1" type="button" onClick={handleShareProduct} aria-label="Share product">
                                    <img src="https://img.perniaspopupshop.com/ppus-assets/icons/New_icon-share-black_06_09_23.svg" alt="Share" />
                                </button>
                            </div>
                        </div>
                        <p className="ProductDesc p1 orat-dark-grey-color">{productDetails?.product_short_description}</p>
                        <div className="layout align-start justify-space-between sectionSeparator sectionSeparator-bg">
                            <div>
                                <div className="ProductPrice">
                                    <div className="layout align-center">
                                        <span className="h4 m-r-10 demi-bold mb-0">
                                            {/* <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> */}₹{formatPrice(activesaleprice)}
                                        </span>
                                        {(Number(activediscountamount) > 0 || activediscountamount > 0) && (
                                            <>
                                                <span className="p2 m-r-10 orat-light-grey demi-bold InitialPrice">
                                                    {/* <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> */}₹{formatPrice(activeprice)}
                                                </span>
                                                <span className="p2 orat-color demi-bold m-r-10">
                                                    {(activediscounttype?.toLowerCase() === 'flat' || activediscounttype === 'Flat') ? `${activediscountamount} FLAT OFF` : ''}
                                                    {(activediscounttype?.toLowerCase() === 'percentage' || activediscounttype === 'Percentage') ? `${activediscountamount}% OFF` : ''}
                                                </span>
                                            </>
                                        )}
                                        <div className="psl-tooltip start-from-right">
                                            <MdInfoOutline style={{ width: '24px', height: '24px', marginBottom: '3px', marginLeft: '10px', fontSize: '14px' }} />
                                            <div className="psl-tooltip-content p2">
                                                <p className="bold p-b-5">Price Details</p>
                                                <div className="layout justify-space-between border-b-grey p-b-10 m-b-10">
                                                    <div>
                                                        <p>Maximum Retail Price</p>
                                                        <p>(Incl. of all taxes)</p>
                                                    </div>
                                                    <span className="demi-bold">
                                                        {/* <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> */}₹{formatPrice(activeprice)}
                                                    </span>
                                                </div>
                                                <div className="layout justify-space-between p-b-10">
                                                    <p>Discount</p>
                                                    <span className="demi-bold">
                                                        {getTooltipDiscountText()}
                                                    </span>
                                                </div>
                                                <div className="layout justify-space-between p-b-5">
                                                    <div>
                                                        <p>Selling Price</p>
                                                        <p>(Incl. of all taxes)</p>
                                                    </div>
                                                    <span className="demi-bold">
                                                        {/* <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> */}₹{formatPrice(activesaleprice)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="p3 orat-dark-grey-color demi-bold" style={{ marginTop: '1px' }}>inclusive of all taxes</p>
                                    {productDetails?.quantity <= 0 ? (
                                        <div className="casdP col-12-12">
                                            <div className="Z8JjpR">Sold Out</div>
                                            <div className="nbiUlm">This item is currently out of stock</div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        {/* <div className="AvailableProductColorContainer sectionSeparator sectionSeparator-bg">
                            <h6 className="h6 text-uppercase fw-bold ms-1">Available Colors</h6>
                            <div className="layout row align-center justify-start ms-0">
                                {variants.length > 0 && variants.map((data, index) => (
                                    <Link className="AvailableProductColor" to={`?coolorvar=${data?.varid}`} key={index}>
                                        <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '60%' }}>
                                            <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '89%' }}>
                                                <img src={data?.color_thumbnail} className="img-resp DynamicHeightLoaderImage" />
                                                <div className="animated-bg-placeholder"></div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div> */}
                        <div className="ProductSizes m-b-10">
                            <div>
                                <div className="layout m-b-10 m-l-5 p-t-15 justify-content-between-sm">
                                    <p className="m-r-5 demi-bold p2">Select your size</p>
                                    <button className="btn-icon p2 demi-bold p-t-0 bold" onClick={handleShowSizeModal}>Size Guide</button>
                                    <Modal show={showSizeModal} onHide={handleCloseSizeModal} size="lg">
                                        <Modal.Body className='CustomTailoredModal ProductInfoModal'>
                                            <div className="singleproduct rc-tabs rc-tabs-top layout column">
                                                <div className="d-none-lg">
                                                    <div className="layout toolbarWrap2 align-center justify-space-between" style={{ width: '100%' }}>
                                                        <h5 style={{marginLeft:"15px"}} className="bold m-b-0">SIZE CHART FOR WOMEN</h5>
                                                        <button type="button" className="m12 close-btn btn btn--icon" onClick={handleCloseSizeModal}>
                                                            <div className="btn__content">
                                                                <IoMdClose className="iconNew" />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <Tabs id="controlled-tab-example" className="mt-5-sm mb-3 okli layout custom-tailored-header row size_head">
                                                    <Tab eventKey="home" title="SIZE GUIDE">
                                                        <div className="ProductInfoModalContent layout p-0">
                                                            <div className="flex">
                                                                <div className="layout align-center justify-space-between full-width">
                                                                    <h5 className="bold d-none-sm">Size Chart for Women</h5>
                                                                    <div>
                                                                        <div className="layout align-center">
                                                                            <h5 className={`m-r-8 demi-bold ${!isCms ? '' : 'orat-light-grey'}`}>in</h5>
                                                                            <div className="SwitchCheckbox black">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="switch"
                                                                                    checked={isCms}
                                                                                    onChange={() => setIsCms(prev => !prev)}
                                                                                />
                                                                                <label htmlFor="switch">Toggle</label>
                                                                            </div>
                                                                            <h5 className={`m-l-8 demi-bold ${isCms ? '' : 'orat-light-grey'}`}>cms</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Table text-center responsive className='whats-model'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>{isCms ? '(in cms)' : '(in inches)'}</th>
                                                                            {sizeChartColumns.map((col) => (
                                                                                <th key={col?.id || col?.key || col?.label}>{col?.label || col?.key}</th>
                                                                            ))}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {sizeChart && sizeChartRows.length ? (
                                                                            sizeChartRows.map((row) => (
                                                                                <tr key={row?.id || getRowLabel(row)}>
                                                                                    <td>{getRowLabel(row)}</td>
                                                                                    {sizeChartColumns.map((col) => {
                                                                                        const key = col?.key || col?.label;
                                                                                        const val = getCellValue(row, col);
                                                                                        return (
                                                                                            <td key={col?.id || key}>{formatSizeNumber(val)}</td>
                                                                                        );
                                                                                    })}
                                                                                </tr>
                                                                            ))
                                                                        ) : (
                                                                            <tr>
                                                                                <td colSpan={(sizeChartColumns.length || 0) + 1}>
                                                                                    Size chart not available for this product.
                                                                                </td>
                                                                            </tr>
                                                                        )}
                                                                    </tbody>
                                                                </Table>
                                                                <div className="SizeGuideHelpSection">
                                                                    <div className="layout align-center m-b-8">
                                                                        <FaWhatsapp6 className='whatsapp-icon' />
                                                                        <p className='p1 orat-black-color bold m-l-5'>
                                                                            Whatsapp Us at <span className='orat-black-color'>
                                                                                <a className='orat-color' href="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!" target="_blank" rel="noreferrer">+91 9147072827</a> if you are unsure of your size.
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                    <p className='p5'>
                                                                        This is a standard size guide for the basic body measurements. Length will vary according to style. There may also be variations in some designs, commonly with Indian clothing, so please refer to the product measurements displayed on the product page. Alternatively, you may contact our customer care for specific queries at
                                                                        <Link className='orat-color'>customercare@orat.in</Link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                    <Tab eventKey="profile" title="MEASURING GUIDE">
                                                        <div className="ProductInfoModalContent p-0">
                                                            <div className="flex xs12 m-t-15">
                                                                <img src="https://res.cloudinary.com/dgif730br/image/upload/v1765776725/Side_ways_e12elh.jpg" alt="logo" className='w-100 d-none-sm tailor_img' />
                                                                <img src="https://res.cloudinary.com/dgif730br/image/upload/v1765776725/Side_ways_e12elh.jpg" alt="logo" className='w-100 img-resp d-none-lg tailor_img' />
                                                            </div>
                                                            <div className="SizeGuideHelpSection">
                                                                <div className="layout align-center m-b-8">
                                                                      <FaWhatsapp6 className='whatsapp-icon' />
                                                                    {/* <img className="m-r-8" width="20" height="20" src="https://res.cloudinary.com/dgif730br/image/upload/v1764657100/whatsapp_aoagpj.png" alt="" /> */}
                                                                    <p className='p1 orat-black-color bold m-l-5'>
                                                                        Whatsapp Us at <span className='orat-black-color'>
                                                                            <a className='orat-color' href="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!" target="_blank" rel="noreferrer">+91 9147072827</a> if you are unsure of your size.
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <p className='p5'>
                                                                    This is a standard size guide for the basic body measurements. Length will vary according to style. There may also be variations in some designs, commonly with Indian clothing, so please refer to the product measurements displayed on the product page. Alternatively, you may contact our customer care for specific queries at
                                                                    <Link className='orat-color'>customercare@orat.in</Link>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                    <Tab eventKey="contact" title="HOW TO MEASURE">
                                                        <div className="ProductInfoModalContent HowtomeasureguideContent p-0">
                                                            <div className="ytplayer-video-container">
                                                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/8aliO5CyvVw?si=j4_jpxQA3TOf9Vkh" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                                            </div>
                                                            <div className="SizeGuideHelpSection">
                                                                <div className="layout align-center m-b-8">
                                                                    <FaWhatsapp6 className='whatsapp-icon' />
                                                                    <p className='p1 orat-black-color bold m-l-5'>
                                                                        Whatsapp Us at <span className='orat-black-color'>
                                                                            <a className='orat-color' href="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!" target="_blank" rel="noreferrer">+91 9147072827</a> if you are unsure of your size.
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <p className='p5'>
                                                                    This is a standard size guide for the basic body measurements. Length will vary according to style. There may also be variations in some designs, commonly with Indian clothing, so please refer to the product measurements displayed on the product page. Alternatively, you may contact our customer care for specific queries at
                                                                    <Link className='orat-color'>customercare@orat.in</Link>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                <div className={`prel m-l-5 p-t-5 ${shakeSizeSelection ? 'shake-animation' : ''}`}>
                                    <div className="ProductSizesOptions layout wrap">
                                        {variants.length > 0 && variants.map((data, index) => {
                                            const sizeDiscount = getVariantDiscountPercent(data);
                                            return (
                                                <div
                                                    className={activevarient === data?.varid ? 'active demi-bold' : 'demi-bold'}
                                                    key={index}
                                                    onClick={() => handleSizeClick(data?.varid, data?.price, data?.product_fit_info, data?.discount_type, data?.discount_amount, data?.saleprice, data?.size)}
                                                >
                                                    <span className="text-uppercase p2 demi-bold">{data?.size}</span>
                                                    {sizeDiscount > 0 && (
                                                        <span className="SizeDiscountLabel">{sizeDiscount}%</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <div className="p-r-12 p-l-12 demi-bold">
                                            <span className="text-uppercase p2 demi-bold" onClick={handleShowCustomModal}>CUSTOM TAILORED</span>
                                            <Modal show={showCustomModal} onHide={handleCloseCustomModal} size="lg">
                                                <Modal.Body className='CustomTailoredModal ProductInfoModal CUSTOM-TAILORED'>
                                                    <div className="singleproduct rc-tabs rc-tabs-top layout column">
                                                        <div className="d-none-lg">
                                                            <div className="layout toolbarWrap2">
                                                                <button type="button" className="m12 close-btn btn btn--icon" onClick={handleCloseCustomModal}>
                                                                    <div className="btn__content">
                                                                        <IoMdClose className="iconNew" />
                                                                    </div>
                                                                     <h5 className="bold d-none-sm">Size Chart for Women</h5>
                                                                </button>
                                                                <h3 className="txt-u demi-bold pt15 lh-20">Custom Tailored</h3>
                                                            </div>
                                                        </div>
                                                        <Tabs id="controlled-tab-example" className="mt-5-sm mb-3 layout custom-tailored-header row size_head">
                                                            <Tab eventKey="home" title="I KNOW MY SIZE">
                                                                <div className="ProductInfoModalContent layout">
                                                                    <div className="flex xs6 flexxs10">
                                                                        <Alerts singleerror={errors} successm={successm} />
                                                                        <form onSubmit={handleaddCustomTailoredSubmit}>
                                                                            <div className="layout column">
                                                                                <div className="input-container">
                                                                                    <div className="layout align-center">
                                                                                        <label>Choose your units</label>
                                                                                        <input name="unittype" onChange={handleInputChange} type="radio" className="m-r-5 m-l-25" value="inches" checked={formData.unittype === "inches"} />
                                                                                        <label>inches</label>
                                                                                        <input name="unittype" onChange={handleInputChange} type="radio" className="m-r-5 m-l-25" value="cms" checked={formData.unittype === "cms"} />
                                                                                        <label>cms</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="m-b-10">
                                                                                    <label>Tell us your body measurements</label>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="shoulder" onChange={handleInputChange} value={formData.shoulder} className="flex m-r-12" type="number" placeholder="Shoulder" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="toplength" onChange={handleInputChange} value={formData.toplength} className="flex m-l-12" type="number" placeholder="Top Length" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="bust" onChange={handleInputChange} value={formData.bust} className="flex m-r-12" type="number" placeholder="Bust" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="bottomlengthwithheels" onChange={handleInputChange} value={formData.bottomlengthwithheels} className="flex m-l-12" type="number" placeholder="Bottom Length (with heels)" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="underbust" onChange={handleInputChange} value={formData.underbust} className="flex m-r-12" type="number" placeholder="Under Bust" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="kurtalengthwithheels" onChange={handleInputChange} value={formData.kurtalengthwithheels} className="flex m-l-12" type="number" placeholder="Kurta Length (with heels)" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="armhole" onChange={handleInputChange} value={formData.armhole} className="flex m-r-12" type="number" placeholder="Armhole" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="frontneckdepth" onChange={handleInputChange} value={formData.frontneckdepth} className="flex m-l-12" type="number" placeholder="Front Neck Depth" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="sleevelength" onChange={handleInputChange} value={formData.sleevelength} className="flex m-r-12" type="number" placeholder="Sleeve Length" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="backneckdepth" onChange={handleInputChange} value={formData.backneckdepth} className="flex m-l-12" type="number" placeholder="Back Neck Depth" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="bicep" onChange={handleInputChange} value={formData.bicep} className="flex m-r-12" type="number" placeholder="Bicep" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="crotchlength" onChange={handleInputChange} value={formData.crotchlength} className="flex m-l-12" type="number" placeholder="Crotch Length" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="elbow" onChange={handleInputChange} value={formData.elbow} className="flex m-r-12" type="number" placeholder="Elbow" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="thighcircumference" onChange={handleInputChange} value={formData.thighcircumference} className="flex m-l-12" type="number" placeholder="Thigh Circumference" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="kneecircumference" onChange={handleInputChange} value={formData.kneecircumference} className="flex m-r-12" type="number" placeholder="Knee Circumference" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="waist" onChange={handleInputChange} value={formData.waist} className="flex m-l-12" type="number" placeholder="Waist" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="calfcircumference" onChange={handleInputChange} value={formData.calfcircumference} className="flex m-r-12" type="number" placeholder="Calf Circumference" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="lowerwaist" onChange={handleInputChange} value={formData.lowerwaist} className="flex m-l-12" type="number" placeholder="Lower Waist" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="anklecircumference" onChange={handleInputChange} value={formData.anklecircumference} className="flex m-r-12" type="number" placeholder="Ankle Circumference" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="hip" onChange={handleInputChange} value={formData.hip} className="flex m-l-12" type="number" placeholder="Hip" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="m-b-10">
                                                                                    <label>Your Contact Details</label>
                                                                                </div>
                                                                                <div className="input-container m-b-5">
                                                                                    <div className="layout justify-space-between align-start">
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="knowemail" onChange={handleInputChange} value={formData.knowemail} className="m-r-12" type="email" placeholder="Email Address" required />
                                                                                        </div>
                                                                                        <div className="layout column flex xs6">
                                                                                            <input name="knowmobile" onChange={handleInputChange} value={formData.knowmobile} className="m-l-12" type="number" placeholder="Mobile Number" required />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="">
                                                                                    <div className="PslCheckbox flex">
                                                                                        <label>
                                                                                            <input type="checkbox" name="detailscorrect" className="PslCheckboxInput" required />
                                                                                            <span className="PslCheckboxCheckmark"></span>
                                                                                            <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">All the above details are correct</span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="input-container">
                                                                                    <div className="layout column flex">
                                                                                        <div className="layout align-center justify-center">
                                                                                            <button className="flex btn-orat-primary mb-4" type="submit" disabled={showLoader}>
                                                                                                {!showLoader ? "SUBMIT" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                        <div className="d-none-lg">
                                                                            <div className="layout custom-tailored-footer">
                                                                                <div className="layout contact-info justify-space-between row wrap">
                                                                                    <Link className='layout flex xs3 column align-center justify-center'>
                                                                                        <h4>WHATSAPP US</h4>
                                                                                        <h6>+91 9147072827</h6>
                                                                                    </Link>
                                                                                    <Link className='layout column flex xs3 align-center justify-center'>
                                                                                        <h4>PHONE</h4>
                                                                                        <h6>+91 9147072827</h6>
                                                                                    </Link>
                                                                                    <Link className='layout flex xs12 column mt15 pl15 justify-center mb-4'>
                                                                                        <h4>EMAIL</h4>
                                                                                        <h6>customercare@orat.in</h6>
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex xs5 offset-xs1 d-none-sm">
                                                                        <div>
                                                                            <div className="dynamicImgContainer prel layout row align-center justify-center">
                                                                                <img src="https://res.cloudinary.com/dgif730br/image/upload/v1765777793/Portrait_prmpmt.jpg" alt="logo" className='img-resp' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Tab>
                                                            <Tab eventKey="profile" title="I DON'T KNOW MY SIZE">
                                                                <div className="ProductInfoModalContent">
                                                                    <div className="flex xs12 m-t-15">
                                                                        <Alerts singleerror={errorsdontknow} successm={successmdontknow} />
                                                                        <form onSubmit={handledontKnowaddCustomTailoredSubmit}>
                                                                            <div className="m-b-10">
                                                                                <label className="bold m-b-5">Tell us how to get in touch with you</label>
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <div className="layout column flex">
                                                                                    <input name="name" onChange={handledontKnowInputChange} value={dontKnowformData.name} type="text" placeholder="Full Name" required />
                                                                                </div>
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <div className="layout column flex">
                                                                                    <input name="email" onChange={handledontKnowInputChange} value={dontKnowformData.email} type="email" placeholder="Email Address" required />
                                                                                </div>
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <input name="mobile" onChange={handledontKnowInputChange} value={dontKnowformData.mobile} type="number" placeholder="Mobile Number" required />
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <input name="special_request" onChange={handledontKnowInputChange} value={dontKnowformData.special_request} type="text" placeholder="Special Request" required />
                                                                            </div>
                                                                            <div className="input-container m-t-15">
                                                                                <div className="layout align-center justify-center">
                                                                                    <button className="flex btn-orat-primary" type="submit" disabled={showLoaderdn}>
                                                                                        {!showLoaderdn ? "SUBMIT" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                        <div className="d-none-lg">
                                                                            <div className="layout custom-tailored-footer">
                                                                                <div className="layout contact-info justify-space-between row wrap">
                                                                                    <Link className='layout flex xs3 column align-center justify-center'>
                                                                                        <h4>WHATSAPP US</h4>
                                                                                        <h6>+91 9147072827</h6>
                                                                                    </Link>
                                                                                    <Link className='layout column flex xs3 align-center justify-center'>
                                                                                        <h4>PHONE</h4>
                                                                                        <h6>+91 9147072827</h6>
                                                                                    </Link>
                                                                                    <Link className='layout flex xs12 column mt15 pl15 justify-center mb-4'>
                                                                                        <h4>EMAIL</h4>
                                                                                        <h6>customercare@orat.in</h6>
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Tab>
                                                            <Tab eventKey="contact" title="HOW TO MEASURE">
                                                                <div className="ProductInfoModalContent HowtomeasureguideContent">
                                                                    <div className="ytplayer-video-container">
                                                                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/8aliO5CyvVw?si=j4_jpxQA3TOf9Vkh" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                                                    </div>
                                                                </div>
                                                            </Tab>
                                                        </Tabs>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </div>
                                    </div>
                                    {showSizeError && (
                                        <p className="ProductSizeErrorMessage">
                                            Please select your size.
                                        </p>
                                    )}
                                    {fitinfo && (
                                        <div className="m-b-25 StandardShippingInfo">
                                            <div className="layout align-start justify-start">
                                                <div>
                                                    <div className="prel layout align-center">
                                                        <img src={Measurement} className="psl-icon" />
                                                        <span className="p2 demi-bold m-l-25 m-r-8 text-nowrap p-l-5">To Fit :</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="layout row">
                                                        <div className="layout font-normal">
                                                            <p className="p2 orat-dark-grey-color">{fitinfo}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* To Fit Information - Pernia Style (above Standard Shipping) */}
                                    {activevarient && selectedSize && getFitInfo(selectedSize) && (
                                        <div className="m-b-25 StandardShippingInfo">
                                            <div className="layout align-start justify-start">
                                                <div>
                                                    <div className="prel layout align-center">
                                                        <img src={Measurement} className="psl-icon" />
                                                        <span className="p2 demi-bold m-l-25 m-r-8 text-nowrap p-l-5">To Fit :</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="p2 orat-dark-grey-color">
                                                        To Fit Bust - {getFitInfo(selectedSize).bust} | Waist - {getFitInfo(selectedSize).waist} | Hip - {getFitInfo(selectedSize).hip}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {shippinginfo && (
                                        <div className="m-b-25 StandardShippingInfo">
                                            <div className="layout align-start justify-start">
                                                <div>
                                                    <div className="prel layout align-center">
                                                        <img src={StandardShipping} className="psl-icon" />
                                                        <span className="p2 demi-bold m-l-25 m-r-5 text-nowrap p-l-5">Standard Shipping :</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="p2 orat-dark-grey-color">The estimated shipping time for this product is 14 days from the date of order.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="layout ProductActionButtons sectionSeparator sectionSeparator-bg detailSant">
                            {productDetails?.quantity > 0 ? (
                                <>
                                    <BrowserView style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                                        {!isProductInCart() ? (
                                            <>
                                                <button
                                                    onClick={handleAddToBuy}
                                                    className="btn-orat-primary flex xs6 bold p2 orat-white-color"
                                                    disabled={loading}
                                                >
                                                    {loading ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "BUY NOW"}
                                                </button>
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="flex xs6 bold p2 btn-orat-secondry"
                                                    disabled={loading}
                                                >
                                                    {loading ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "ADD TO CART"}
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={handleAddToCart}
                                                className="flex xs12 bold p2 orat-white-color"
                                                disabled={loading}
                                                style={{ backgroundColor: '#212121', width: '100%', maxWidth: "300px", height: "35px", color: "#fff" }}
                                            >
                                                {loading ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "GO TO CART"}
                                            </button>
                                        )}
                                    </BrowserView>
                                    <MobileView style={{width:"100%",display:"flex",justifyContent:"center"}}>
                                        <div className="MobileProductActions">
                                            {!isProductInCart() ? (
                                                <>
                                                    <button
                                                        onClick={() => window.open("https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!", "_blank")}
                                                        className="btn-orat-secondry bold p2 whatsapp-button"
                                                        style={{ borderColor: '#000', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                                    >
                                                        <span className="whatsapp-icon-circle">
                                                            <img src="https://img.perniaspopupshop.com/pwa-assets/icons/whatsapp.svg" alt="WhatsApp" />
                                                        </span>
                                                        <span className='chat_for'>CHAT FOR BEST PRICE</span>
                                                    </button>
                                                    <button
                                                        onClick={handleAddToCart}
                                                        className="btn-orat-primary bold p2"
                                                        disabled={loading}
                                                    >
                                                        {loading ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "ADD TO CART"}
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="btn-orat-primary bold p2 orat-white-color jjjk"
                                                    disabled={loading}
                                                >
                                                    {loading ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "GO TO CART"}
                                                </button>
                                            )}
                                        </div>
                                    </MobileView>
                                </>
                            ) : (
                                <>
                                    <button className="btn-orat-primary flex xs6 bold p2 orat-white-color opacity-25" disabled>BUY NOW</button>
                                    <button className="flex xs6 bold p2 btn-orat-secondry opacity-25" disabled>ADD TO CART</button>
                                </>
                            )}
                        </div>
                        <div className="ProductInfo">
                            {couponslist && couponslist?.length > 0 && (
                                <div className="prel">
                                    {couponslist?.map((data, index) => (
                                        <div className="layout column justify-center ProductInfoBox sectionSeparator merryPromoCode" key={index}>
                                            <p className="text-uppercase demi-bold p2">{data?.coupon_code}</p>
                                            <div className="layout justify-space-between align-start">
                                                <p className="flex xs9 p4 orat-dark-grey-color">
                                                    Purchase this product and receive {data.discount} {data.coupon_type === '1' ? `%` : `FLAT`} discount!
                                                    <Link to='/terms-and-conditions' className="orat-color" target="_blank"> (T&C Applied)</Link>
                                                </p>
                                                <p className='orat-color divWithCaret cursor-pointer layout align-start justify-end p4 demi-bold'>
                                                    <span onClick={() => couponCopy(data?.coupon_code)}>COPY CODE</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="layout sectionSeparator">
                            <div className="ProductDescription flex xs8">
                                <p className="demi-bold p2">PRODUCT DESCRIPTION</p>
                                <p className="p4 orat-dark-grey-color">{productDetails?.description}</p>
                            </div>
                            <div className="flex xs4 styu">
                                <p className="demi-bold p2">PRODUCT CODE</p>
                                <p className="p4 orat-dark-grey-color">{productDetails?.sku}</p>
                            </div>
                        </div>
                        <div className="sectionSeparator">
                            <p className="p2 demi-bold">SHIPPING INFORMATION</p>
                            {productDetails?.readytoship_enable === 1 ? (
                                <p className="p4 orat-dark-grey-color">This product is Ready to be shipped (will be delivered in next day).</p>
                            ) : (
                                <p className="p4 orat-dark-grey-color">
                                    {productDetails?.shipping_information?.trim() || "This product will be delivered within 7 days."}
                                </p>
                            )}
                        </div>
                        <div className="sectionSeparator">
                            <p className="p2 demi-bold text-uppercase">Disclaimer</p>
                            <ul className="m-l-0 p-l-15 m-t-5 m-b-5">
                                <li className="p4 orat-dark-grey-color">This product will be exclusively handcrafted for you, making the colour/texture/pattern slightly vary from the image shown, due to multiple artisan-led techniques and processes involved.</li>
                            </ul>
                        </div>
                        {/* Pernia-style bottom info cards */}
                        <div className="sectionSeparator ProductBottomInfo">
                            <div className="ProductBottomInfoGrid">
                                <div className="ProductBottomInfoCard">
                                    <div className="ProductBottomInfoRow">
                                        <img
                                            src="https://img.perniaspopupshop.com/ppus-assets/icons/customisation_30_01_24.svg"
                                            alt="Customisations"
                                            className="ProductBottomInfoIcon"
                                        />
                                        <div className="ProductBottomInfoText">
                                            <p className="p3 demi-bold">Customisations</p>
                                            <p className="p4 orat-dark-grey-color">Same style in a bespoke colour</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ProductBottomInfoCard">
                                    <div className="ProductBottomInfoRow">
                                        <img
                                            src="https://img.perniaspopupshop.com/ppus-assets/icons/set-break_30_01_24.svg"
                                            alt="Set break"
                                            className="ProductBottomInfoIcon"
                                        />
                                        <div className="ProductBottomInfoText">
                                            <p className="p3 demi-bold">Don’t want the whole set?</p>
                                            <p className="p4 orat-dark-grey-color">Buy only one item from the look</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ProductBottomInfoCard">
                                    <div className="ProductBottomInfoRow">
                                        <img
                                            src="https://img.perniaspopupshop.com/ppus-assets/icons/video-consult_30_01_24.svg"
                                            alt="Live product preview"
                                            className="ProductBottomInfoIcon"
                                        />
                                        <div className="ProductBottomInfoText">
                                            <p className="p3 demi-bold">Live Product Preview</p>
                                            <p className="p4 orat-dark-grey-color">Call us to see the product live</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ProductBottomInfoCard">
                                    <div className="ProductBottomInfoRow">
                                        <img
                                            src="https://img.perniaspopupshop.com/ppus-assets/icons/early-delivery_30_01_24.svg"
                                            alt="Early delivery"
                                            className="ProductBottomInfoIcon"
                                        />
                                        <div className="ProductBottomInfoText">
                                            <p className="p3 demi-bold">Early Delivery</p>
                                            <p className="p4 orat-dark-grey-color">Need the product sooner?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ProductBottomInfoCard ProductBottomInfoCardChat">
                                    <p className="p3 demi-bold para_big">Do you need help with customisation or shipping of this product?</p>
                                    <a
                                        href="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="ProductBottomInfoChatBtn"
                                    >
                                        <img
                                            src="https://res.cloudinary.com/dgif730br/image/upload/v1765784651/Whatsapp_Icon_swn4mr.svg"
                                            alt="WhatsApp"
                                            className="ProductBottomInfoChatIcon"
                                        />
                                        CHAT WITH US
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="sectionSeparator sdt_secp">
                            <div className="flex xs9">
                                <div>
                                    <p className='p4'><FaWhatsapp6 style={{ fontSize: '20px' }} /> at <a href="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!" target="_blank" className="orat-color">+91 91470 72827</a> to know more about the product</p>
                                    <Alerts singleerror={errorsnews} successm={successmnews} />
                                    <form onSubmit={handleNewslSubmit} className="layout justify-space-between">
                                        <div className="flex">
                                            <input type="email" name="newsemail" value={newsemail} onChange={(e) => setnewsemail(e.target.value)} required className="su-inputBox mobile_input" placeholder="Here's my Email" />
                                        </div>
                                        <button type="submit" className="su-btn btn-orat-primary flex bold h-33">
                                            {!shownewsLoader ? "Sign Up" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="layout align-center justify-space-between m-b-25 p-b-25 sdt_secp">
                            <div className="flex xs4 mt-0">
                                <div className="layout align-center SocialMediaLinks">
                                    <Link className='m-r-5' to="https://www.facebook.com/oratkolkata" target='_blank'>
                                        <FaFacebookSquare style={{ width: '18px', height: '18px', color: '#000', margin: '0px 5px' }} />
                                    </Link>
                                    <Link className='m-r-5' to="https://www.instagram.com/orat.in?igsh=NDNnOWZzY2JwenU=" target='_blank'>
                                        <FaInstagram style={{ width: '18px', height: '18px', color: '#000', margin: '0px 5px' }} />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex xs8">
                                <div className="layout align-center justify-end">
                                    <Link to='/shipping-information' target='_blank' className='m-r-10 p4 demi-bold orat-color-hover text-capitalize'>SHIPPING POLICY</Link>
                                    <Link to='/how-to-shop' target='_blank' className='m-r-10 p4 demi-bold orat-color-hover text-capitalize'>HELP</Link>
                                    <Link to='/contact' target='_blank' className='m-r-10 p4 demi-bold orat-color-hover text-capitalize'>CONTACT US</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MobileView>
                    {showSizeSuggestionPopup && (
                        <div className="size-suggestion-popup" onClick={() => setShowSizeSuggestionPopup(false)}>
                            <div
                                className="size-suggestion-content"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="layout justify-space-between align-center m-b-10">
                                    <p className="size-suggestion-text demi-bold">SELECT YOUR SIZE</p>
                                    <button
                                        className="btn-icon p2 demi-bold p-t-0 bold"
                                        style={{ border: 'none', background: 'transparent', padding: 0 }}
                                        onClick={handleShowSizeModal}
                                    >
                                        SIZE GUIDE
                                    </button>
                                </div>
                                <div className="ProductSizesOptions layout wrap">
                                    {variants.length > 0 && variants.map((data, index) => (
                                        <div
                                            className={activevarient === data?.varid ? 'active demi-bold' : 'demi-bold'}
                                            key={index}
                                            onClick={() => handleSizeClick(
                                                data?.varid,
                                                data?.price,
                                                data?.product_fit_info,
                                                data?.discount_type,
                                                data?.discount_amount,
                                                data?.saleprice,
                                                data?.size
                                            )}
                                        >
                                            <span className="text-uppercase p2 demi-bold">{data?.size}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </MobileView>
                <LoginModal showModal={modalShow} modalHide={modalHide} />
            </>
        )
    );
}