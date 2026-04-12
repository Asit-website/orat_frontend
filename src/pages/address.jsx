import React, { useState } from 'react';
// import Pricesummary from '../components/pricesummary'
import { Norton, Visa, Loyalty, Cartbanner1 } from '../image'
import { MdLockOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from '../Redux/features/Cart/CartSlice';
import { addaddress, addressList } from '../services/User-service';
import { countryList, stateList } from '../services/General-service';
import { RotatingLines } from "react-loader-spinner";
import { getTotalDiscount, getAllCart, geteaddress } from '../services/User-service';
import Modal from 'react-bootstrap/Modal';
import Alerts from '../components/Alerts';
import { IoClose } from "react-icons/io5";
import { formatPrice } from "../utils/formatPrice";

function Address() {
    const userInfo = useSelector((state) => state.user.userInfo);
    const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 767 : false;
    const [isFormVisible, setFormVisible] = useState(false);
    const [addressArr, setAddressArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countryArr, setCountryArr] = useState([]);
    const [stateslist, setStatesList] = useState([]);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [streetaddress, setStreetAddress] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');
    const [country, setCountry] = useState('');
    const [mobileno, setMobileNo] = useState('');
    const [activeAddress, setactiveAddress] = useState(0);
    const [activebillAddress, setactivebillAddress] = useState(0);
    const [is_default_billing, setBillingdefault] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [totalAmount, settotalAmount] = useState();
    const [totalPrice, settotalPrice] = useState();
    const [totalDiscount, settotalDiscount] = useState();
    const [discountOnTotal, setdiscountOnTotal] = useState();
    const [totaltaxAmount, settotaltaxAmount] = useState();
    const [cartArr, setCartdetails] = useState([]);
    const [selectedeBtnId, setSelectedeBtnId] = useState(-1);
    const [showeditLoader, setShoweditLoader] = useState(false);
    const [selectededitId, setSelectedEditId] = useState('');
    const [show, setShow] = useState(false);
    const [errors, seterrors] = useState([]);
    const [successm, setsuccessm] = useState('');
    const showForm = () => {
        setFormVisible(true);
    };
    const handleClose = () => {
        setShow(false);
        setsuccessm('');
        seterrors([]);
        setSelectedEditId();
    }

    const hideForm = () => {
        setFormVisible(false);
    };
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotals(userInfo));
    }, [cart, dispatch]);

    const makeAddressActive = async (addressId) => {
        setactiveAddress(addressId);
        setactivebillAddress(addressId);
    };
    const makebillAddressActive = (addressId) => {
        setactivebillAddress(addressId);
    };
    const showbillingAddress = (e) => {
        setBillingdefault(e.target.checked);
    }
    const handleaddAddressSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const userDetails = {
            address_id: activeAddress,
            user_id: userInfo?.data?.user?.id,
            firstname: firstname,
            lastname: lastname,
            streetaddress: streetaddress,
            zipcode: zipcode,
            city: city,
            states: states,
            country: country,
            mobileno: mobileno
        }

        addaddress(userDetails).then((data) => {
            setShowLoader(false);
            if (data.status) {
                setFirstName('');
                setLastName('');
                setStreetAddress('');
                setZipCode('');
                setCity('');
                setStates('');
                setCountry('');
                setMobileNo('');
                setactiveAddress(data.data.id);
                setactivebillAddress(data.data.id);

                hideForm();
                getaddressList();
            }

        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("Add address error:", error);
            }
        })

    };
    const getaddressList = () => {
        const userDetailsd = {
            user_id: userInfo?.data?.user?.id
        }
        addressList(userDetailsd)
            .then((data) => {
                setAddressArr(data.data);
                setactiveAddress(data.default_address);
                setactivebillAddress(data.default_address);
                if (data.data.length <= 0) {
                    setFormVisible(true);
                }
                setLoading(false);

            })
            .catch((error) => {
                console.error("Error fetching address list:", error);
                setLoading(false);
            });
    };
    const getreaddressList = () => {
        const userDetailsd = {
            user_id: userInfo?.data?.user?.id
        }
        addressList(userDetailsd)
            .then((data) => {
                setAddressArr(data.data);
                
                if (data.data.length <= 0) {
                    setFormVisible(true);
                }
                setLoading(false);

            })
            .catch((error) => {
                console.error("Error fetching address list:", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        getaddressList();
    }, [])
    const getCountryList = () => {
        countryList('')
            .then((data) => {

                setCountryArr(data.data);

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching country list:", error);
                setLoading(false);
            });
    };
    const getStateList = () => {
        stateList('')
            .then((data) => {

                setStatesList(data.data);

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching states list:", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        getCountryList();
        getStateList();
    }, [])
    const gettotaldiscount = () => {
        const userDetailsd = {
            user_id: userInfo?.data?.user?.id,
            carts: cart
        }
        console.log("Address page - Cart data being sent:", userDetailsd);
        console.log("Address page - Cart items:", cart?.cartItems);
        
        getTotalDiscount(userDetailsd)
            .then((data) => {
                console.log("Address page - getTotalDiscount response:", data);
                
                // Check if API returned an error
                if (data.success === false) {
                    console.error("Address page - API Error:", data.message);
                    // Try to calculate totals manually from cart items as fallback
                    const cartItems = cart?.cartItems || [];
                    if (cartItems.length > 0) {
                        const manualTotal = cartItems.reduce((sum, item) => {
                            const price = parseFloat(item.saleprice || item.price || 0);
                            const quantity = parseInt(item.cartQuantity || 1);
                            return sum + (price * quantity);
                        }, 0);
                        console.log("Address page - Calculating totals manually:", manualTotal);
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
                console.error("Address page - Error fetching total discount:", error);
                console.error("Address page - Error response:", error.response);
                
                // Fallback: calculate totals manually
                const cartItems = cart?.cartItems || [];
                if (cartItems.length > 0) {
                    const manualTotal = cartItems.reduce((sum, item) => {
                        const price = parseFloat(item.saleprice || item.price || 0);
                        const quantity = parseInt(item.cartQuantity || 1);
                        return sum + (price * quantity);
                    }, 0);
                    console.log("Address page - Fallback: Calculating totals manually:", manualTotal);
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
                        console.log("Address page - getTotalDiscount response:", discountData);
                        
                        if (discountData.success === false) {
                            console.error("Address page - API Error:", discountData.message);
                            // Calculate totals manually
                            const cartItems = cartDataForAPI.cartItems || [];
                            if (cartItems.length > 0) {
                                const manualTotal = cartItems.reduce((sum, item) => {
                                    const price = parseFloat(item.saleprice || item.price || 0);
                                    const quantity = parseInt(item.cartQuantity || 1);
                                    return sum + (price * quantity);
                                }, 0);
                                console.log("Address page - Calculating totals manually:", manualTotal);
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
                        console.error("Address page - Error in getTotalDiscount:", error);
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
    }, [])
    const editAddress = (id) => {
        setShoweditLoader(true);
        setSelectedeBtnId(id);
        const userDetailsed = {
            id: id
        }
        geteaddress(userDetailsed)
            .then((data) => {
                setShoweditLoader(false);
                setSelectedeBtnId();
                setSelectedEditId(id);
                setFirstName(data.data.first_name);
                setLastName(data.data.last_name);
                setStreetAddress(data.data.address);
                setZipCode(data.data.zip_code);
                setCity(data.data.city);
                setStates(data.data.state);
                setCountry(data.data.country);
                setMobileNo(data.data.phone);
                setShow(true);
            })
            .catch((error) => {
                console.error("Error fetching Address:", error);
                setLoading(false);
            });


    };
    const handleaddEditAddressSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const userDetails = {
            address_id: selectededitId,
            user_id: userInfo?.data?.user?.id,
            firstname: firstname,
            lastname: lastname,
            streetaddress: streetaddress,
            zipcode: zipcode,
            city: city,
            states: states,
            country: country,
            mobileno: mobileno
        }

        addaddress(userDetails).then((data) => {
            setShowLoader(false);
            if (data.status) {
                setFirstName('');
                setLastName('');
                setStreetAddress('');
                setZipCode('');
                setCity('');
                setStates('');
                setCountry('');
                setMobileNo('');

                setsuccessm(data.message);
                seterrors([]);
                handleClose();
                getreaddressList();
                setactiveAddress(selectededitId);
                setactivebillAddress(selectededitId);
            } else {
                setsuccessm('');
                seterrors(data.message);

            }

        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("Add address error:", error);
            }
        })

    };
    return (
        <>
            <div className='App other-page-top mobile_address_other'>
                <div className="BreakPointContainer AppContent">
                    <div className="CartPage CheckoutPage">
                        <div className="CartWrapper">
                            <div className="layout CartWrapperContent justify-center responsive">
                                <div className="CheckoutSteps CartWrapperContentLeft">
                                    <div className="StepsUserDetails CheckoutStep">
                                        <div className="CheckoutStepHeader layout align-center justify-space-between">
                                            <div className="layout align-center">
                                                <h4 className='h4 Fade user_deto'> 1. USER DETAILS </h4>
                                                <div className="p3 bold m-l-12 UserEmailAddress ellipsis orat-dark-grey-color">{userInfo?.data?.user?.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="StepsShippingAddress CheckoutStep">
                                        <div className="CheckoutStepHeader layout align-center justify-space-between active">
                                            <div className="layout align-center">
                                                <div className="h4 trust_for">2. SHIPPING &amp; BILLING INFO</div>
                                            </div>
                                        </div>
                                        <div className="CheckoutStepContent addressBar">
                                            {isFormVisible ? (
                                                <div className="test_visible">
                                                    <form onSubmit={handleaddAddressSubmit}>
                                                        <div className="layout column">
                                                            <div className="layout justify-end">
                                                                <button className='btn-icon orat-color-hover back_to_add' onClick={hideForm}> Back to address </button>
                                                            </div>
                                                            <div>
                                                                <h4 className="m-l-12 m-b-12 m-t-0">Add  Shipping Address</h4>
                                                                <div className="CommonAddressForm">
                                                                    <div className="input-container">
                                                                        <div className="layout justify-space-between align-start take">
                                                                            <div className="flex xs6 input-container-controls take1">
                                                                                <div className="m-l-12 m-r-12 layout column">
                                                                                    <input name="fname" value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex xs6 input-container-controls take1">
                                                                                <div className="m-l-12 m-r-12 layout column">
                                                                                    <input name="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" required />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-container">
                                                                        <div className="layout justify-space-between align-start  take">
                                                                            <div className="flex xs6 input-container-controls take1">
                                                                                <div className="m-l-12 m-r-12 layout column">
                                                                                    <input name="streetaddress" value={streetaddress} onChange={(e) => setStreetAddress(e.target.value)} type="text" placeholder="Street Address" required />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex xs6 input-container-controls take1">
                                                                                <div className="m-l-12 m-r-12 layout column">
                                                                                    <input 
                                                                                        name="zipcode" 
                                                                                        value={zipcode} 
                                                                                        onChange={(e) => setZipCode(e.target.value)} 
                                                                                        type="text" 
                                                                                        placeholder="Zip / Postal Code" 
                                                                                        required 
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-container">
                                                                        <div className="layout justify-space-between align-start  take">
                                                                            <div className="flex xs6 input-container-controls take1">
                                                                                <div className="m-l-12 m-r-12 layout column">
                                                                                    <input name="city" value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" required />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex xs6 input-container-controls take1">
                                                                                <div className="m-l-12 m-r-12 layout column">
                                                                                    {/* <input name="state" value={states} onChange={(e) => setStates(e.target.value)} type="text" placeholder="State / Province" required /> */}
                                                                                    <select name="state" value={states} onChange={(e) => setStates(e.target.value)} required>

                                                                                        {stateslist && stateslist?.length > 0 && stateslist?.map((data, index) => (
                                                                                            <option value={data.name} key={index}>{data.name}</option>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-container">
                                                                        <div className="layout justify-space-between align-start  take">
                                                                            <div className="flex xs6 input-container-controls take1">
                                                                                <div className="m-l-12 m-r-12 layout column">
                                                                                    <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} required>

                                                                                        {countryArr && countryArr?.length > 0 && countryArr?.map((data, index) => (
                                                                                            <>
                                                                                                {data.name == 'India' ? (
                                                                                                    <option value={data.name} key={index}>{data.name}</option>
                                                                                                ) : ''}
                                                                                            </>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex xs6 input-container-controls take1">
                                                                                <div className="m-l-12 m-r-12 layout column">
                                                                                    <input name="mobileno" value={mobileno} onChange={(e) => setMobileNo(e.target.value)} type="number" placeholder="10-digit mobile number without prefix" required  />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="input-container m-t-25 m-l-12 m-r-12">
                                                                <div className="checkboxButtonContainer layout justify-space-between align-start">
                                                                    <div className="layout column flex xs12 sm7">
                                                                        <div className="layout align-center justify-start m-r-12">
                                                                            <div className="small PslCheckbox flex">
                                                                                <label>
                                                                                    <input name="is_default_billing" type="checkbox" className="PslCheckboxInput" defaultChecked={is_default_billing} value={is_default_billing} onChange={(e) => showbillingAddress(e)} />
                                                                                    <span className="PslCheckboxCheckmark"></span>
                                                                                    <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Billing Address is same as Shipping Address</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="layout flex xs6 sm5 tyop">
                                                                        <button className="flex btn-orat-primary m-l-12" type="submit" disabled={showLoader}>
                                                                            {!showLoader ? (isMobile ? "SAVE ADDRESS" : "CONTINUE TO PAYMENT") : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    {/* <button className="btn-orat-secondry flex m-l-12">HIDE FORM</button> */}
                                                </div>
                                            ) : (
                                                <div className="AddressSection">
                                                    <div className="AddressSectionContent">
                                                        <h4 className="m-l-12 m-b-12">Select  Shipping Address</h4>
                                                        <div className="AddressList">
                                                            <div className="layout wrap AddressListContent">
                                                                {addressArr && addressArr?.length > 0 && addressArr?.map((data, index) => (
                                                                    <div className="flex xs6 sm4" key={index}>
                                                                        <div className={`AddressBox prel ${activeAddress === data?.id ? `active` : !activeAddress && index === 0 ? `active` : ``}`} onClick={() => makeAddressActive(data?.id)}>
                                                                            <p className="AddressBoxTitle bold m-b-5">Address {index + 1}</p>
                                                                            <p className="ellipsis bold">{data?.address}</p>
                                                                            <p className="ellipsis bold"> {data?.city}, {data?.state}</p>
                                                                            <p className="ellipsis bold"> {data?.country}-{data?.zip_code}</p>
                                                                            <p className="m-t-5 ellipsis bold">{data?.phone}</p>
                                                                            <span className="TicBox"></span>
                                                                            <button className="EditAddress btn-orat-bg-grey w-100 mt-1" onClick={() => editAddress(data.id)}
                                                                                {...selectedeBtnId === data.id ? `disabled=${showeditLoader}` : ''} >
                                                                                {selectedeBtnId === data.id ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "EDIT ADDRESS"}
                                                                            </button>
                                                                        </div>

                                                                    </div>
                                                                ))}
                                                                <div className="flex xs6 sm4">
                                                                    <div className="AddressBox AddNewAddressTile prel" onClick={showForm}>
                                                                        <p className="AddressBoxTitle bold m-b-5">Add New Address</p>
                                                                        <div className="layout align-center justify-center plus_bold">
                                                                            <span className="h3 bold">+</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="AddressBillingCheckbox layout align-center justify-start m-l-12 m-t-12 m-b-12">
                                                            <div className="small PslCheckbox flex">
                                                                <label>
                                                                    <input name="is_default_billing" type="checkbox" className="PslCheckboxInput" defaultChecked={is_default_billing} value={is_default_billing} onChange={(e) => showbillingAddress(e)} />
                                                                    <span className="PslCheckboxCheckmark"></span>
                                                                    <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Billing Address is same as Shipping Address</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {!is_default_billing && (
                                                            <div>
                                                                <h4 className="m-l-12 m-b-12">Select Your Billing Address</h4>
                                                                <div className="AddressList">
                                                                    <div className="layout wrap AddressListContent">
                                                                        {addressArr && addressArr?.length > 0 && addressArr?.map((data, index) => (
                                                                            <div className="flex xs6 sm4">
                                                                                <div className={`AddressBox prel ${activebillAddress === data?.id ? `active` : !activebillAddress && index === 0 ? `active` : ``}`} key={index} onClick={() => makebillAddressActive(data?.id)}>
                                                                                    <p className="AddressBoxTitle bold m-b-5">Address {index + 1}</p>
                                                                                    <p className="ellipsis bold">{data?.address}</p>
                                                                                    <p className="ellipsis bold"> {data?.city}, {data?.state}</p>
                                                                                    <p className="ellipsis bold"> {data?.country}-{data?.zip_code}</p>
                                                                                    <p className="m-t-5 ellipsis bold">{data?.phone}</p>
                                                                                    <span className="TicBox"></span>
                                                                                </div>
                                                                            </div>
                                                                        ))}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="layout m-l-12 m-r-12 AddressActionButtons">
                                                            <Link style={{width:"100%"}} to={`/payment/?address=${activeAddress}&billaddress=${activebillAddress}`}>
                                                                <button style={{width:"100%"}} className="btn-orat-primary flex m-r-12">PROCEED TO PAYMENT</button>
                                                            </Link>
                                                            <button style={{width:"100%"}} className="btn-orat-secondry flex m-l-12" onClick={showForm}>ADD NEW ADDRESS</button>
                                                        </div>
                                                        <div className="AddressStickyAction mobile-only">
                                                            <div className="small PslCheckbox flex">
                                                                <label>
                                                                    <input name="is_default_billing_mobile" type="checkbox" className="PslCheckboxInput" defaultChecked={is_default_billing} value={is_default_billing} onChange={(e) => showbillingAddress(e)} />
                                                                    <span className="PslCheckboxCheckmark"></span>
                                                                    <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Billing Address is same as Shipping Address</span>
                                                                </label>
                                                            </div>
                                                            <Link style={{width:"100%"}} to={`/payment/?address=${activeAddress}&billaddress=${activebillAddress}`}>
                                                                <button className="btn-primary-black">PROCEED TO PAYMENT</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="PaymentMethodsStep CheckoutStep">
                                        <div className="CheckoutStepHeader layout align-center justify-space-between">
                                            <div>
                                                <div className="h4 Fade trust_for">3. PAYMENT METHOD</div>
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
                                                <div className="layout align-center PaymentMethodIcons justify-end">
                                                    <img src="https://res.cloudinary.com/dgif730br/image/upload/v1764402481/Payment_options_tsgyn5.jpg" alt="Payment Options" className='payment-options-img' style={{ width: 'auto' }} />
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
                                                        <li className='CartItem' key={cartItem.id}>
                                                            <div className="layout">
                                                                <div className="ProductImage">
                                                                    <img src={cartItem.cover_image} alt={cartItem.product_title} className='overflow-hidden p4' />
                                                                </div>
                                                                <div>
                                                                    <div className="ProductDetails flex m-l-12">
                                                                        <div className="Brand text-uppercase bold">{cartItem.product_title}</div>
                                                                        <div className="Name bold">{cartItem.product_short_description}</div>
                                                                        <div className="ProductPricing">
                                                                            <div className="layout align-center ProductPrice h6">
                                                                                {cartItem?.discount_amount > 0 && (
                                                                                    <span className='DiscountPriceRound demi-bold'>
                                                                                        {cartItem?.discount_type === 'flat' ? `${cartItem?.discount_amount} FLAT OFF` : ''}
                                                                                        {cartItem?.discount_type === 'percentage' ? `${cartItem?.discount_amount}% OFF` : ''}
                                                                                    </span>
                                                                                )}
                                                                                {cartItem?.discount_amount > 0 && (
                                                                                    <span className='InitialPrice'>
                                                                                        <i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{formatPrice(cartItem?.price, { showSymbol: false })}
                                                                                    </span>
                                                                                )}
                                                                                <span className='SpecialPrice demi-bold m-l-0'>
                                                                                    <i className="fa fa-inr" style={{ fontSize: '13px' }}></i>{formatPrice((cartItem?.saleprice > 0 ? cartItem?.saleprice : cartItem?.price), { showSymbol: false })}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        {cartItem.envpriceid && cartItem.size && (
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
            <Modal className='modals' show={show} onHide={handleClose} size="lg">
                <Modal.Body>
                    <form onSubmit={handleaddEditAddressSubmit} className='address_form flex'>
                        <div className="AddressFormWrapperWidth layout column m-t-20 m-l-20 m-b-20 m-r-20">
                            <Alerts singleerror={errors} successm={successm} />
                            <div>
                                <div className="layout justify-space-between m-b-20">
                                    <h4 className="m-l-12 m-b-12 m-t-0 text-uppercase demi-bold">{selectededitId ? 'Edit Address' : 'Add Address'}</h4>
                                    {/* <div className='btn-icon' style={{ cursor: 'pointer' }} onClick={handleClose}> <IoClose /> </div> */}
                                </div>
                                <div className="CommonAddressForm">
                                    <div className="input-container">
                                        <div className="layout justify-space-between align-start take">
                                            <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12 take1">
                                                <input name="fname" value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required />
                                            </div>
                                            <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12 take1">
                                                <input name="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-container">
                                        <div className="layout justify-space-between align-start take">
                                            <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12 take1">
                                                <input name="streetaddress" value={streetaddress} onChange={(e) => setStreetAddress(e.target.value)} type="text" placeholder="Street Address" required />
                                            </div>
                                            <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12 take1">
                                                <input name="zipcode" value={zipcode} onChange={(e) => setZipCode(e.target.value)} type="text" placeholder="Zip / Postal Code" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-container">
                                        <div className="layout justify-space-between align-start take">
                                            <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12 take1">
                                                <input name="city" value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" required />
                                            </div>
                                            <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12 take1">
                                                {/* <input name="state" value={states} onChange={(e) => setStates(e.target.value)} type="text" placeholder="State / Province" required /> */}
                                                <select name="state" value={states} onChange={(e) => setStates(e.target.value)} required>

                                                    {stateslist && stateslist?.length > 0 && stateslist?.map((data, index) => (
                                                        <option value={data.name} key={index}>{data.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-container">
                                        <div className="layout justify-space-between align-start  take">
                                            <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12 take1">
                                                <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} required>

                                                    {countryArr && countryArr?.length > 0 && countryArr?.map((data, index) => (
                                                        <>
                                                            {data.name == 'India' ? (
                                                                <option value={data.name} key={index}>{data.name}</option>
                                                            ) : ''}
                                                        </>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12 take1">
                                                <input name="mobileno" value={mobileno} onChange={(e) => setMobileNo(e.target.value)} type="number" placeholder="Mobile Number" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="input-container m-t-25 m-l-12 m-r-12 take4">
                                <div className="layout justify-center align-start take2">
                                    <div className="layout flex xs6 take3">
                                        <button className="flex btn-orat-primary m-l-12 text-uppercase" type="submit" disabled={showLoader}>

                                            {!showLoader ? (selectededitId ? "Edit Address" : "Add Address") : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Footer />
        </>
    )
}

export default Address