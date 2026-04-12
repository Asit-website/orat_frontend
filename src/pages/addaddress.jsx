import React, { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";
import Loader from "../components/Loader";
import Alerts from '../components/Alerts';
import { RotatingLines } from "react-loader-spinner";
import { addaddress, addressList, deleteaddress, geteaddress } from '../services/User-service';
import { countryList, stateList } from '../services/General-service';
import Footer from '../components/footer';
import { NoAddress } from '../image';

import { logout } from '../Redux/features/User/userSlice';
import { BrowserView, MobileView } from 'react-device-detect';
const AddAddress = () => {
    // const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [show, setShow] = useState(false);
    const [edishow, setShow1] = useState(false);
    const navigate = useNavigate();
    if (!userInfo) {
        navigate('/');
    }
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [streetaddress, setStreetAddress] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [states, setStates] = useState('');
    const [country, setCountry] = useState('');
    const [mobileno, setMobileNo] = useState('');
    const [successm, setsuccessm] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, seterrors] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [showdelLoader, setShowDelLoader] = useState(false);
    const [showeditLoader, setShoweditLoader] = useState(false);
    const [countryArr, setCountryArr] = useState([]);
    const [stateslist, setStatesList] = useState([]);
    const [addressArr, setAddressArr] = useState([]);
    const [selectedBtnId, setSelectedBtnId] = useState(-1);
    const [selectedeBtnId, setSelectedeBtnId] = useState(-1);
    const [selectededitId, setSelectedEditId] = useState('');
    const handleClose = () => {
        setShow(false);
        setsuccessm('');
        seterrors([]);
        setSelectedEditId();
        setFirstName('');
        setLastName('');
        setStreetAddress('');
        setZipCode('');
        setCity('');
        setStates('');
        setCountry('');
        setMobileNo('');
    }
    const handleShow = () => {
        setsuccessm('');
        setShow(true);
    }

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
    const handleaddAddressSubmit = (e) => {
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
                getaddressList();
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
    const deleteAddress = (id) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            setShowDelLoader(true);
            setSelectedBtnId(id);
            const userDetailsdl = {
                id: id
            }
            deleteaddress(userDetailsdl)
                .then((data) => {
                    setsuccessm(data.message);
                    setShowDelLoader(false);
                    setSelectedBtnId();
                    getaddressList();
                })
                .catch((error) => {
                    setShowDelLoader(false);
                    console.error("Error delete address list:", error);
                    setLoading(false);

                });
        }

    };

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
    useEffect(() => {
        getCountryList();
    }, [])
    const handleLogout = () => {
        dispatch(logout(userInfo));
        navigate('/'); // Redirect to the login page after logout
    };
    const getaddressList = () => {
        const userDetailsd = {
            user_id: userInfo?.data?.user?.id
        }
        addressList(userDetailsd)
            .then((data) => {

                setAddressArr(data.data);
                setLoading(false);

            })
            .catch((error) => {
                console.error("Error fetching address list:", error);
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
    useEffect(() => {
        getaddressList();
    }, [])
    const handlephone = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value.length <= 10 && re.test(e.target.value)) {
            setMobileNo(e.target.value);
        } else {
            setMobileNo('');
        }
    }
    return (
        loading ? (
            <Loader />
        ) : (
            userInfo ? (
                <>
                    <BrowserView>
                        <div className='App  my-addaddress-mobile'>
                            <div className="AppContent BreakPointContainer">
                                <div className="MyAccountWrapper prel overflow-hidden">
                                    <div className="MyAccountHeader layout align-center">
                                        <div className="layout demi-bold justify-start h4 align-center">
                                            <span> MY ACCOUNT </span>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                                            </div>
                                            <span className="demi-bold">MANAGE ADDRESSES</span>
                                        </div>
                                    </div>
                                    <div className="MyAccBody layout xs12">
                                        <div className="h5 optionListLineHeight xs3 layout column orat-dark-grey-color">
                                            <Link to="/myaccount" className='cursor-pointer demi-bold orat-black-color'> PERSONAL DETAILS </Link>
                                            <Link to="/orderhistory" className='cursor-pointer demi-bold orat-black-color'> ORDER HISTORY </Link>
                                            <Link to="/addaddress" className='cursor-pointer demi-bold orat-color'> MANAGE ADDRESSES </Link>
                                            {/* <Link to="/credits" className='cursor-pointer demi-bold orat-black-color'> MY CREDITS </Link> */}
                                            <Link to="/wishlist" className='cursor-pointer demi-bold orat-black-color'> MY WISHLIST </Link>
                                            {/*  <Link to="/settings" className='cursor-pointer demi-bold orat-black-color'> SETTINGS </Link> */}
                                            <Link onClick={handleLogout} className='cursor-pointer demi-bold orat-black-color'> LOGOUT </Link>

                                        </div>
                                        <div className="MyAccountPageWrapper flex xs9  prel overflow-hidden">
                                            <div>
                                                <div className="MyAddressBookWrapper prel overflow-hidden font-bold">
                                                    {addressArr.length == 0 ? (
                                                        <>
                                                            <div className="layout column justify-space-between align-center m-t-48 m-b-48">
                                                                <div className="NoStateImage m-b-16">
                                                                    <div className="DynamicHeightLoaderWrapper icon" style={{ paddingTop: '100%' }}>
                                                                        <div className="DynamicHeightLoader layout row align-center justify-center">
                                                                            <img src={NoAddress} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h1 className="h1 demi-bold m-b-8">No address found!</h1>
                                                                <button className="btn-orat-secondry width-auto text-uppercase cursor-pointer" type="button" onClick={handleShow}>ADD AN ADDRESS</button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="layout justify-space-between align-center">
                                                                <div className="h4 demi-bold"> MY ADDRESS BOOK </div>
                                                                <div className="btn-orat-inverse cursor-pointer demi-bold p1" onClick={handleShow}> + ADD NEW ADDRESS </div>

                                                            </div>
                                                            <div className="AddressesList">
                                                                {addressArr && addressArr?.length > 0 && addressArr?.map((data, index) => (
                                                                    <div className="AddressTile layout align-center justify-space-between demi-bold" key={index}>
                                                                        <div className="NameContact text-uppercase">
                                                                            <h6 className='demi-bold'> {data.first_name} {data.last_name} </h6>
                                                                            <h6 className='demi-bold'> {data.phone} </h6>
                                                                        </div>
                                                                        <div className="DetailAddress p1">
                                                                            {data.address}, {data.city} - {data.zip_code}
                                                                        </div>
                                                                        <div className="EditDeleteOption">
                                                                            <button className="EditAddress btn-orat-bg-grey" onClick={() => editAddress(data.id)}
                                                                                {...selectedeBtnId === data.id ? `disabled=${showeditLoader}` : ''} >

                                                                                {selectedeBtnId === data.id ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "EDIT"}
                                                                            </button>
                                                                            <button className="DeleteAddress btn-orat-bg-grey" onClick={() => deleteAddress(data.id)} id={data.id} type="button" {...selectedBtnId === data.id ? `disabled=${showdelLoader}` : ''}>
                                                                                {selectedBtnId === data.id ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "DELETE"}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                    <Modal show={show} onHide={handleClose} size="lg">
                                                        <Modal.Body>
                                                            <form onSubmit={handleaddAddressSubmit} className='address_form flex'>
                                                                <div className="AddressFormWrapperWidth layout column m-t-20 m-l-20 m-b-20 m-r-20">
                                                                    <Alerts singleerror={errors} successm={successm} />
                                                                    <div>
                                                                        <div className="layout justify-space-between m-b-20">
                                                                            <h4 className="m-l-12 m-b-12 m-t-0 text-uppercase demi-bold">{selectededitId ? 'Edit Address' : 'Add Address'}</h4>
                                                                            <div className='btn-icon' style={{ cursor: 'pointer' }} onClick={handleClose}> <IoClose /> </div>
                                                                        </div>
                                                                        <div className="CommonAddressForm">
                                                                            <div className="input-container">
                                                                                <div className="layout justify-space-between align-start">
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="fname" value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required />
                                                                                    </div>
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" required />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <div className="layout justify-space-between align-start">
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="streetaddress" value={streetaddress} onChange={(e) => setStreetAddress(e.target.value)} type="text" placeholder="Street Address" required />
                                                                                    </div>
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="zipcode" value={zipcode} onChange={(e) => setZipCode(e.target.value)} type="number" placeholder="Zip / Postal Code" required />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <div className="layout justify-space-between align-start">
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="city" value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" required />
                                                                                    </div>
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
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
                                                                                <div className="layout justify-space-between align-start">
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
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
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="mobileno" value={mobileno} onChange={(e) => handlephone(e)} onKeyUp={(e) => handlephone(e)} type="number" placeholder="Mobile Number" required />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-container m-t-25 m-l-12 m-r-12">
                                                                        <div className="layout justify-center align-start">
                                                                            <div className="layout flex xs6">
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

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BrowserView>
                    <MobileView>
                        <div className='App other-page-top my-addaddress-mobile'>
                            <div className="AppContent BreakPointContainer container">
                                <div className="MyAccountWrapper prel overflow-hidden">
                                    <div className="MyAccountHeader layout align-center">
                                        <div className="layout demi-bold justify-start h4 align-center">
                                            <Link to="/myaccount"> <span> MY ACCOUNT </span></Link>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                <FaChevronRight style={{ width: '20px', height: '12px', margin: '0px 8px', color: '#000' }} />
                                            </div>
                                            <span className="demi-bold">MANAGE ADDRESSES</span>
                                        </div>
                                    </div>
                                    <div className="MyAccBody">

                                        <div className="MyAccountPageWrapper prel overflow-hidden mb-2">
                                            <div>
                                                <div className="MyAddressBookWrapper prel overflow-hidden font-bold">
                                                    {addressArr.length == 0 ? (
                                                        <>
                                                            <div className="layout column justify-space-between align-center m-t-48 m-b-48">
                                                                <div className="NoStateImage m-b-16">
                                                                    <div className="DynamicHeightLoaderWrapper icon" style={{ paddingTop: '100%' }}>
                                                                        <div className="DynamicHeightLoader layout row align-center justify-center">
                                                                            <img src={NoAddress} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h1 className="h1 demi-bold m-b-8">No address found!</h1>
                                                                <button className="btn-orat-secondry width-auto text-uppercase cursor-pointer" type="button" onClick={handleShow}>ADD AN ADDRESS</button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="layout justify-space-between align-center">
                                                                <div className="h4 demi-bold"> MY ADDRESS BOOK </div>
                                                                <div className="btn-orat-inverse cursor-pointer demi-bold p1" onClick={handleShow}> + ADD NEW ADDRESS </div>

                                                            </div>
                                                            <div className="AddressesList">
                                                                {addressArr && addressArr?.length > 0 && addressArr?.map((data, index) => (
                                                                    <div className="AddressTile layout align-center justify-space-between demi-bold" key={index}>
                                                                        <div className="NameContact text-uppercase">
                                                                            <h6 className='demi-bold'> {data.first_name} {data.last_name} </h6>
                                                                            <h6 className='demi-bold'> {data.phone} </h6>
                                                                        </div>
                                                                        <div className="DetailAddress p1">
                                                                            {data.address}, {data.city} - {data.zip_code}
                                                                        </div>
                                                                        <div className="EditDeleteOption">
                                                                            <button className="EditAddress btn-orat-bg-grey" onClick={() => editAddress(data.id)}
                                                                                {...selectedeBtnId === data.id ? `disabled=${showeditLoader}` : ''} >

                                                                                {selectedeBtnId === data.id ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "EDIT"}
                                                                            </button>
                                                                            <button className="DeleteAddress btn-orat-bg-grey" onClick={() => deleteAddress(data.id)} id={data.id} type="button" {...selectedBtnId === data.id ? `disabled=${showdelLoader}` : ''}>
                                                                                {selectedBtnId === data.id ? <RotatingLines color="#FFFFFF" height={30} width={30} /> : "DELETE"}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className="AddressStickyAction">
                                                        <button type="button" className="btn-primary-black" onClick={handleShow}>
                                                         ADD NEW ADDRESS
                                                        </button>
                                                    </div>

                                                    <Modal show={show} onHide={handleClose} size="lg">
                                                        <Modal.Body>
                                                            <form onSubmit={handleaddAddressSubmit} className='address_form flex'>
                                                                <div className="AddressFormWrapperWidth layout column m-t-20 m-l-20 m-b-20 m-r-20">
                                                                    <Alerts singleerror={errors} successm={successm} />
                                                                    <div>
                                                                        <div className="layout justify-space-between m-b-20">
                                                                            <h4 className="m-l-12 m-b-12 m-t-0 text-uppercase demi-bold">{selectededitId ? 'Edit Address' : 'Add Address'}</h4>
                                                                            <div className='btn-icon' style={{ cursor: 'pointer' }} onClick={handleClose}> <IoClose /> </div>
                                                                        </div>
                                                                        <div className="CommonAddressForm">
                                                                            <div className="input-container">
                                                                                <div className="layout justify-space-between align-start">
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="fname" value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required />
                                                                                    </div>
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" required />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <div className="layout justify-space-between align-start">
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="streetaddress" value={streetaddress} onChange={(e) => setStreetAddress(e.target.value)} type="text" placeholder="Street Address" required />
                                                                                    </div>
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="zipcode" value={zipcode} onChange={(e) => setZipCode(e.target.value)} type="number" placeholder="Zip / Postal Code" required />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <div className="layout justify-space-between align-start">
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="city" value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" required />
                                                                                    </div>
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
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
                                                                                <div className="layout justify-space-between align-start">
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
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
                                                                                    <div className="layout column flex xs6 input-container-controls m-l-12 m-r-12">
                                                                                        <input name="mobileno" value={mobileno} onChange={(e) => handlephone(e)} onKeyUp={(e) => handlephone(e)} type="number" placeholder="Mobile Number" required />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-container m-t-25 m-l-12 m-r-12">
                                                                        <div className="layout justify-center align-start">
                                                                            <div className="layout flex xs6">
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
            ) : ''
        )
    )
}
export default AddAddress