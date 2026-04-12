import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Complete from '../components/complete';
import Recently from '../components/recently';
import { useParams } from 'react-router-dom';
import { giftDetails } from '../services/Product-service';
import Footer from '../components/footer';
import ReactImageMagnify from 'react-image-magnify';
import { useDispatch,useSelector } from 'react-redux';
import { addCart } from '../services/User-service';
import { getTotals } from '../Redux/features/Cart/CartSlice';
import { BsDisplay } from 'react-icons/bs';
import LoginModal from '../components/loginmodal';
import { RotatingLines } from "react-loader-spinner";
import Alerts from '../components/Alerts';
import { getAllCartsd } from '../Redux/features/Cart/CartSlice';
export default function GiftcardsDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);


    const [GiftAllDetails, setGiftAllDetails] = useState();
    const [similarProduct, setSimilarProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [errorsa, seterrorsa] = useState([]);
    const [successma, setsuccessma] = useState('');
    const [customPriceDisplay, setCustomPriceDisplay] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    var modalHide = () => {
        setModalShow(false);
    }
    const getgiftDetails = (id) => {
        giftDetails(id).then((data) => {
            
            setGiftAllDetails(data.data);
            setSimilarProduct(data.similar_products);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getgiftDetails(id);
    }, [id])


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [formData, setFormData] = useState({
        price: "",
        pricecustom: "",
        name: "",
        recipname: "",
        recipemail: "",
        message: "",
    });
    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        if(name=='price'){
            if(value=='Custom Value'){
            setCustomPriceDisplay(true);
            }else{
                setCustomPriceDisplay(false);
            }
        }
    };
    const handleaddGiftSubmit = (e) => {
        e.preventDefault();
        if (userInfo) {
       
        setShowLoader(true);
        const userDetails = {
            formData: formData,
            user_id: userInfo?.data?.user?.id,
            gift_id: id,
        }

        addCart(userDetails).then((data) => {
            setShowLoader(false);
            if (data.success) {
                setsuccessma(data.message);
                seterrorsa([]);
                setFormData({
                    price: "",
                    pricecustom: "",
                    name: "",
                    recipname: "",
                    recipemail: "",
                    message: "",
                });
                dispatch(getAllCartsd(userDetails)).then(() => {
                    dispatch(getTotals(userInfo));
                });
            } else {
                setsuccessma('');
                seterrorsa(data.message);
            }

        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("Add Gift Card error:", error);
            }
        })
    }else {
        setModalShow(true);
    }

    };

    return (
        <>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div>
                            <div className="App other-page-top singleproductimg_mobile">
                                <div className="Product">
                                    <div className="ProductDetail BreakPointContainer">
                                        <div className="Breadcrumbs layout align-center">
                                            <div>
                                                <Link to="/" className="orat-color-hover ellipsis">Home</Link>
                                                <span className="m-l-5 m-r-5">&gt;</span>
                                            </div>
                                            <div>
                                                <Link to="/giftcards/" className="orat-color-hover ellipsis">Gifts</Link>
                                                <span className="m-l-5 m-r-5">&gt;</span>
                                            </div>
                                            <div>
                                                <span className="ellipsis">{GiftAllDetails?.title}</span>
                                            </div>
                                        </div>
                                        <div className="layout secpage">
                                            <div className="flex xs5 prel">
                                                <div className="layout align-start ProductImageSlider">
                                                    <div className="SelectedImage animated-background prel">
                                                        <ReactImageMagnify
                                                            {...{
                                                                smallImage: {
                                                                    alt: 'Product thumbnail',
                                                                    isFluidWidth: true,
                                                                    src: GiftAllDetails?.file,
                                                                },
                                                                largeImage: {
                                                                    src: GiftAllDetails?.file, // Use the same image for large and small for simplicity
                                                                    width: 1200, // Adjust dimensions as needed
                                                                    height: 1800, // Adjust dimensions as needed
                                                                },
                                                                enlargedImageContainerDimensions: {
                                                                    width: '150%',
                                                                    height: '150%',
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="ProductImageSlider_mobile">
                                                    <div className="item">
                                                        <div className="CarouselSection product">
                                                            <div className="prel Gutter">
                                                                <a href="">
                                                                    <div
                                                                        className="DynamicHeightLoaderWrapper"
                                                                        style={{ paddingTop: '50%', overflow: 'hidden' }}
                                                                    >
                                                                        <div
                                                                            className="DynamicHeightLoader layout row align-center justify-center"
                                                                            style={{ paddingTop: '22%' }}
                                                                        >
                                                                            <img
                                                                                src={GiftAllDetails?.file}
                                                                                alt="logo"
                                                                                className="img-resp DynamicHeightLoaderImage"
                                                                                style={{ padding: '10px', bottom: 'inherit' }}
                                                                            />
                                                                        </div>
                                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                                    </div>
                                                                    {/* <div className="image-gradient"></div> */}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex offset-xs1 xs6'>
                                                <div className="ProductDetailRight">
                                                    <div className="layout justify-space-between ">
                                                        <Link className="ProductTitle demi-bold h1 "> {GiftAllDetails.title} </Link>
                                                    </div>
                                                    <p className="ProductDesc p1 orat-dark-grey-color sectionSeparator pb-4"> {GiftAllDetails.long_desc} </p>
                                                    <div className="ProductInfo">
                                                        <div className="prel">
                                                            <div className="layout column justify-center ProductInfoBox  merryPromoCode">
                                                                <div className="layout align-start ">
                                                                    <div className="flex xs7">
                                                                    <Alerts singleerror={errorsa} successm={successma} />
                                                                        <form onSubmit={handleaddGiftSubmit} className="layout column">
                                                                            <div className="input-container">
                                                                                <select name="price" onChange={handleInputChange} value={formData.price}>
                                                                                    <option  disabled="">Select Value</option>
                                                                                    <option value="5000"><i className="fa fa-inr" style={{ fontSize:'13px'}}></i>5000</option>
                                                                                    <option value="10000"><i className="fa fa-inr" style={{ fontSize:'13px'}}></i>10000</option>
                                                                                    <option value="15000"><i className="fa fa-inr" style={{ fontSize:'13px'}}></i>15000</option>
                                                                                    <option value="20000"><i className="fa fa-inr" style={{ fontSize:'13px'}}></i>20000</option>
                                                                                    <option value="25000"><i className="fa fa-inr" style={{ fontSize:'13px'}}></i>25000</option>
                                                                                    <option value="Custom Value">Custom Value</option>
                                                                                </select>
                                                                            </div>
                                                                            {customPriceDisplay && (
                                                                                <>
                                                                            <div className="input-container">
                                                                                <input name="pricecustom" onChange={handleInputChange} value={formData.pricecustom} type="text" placeholder="Custom Price"  />
                                                                            </div>
                                                                            </>
                                                                            )}
                                                                            <div className="input-container">
                                                                                <input name="name" onChange={handleInputChange} value={formData.name} type="text" placeholder="Your Name" required />
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <input name="recipname" onChange={handleInputChange} value={formData.recipname} type="text" placeholder="Recipient's Name" required />
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <input name="recipemail" onChange={handleInputChange} value={formData.recipemail} type="email" placeholder="Recipient's E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <textarea name="message" onChange={handleInputChange} value={formData.message} placeholder="Message">
                                                                                </textarea>
                                                                            </div>
                                                                            <div className="layout align-center justify-center m-t-25">
                                                                                
                                                                                <button className="btn-orat-primary flex" type="submit" disabled={showLoader}>

                                                                                {!showLoader ? "ADD TO CART" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
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
                                        </div>
                                        <div className="m-b-20 mt-5">

                                            <div className="SimilarProductFromVueAI full-width">
                                                <Recently giftDetails={GiftAllDetails} />
                                            </div>
                                            <div className="SimilarProductFromVueAI full-width">
                                                <Complete giftDetails={GiftAllDetails} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <LoginModal
                    showModal={modalShow}
                    modalHide={modalHide}
                />
                        <Footer />
                    </>

                )
            }

        </>
    )
}
