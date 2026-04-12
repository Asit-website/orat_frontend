import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Appstore, Backtotop, Chaticon, Play, Razorpay, Shape22, Shape23, Shape24, Shape25, Telephone, Visa, Whatsapp } from '../image'
import { FiPhone } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import { TbHanger } from "react-icons/tb";
import { TiPlaneOutline } from "react-icons/ti";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { RiScissorsCutLine } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import Alerts from '../components/Alerts';
import { addNewsletter } from '../services/User-service';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const hideTimeoutRef = useRef(null);
    const isHidingRef = useRef(false);

    // Show button when page is scrolled down
    const toggleVisibility = useCallback(() => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollPosition > 160) {
            // Clear any pending hide animation
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }
            if (isHidingRef.current) {
                setIsHiding(false);
                isHidingRef.current = false;
            }
            if (!isVisible) {
                setIsVisible(true);
            }
        } else {
            // When scrolling to top, trigger hide animation
            if (isVisible && !isHidingRef.current) {
                isHidingRef.current = true;
                setIsHiding(true);
                hideTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                    setIsHiding(false);
                    isHidingRef.current = false;
                    hideTimeoutRef.current = null;
                }, 400); // Match animation duration
            }
        }
    }, [isVisible]);

    // Scroll to top smoothly
    const scrollToTop = useCallback(() => {
        // Trigger hide animation immediately
        if (!isHidingRef.current) {
            isHidingRef.current = true;
            setIsHiding(true);
            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                setIsHiding(false);
                isHidingRef.current = false;
                hideTimeoutRef.current = null;
            }, 400);
        }
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, [toggleVisibility]);

    const [showLoader, setShowLoader] = useState(false);
    const [newsemail, setnewsemail] = useState('');
    const [errors, seterrors] = useState([]);
    const [successm, setsuccessm] = useState('');

    const fallbackShopOnlineHtml = `<p><span>At ORAT, we bring you a curated world of women's ethnic wear crafted with elegance and artistry. From timeless suit sets to contemporary coord sets, our collections are designed to celebrate every occasion with sophistication and grace.</span></p><p><span>Whether you're dressing for festive celebrations, weddings, cocktail evenings, or intimate gatherings, ORAT ensures that every piece blends heritage handwork with modern silhouettes. With a diverse range of styles and hand-embroidered detailing, our ensembles are crafted to make you look and feel exceptional.</span></p><p><span>Beyond clothing, ORAT offers a personalized luxury shopping experience with styling guidance to help you create the perfect look - be it for bridal trousseau planning, wedding functions, or festive wardrobes.</span></p><p><span>ORAT is your one-stop destination for luxury ethnic wear that reflects tradition, celebrates craftsmanship, and embraces today's woman.</span></p>`;
    const [shopOnlineHtml, setShopOnlineHtml] = useState(fallbackShopOnlineHtml);

    useEffect(() => {
        let isMounted = true;

        const loadShopOnlineText = async () => {
            try {
                const res = await fetch('https://admin.orat.in/api/web/shop_online_text');
                const json = await res.json();

                const content = json?.data?.content;
                if (isMounted && typeof content === 'string' && content.trim()) {
                    setShopOnlineHtml(content);
                }
            } catch (e) {
                // Keep fallback content
            }
        };

        loadShopOnlineText();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleNewslSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const userDetails = {
            email: newsemail
        }

        addNewsletter(userDetails).then((data) => {
            setShowLoader(false);
            if (data.status) {
                setnewsemail('');
                setShowLoader(false);
                setsuccessm(data.message);
                seterrors([]);

            } else {
                setsuccessm('');
                seterrors(data.message);

            }

        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("Add newsletter error:", error);
            }
        })

    };

    return (
        <div className='App d_none d_lg_block'>
            <div id='footerContainer' className="Footer">
                <div className="FooterFirstSectionContainer">
                    <div className="BreakPointContainer">
                        <div className="BreakPointContainer FooterFirstSection layout wrap">
                            <div className="custom-flex layout column">
                                <h4 className='bold'> ABOUT US </h4>
                                <Link to="/about-us" target='_blank'>KNOW ABOUT ORAT </Link>
                            </div>
                            <div className="custom-flex layout column">
                                <h4 className='bold'> QUICK LINKS </h4>
                                <Link to="/best-sellers"> BESTSELLERS </Link>
                                <Link to="/category/?campaign=8"> SALE </Link>
                                <Link to="/category?sort_by=newest"> LATEST DESIGNES </Link>
                                <Link to="/giftcards"> GIFT CARDS </Link>
                                <Link to="/category/?occasion_id=all"> OCCASIONS </Link>
                            </div>
                            <div className="custom-flex layout column">
                                <h4 className='bold'> CUSTOMER CARE </h4>
                                <Link to="/shipping-information" target='_blank'> SHIPPING INFORMATION </Link>
                                <Link to="/return-and-exchange" target='_blank'> RETURNS & EXCHANGE </Link>
                                <Link to="/terms-and-conditions" target='_blank'> TERMS & CONDITIONS </Link>
                                <Link to="/privacy-cookie-policy" target='_blank'> PRIVACY & COOKIE POLICIES </Link>
                                <Link to="/faqs" target='_blank'> FAQS </Link>
                                <Link to="/sitemap.xml"> SITE MAP </Link>
                            </div>
                            <div className="custom-flex layout column">
                                <h4 className='bold'> CONTACT US </h4>
                                <div>
                                    <Link to="tel:+919147072827" className='layout link-container'>
                                        {/* <div className="DynamicHeightLoaderWrapper icon">
                                            <div className="DynamicHeightLoader layout row align-center justify-center DynamicHeightLoaderFallback">
                                                <img src={Telephone} alt="logo" className='contact-icons DynamicHeightLoaderImage'/>
                                                <FiPhone style={{ fontSize: '37px',padding: '0px' }} />
                                            </div>
                                        </div> */}
                                        <FiPhone style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                        <p className='m-b-0'> Call us on <a href="tel:+919147072827">(+91) 9147072827</a> </p>
                                    </Link>
                                    <Link to="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!" className='layout link-container' target='_blank'>
                                        {/* <div className="DynamicHeightLoaderWrapper icon">
                                            <div className="DynamicHeightLoader layout row align-center justify-center DynamicHeightLoaderFallback">
                                                <img src={Whatsapp} alt="logo" className='contact-icons DynamicHeightLoaderImage'/>
                                            </div>
                                        </div> */}
                                        <RiWhatsappFill style={{ fontSize: '20px', padding: '0px', marginRight: '5px', color: '#2AB13F' }} />
                                        <p className='m-b-0'> Whatsapp us on (+91) 91470 72827 </p>
                                    </Link>
                                    <div className='layout link-container'>
                                        {/* <div className="DynamicHeightLoaderWrapper icon">
                                            <div className="DynamicHeightLoader layout row align-center justify-center DynamicHeightLoaderFallback">
                                                <img src={Whatsapp} alt="logo" className='contact-icons DynamicHeightLoaderImage'/>
                                            </div>
                                        </div> */}
                                        <MdOutlineEmail style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                        <p className='m-b-0'> Email us at <a href="mailto:sales@orat.in" onClick={(e) => e.stopPropagation()}>sales@orat.in</a> </p>
                                    </div>
                                    <div className="m-t-10">
                                        <h4 className="bold">FOLLOW US</h4>
                                        <div className="layout align-center SocialMediaLinks">
                                            <Link to="https://www.facebook.com/oratkolkata" target='_blank' className='m-r-5'>
                                                <FaFacebookSquare style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                            </Link>
                                            <Link to="https://www.instagram.com/orat.in?igsh=NDNnOWZzY2JwenU=" target='_blank' className='m-r-5'>
                                                <FaInstagram style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                            </Link>
                                            <Link to="/" className='m-r-5'>
                                                <FaXTwitter style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                            </Link>
                                            {/*<Link to="/" className='m-r-5'>
                                                <FaPinterestP style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="custom-flex layout column">
                                    <h4 className='bold'> GET orat’S POP-UP SHOP APP </h4>
                                    <p className="m-b-20">We will send you a link on your Email or Phone, open it on your phone and download the App.</p>
                                    <div>
                                            <form>
                                                <div className="radio m-b-20">
                                                    <label className="m-r-15">
                                                        <input type="radio" name="gender" value="email" checked/> Email
                                                        <span></span>
                                                    </label>
                                                        <label>
                                                            <input type="radio" name="gender" value="phone"/>  Phone
                                                        </label>
                                                </div>
                                                <div className="layout justify-space-between AppShareForm">
                                                    <div className="flex">
                                                        <input type="email" value="" required="" className="su-inputBox" placeholder="Email Address"/>
                                                    </div>
                                                    <button type="submit" className="su-btn btn-orat-primary flex bold">SHARE APP LINK</button>
                                                </div>
                                            </form>
                                    </div>
                                    <div className="layout row m-t-25">
                                       <Link to="/" className="w-auto" target='_blank' style={{padding: '0px', marginLeft: '20px'}}>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                <div className="DynamicHeightLoader layout row align-center justify-center DynamicHeightLoaderFallback">
                                                    <img src={Appstore} alt="logo" className='AppStoreImage DynamicHeightLoaderImage' style={{width: '100%', padding: '0px'}}/>
                                                </div>
                                            </div>
                                            
                                        </Link>
                                       <Link to="/" className="m-r-8 w-auto" target='_blank'>
                                        <div className="DynamicHeightLoaderWrapper icon">
                                                <div className="DynamicHeightLoader layout row align-center justify-center DynamicHeightLoaderFallback">
                                                    <img src={Play} alt="logo" className='AppStoreImage DynamicHeightLoaderImage' style={{width: '100%', padding: '0px'}}/>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div className="BreakPointContainer">
                    <div className="FooterSecondSectionContainer layout align-center">
                        <div className="FooterSecondSection BreakPointContainer">
                            <div className="layout align-center justify-space-around full-height">
                                <div className="flex layout align-center justify-center">
                                    <div>
                                        <div className="DynamicHeightLoaderWrapper icon">
                                            <div className="layout row align-center justify-center DynamicHeightLoaderFallback">
                                                {/* <LiaPhoneVolumeSolid  style={{ fontSize: '55px', color: '#000', padding: '0px' }} /> */}
                                                <img src={Shape22} alt="logo" className='footer_icon' />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="bold text-uppercase">24 X 7 Whatsapp customer support</h6>
                                    </div>
                                </div>
                                <div className="flex layout align-center justify-center">
                                    <div>
                                        <div className="DynamicHeightLoaderWrapper icon">
                                            <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                {/* <i className="fa-solid fa-truck-fast" style={{ fontSize: '22px', color: '#000', padding: '0px' , marginRight: '10px'}}></i> */}
                                                <img src={Shape23} alt="logo" className='footer_icon' />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="bold">FREE SHIPPING</h6>
                                    </div>
                                </div>
                                <div className="flex layout align-center justify-center">
                                    <div>
                                        <div className="DynamicHeightLoaderWrapper icon">
                                            <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                {/* <i className="fa-solid fa-rotate" style={{ fontSize: '22px', color: '#000', padding: '0px', marginRight: '10px' }}></i> */}
                                                <img src={Shape24} alt="logo" className='footer_icon_24' />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="bold">EASY RETURNS & EXCHANGE</h6>
                                    </div>
                                </div>
                                <div className="flex layout align-center justify-center">
                                    <div>
                                        <div className="DynamicHeightLoaderWrapper icon">
                                            <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                {/* <i className="fa-solid fa-scissors" style={{ fontSize: '22px', color: '#000', padding: '0px', marginRight: '10px' }}></i> */}
                                                {/* <img src={Shape25} alt="logo" className='footer_icon_25'/> */}
                                                <RiScissorsCutLine style={{ fontSize: '30px', color: '#000', padding: '0px', marginRight: '10px' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="bold">CUSTOM FITTINGS</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="FooterThirdSectionContainer layout align-center">
                        <div className="FooterThirdSection BreakPointContainer">
                            <div className="layout row align-center justify-center">
                                <div className="custom-flex layout column align-center justify-center">
                                    <div className="custom-flex layout column align-center justify-center">
                                        <div className="FooterThirdSectionLeft">
                                            <h4 className="bold m-b-5">COMPLETELY SAFE AND SECURE PAYMENT METHOD</h4>
                                            <p className="bold m-b-10">We accept Netbanking, all major credit cards. We also accept orders with cash payment</p>
                                        </div>
                                        <div className='text-center'>
                                            <img src={"https://res.cloudinary.com/dgif730br/image/upload/v1764586400/Payment_options_hicxg3.png"} alt="logo" style={{ width: '45%' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-flex SignUpSection">
                                    <div className="flex xs9">
                                        <div className="m-l-25 p-l-25">
                                            <p className="bold">Sign up to get exclusive style tips, new arrival updates and a special discount code.</p>
                                            <Alerts singleerror={errors} successm={successm} />
                                            <form onSubmit={handleNewslSubmit} className="layout justify-space-between">

                                                <div className="flex">
                                                    <input type="email" name="newsemail" value={newsemail} onChange={(e) => setnewsemail(e.target.value)} required className="su-inputBox" placeholder="Here's my Email" />
                                                </div>
                                                <button type="submit" className="su-btn btn-orat-primary flex bold">
                                                    {!showLoader ? "Sign Up" : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="BreakPointContainer mt-4 mb-4">
                <div className="FooterFourSection align-center footer-bottom">
                    <h1> SHOP ONLINE AT ORAT </h1>
                    <div dangerouslySetInnerHTML={{ __html: shopOnlineHtml }} />
                </div>
            </div>
            <div className="FooterThirdSectionContainer layout align-center">
                <div className="FooterThirdSection BreakPointContainer footer-powerdb">
                    <div className="layout row align-center justify-center">
                        <div className="custom-flex layout column align-center justify-center">
                            <div className="FooterThirdSectionLeft">

                                <p className="m-b-10 m-t-10">
                                    Powered by Ladliju Style Labs Private Limited
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="BackToTop">
                <img src={Backtotop} alt="logo" />
            </div> */}
            <div className="back-to-top">
                {isVisible && (
                    <div 
                        onClick={scrollToTop} 
                        className={`back-to-top-button ${isHiding ? 'slide-down' : ''}`}
                    >
                        <img src={Backtotop} alt="Go to top" />
                    </div>
                )}
            </div>
            <div className="Chatdiv">
                {/* <img src={Chaticon} alt="logo"/> */}
                <Link to="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!" target='_blank'>
                    <RiWhatsappFill style={{ fontSize: '40px', padding: '0px', color: '#ffffffff' }} />
                </Link>
            </div>

        </div>
    )
}

export default Footer