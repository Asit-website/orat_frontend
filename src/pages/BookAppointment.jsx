import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Complete from '../components/complete';
import Recently from '../components/recently';
import { useParams } from 'react-router-dom';
import { giftDetails } from '../services/Product-service';
import Footer from '../components/footer';
import ReactImageMagnify from 'react-image-magnify';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../services/User-service';
import { BsDisplay } from 'react-icons/bs';
import LoginModal from '../components/loginmodal';
import { RotatingLines } from "react-loader-spinner";
import Alerts from '../components/Alerts';
import { getAllCartsd } from '../Redux/features/Cart/CartSlice';
import { Stores3 } from '../image';
import { Form } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import { addBookAppointment, getBookAppointmentImage } from '../services/Product-service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function BookAppointment() {

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
    const [bookDate, setBookDate] = useState(new Date());
    const [bookTime, setBookTime] = useState('0');
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
    const [appointmentImage, setAppointmentImage] = useState(Stores3);
    useEffect(() => {
        const fetchBookAppointmentImage = async () => {
            try {
                const data = await getBookAppointmentImage();
                if (data?.success && data?.data?.image_url) {
                    setAppointmentImage(data.data.image_url);
                }
            } catch (error) {
                console.log("Book Appointment image error:", error);
            }
        };

        fetchBookAppointmentImage();
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        book_message: "",
    });
    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleaddGiftSubmit = (e) => {
        e.preventDefault();
        if (userInfo) {

            setShowLoader(true);
            const userDetails = {
                formData: formData,
                bookDate:bookDate.toLocaleDateString(),
                bookTime:bookTime,
                user_id: userInfo?.data?.user?.id,
                type: 'book_appointment'
            }

            addBookAppointment(userDetails).then((data) => {
                setShowLoader(false);
                if (data.success) {
                    setsuccessma(data.message);
                    seterrorsa([]);
                    setFormData({
                        name: "",
                        email: "",
                        mobile: "",
                        book_message: "",
                    });
                    setBookDate(new Date());
                    setBookTime('0');  

                } else {
                    setsuccessma('');
                    seterrorsa(data.message);
                }

            }).catch((error) => {
                if (error) {
                    setShowLoader(false);
                    console.log("Book Appointment error:", error);
                }
            })
        } else {
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
                                                <Link to="/giftcards/" className="orat-color-hover ellipsis">Book Appointment</Link>

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
                                                                    src: appointmentImage,
                                                                },
                                                                largeImage: {
                                                                    src: appointmentImage, // Use the same image for large and small for simplicity
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
                                                                                src={appointmentImage}
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
                                                        <Link className="ProductTitle demi-bold h1 "> Book your Appointment </Link>
                                                    </div>
                                                    <p className="ProductDesc p1 orat-dark-grey-color sectionSeparator pb-4"> A personalised shopping experience awaits you</p>
                                                    <div className="ProductInfo">
                                                        <div className="prel">
                                                            <div className="layout column justify-center ProductInfoBox  merryPromoCode">
                                                                <div className="layout align-start ">
                                                                    <div className="flex xs7">
                                                                        <Alerts errors={errorsa} successm={successma} />
                                                                        <form onSubmit={handleaddGiftSubmit} className="layout column">


                                                                            <div className="input-container">
                                                                                <input name="name" onChange={handleInputChange} value={formData.name} type="text" placeholder="Full Name" required />
                                                                            </div>

                                                                            <div className="input-container">
                                                                                <input name="email" onChange={handleInputChange} value={formData.email} type="email" placeholder="E-mail Address" required />
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <input name="mobile" onChange={handleInputChange} value={formData.mobile} type="number"  placeholder="Mobile Number" required />
                                                                            </div>
                                                                            <div className="input-container">
                                                                                {/* <input name="book_date" onChange={handleInputChange} value={formData.book_date} type="date" placeholder="Date" required />
                                                                                */}
                                                                                <DatePicker
                                                                                    name="book_date"
                                                                                                                                                                     
                                                                                    selected={bookDate} 
                                                                                    onChange={(date) => setBookDate(date)}
                                                                                    minDate={new Date()}
                                                                                    value={bookDate}
                                                                                    placeholderText="Select a date"
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="input-container">
                                                                                <TimePicker
                                                                                    initialValue="00:00"
                                                                                    name='book_time'
                                                                                    start="00:00"
                                                                                    end="24:00"
                                                                                    format="HH:mm:ss"
                                                                                    step={30}
                                                                                    onChange={(time) => setBookTime(time)}
                                                                                    value={bookTime}
                                                                                    required
                                                                                    className='p-1'
                                                                                />
                                                                                {/* <input name="book_time" onChange={handleInputChange} value={formData.book_time} type="time" placeholder="Time" required />
                                                                              */}
                                                                            </div>

                                                                            <div className="input-container">
                                                                                <textarea name="book_message" onChange={handleInputChange} value={formData.book_message} placeholder="Tell us More">
                                                                                </textarea>
                                                                            </div>
                                                                            <div className="layout align-center justify-center m-t-25">

                                                                                <button className="btn-orat-primary flex" type="submit" disabled={showLoader}>

                                                                                    {!showLoader ? "Book Now" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
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
