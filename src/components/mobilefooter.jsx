import React, { useEffect, useState } from 'react';

import { Bag, S, Shape22, Shape23, Shape24, Shape25, Telephone, Videoicon, Visa, Whatsapp, Whatsapp1, sale } from '../image'
import { FiPhone } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlineMail } from "react-icons/md";
import { RiScissorsCutLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css'
import { Modal } from 'react-bootstrap';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import Browse from './browse';

import Seacrhproducts from './Seacrhproducts';
import { RiWhatsappFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

import { searchDetails } from '../services/Product-service';

import Alerts from '../components/Alerts';
import { addNewsletter } from '../services/User-service';
import { RotatingLines } from "react-loader-spinner";
import CategoryImgList from './CategoryImgList';
import { menuList } from '../services/General-service';
import { api_base_url } from "../config/apiConfig";
import Recently from './recently';
import Trending from './trending';

function Mobilefooter() {

    const location = useLocation();

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [searchVal, setsearchVal] = useState("");
    const [searchproducts, setSearchResults] = useState([]);
    const [searchloading, setsearchLoading] = useState(false);
    const [timer, setTimer] = useState(null);

    const [isFooterVisible, setIsFooterVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [menuArr, setMenuArr] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    const currentPath = location.pathname || "";
    const currentSearch = location.search || "";
    const activeCampaignId = new URLSearchParams(currentSearch).get('campaign');
    const isHomePage = currentPath === "/" || currentPath === "/home";
    const isCategoryPage = currentPath.startsWith("/category");
    const isSaleCampaignActive = isCategoryPage && activeCampaignId === "8";
    // const isSaleCampaignActive = currentPath.startsWith("/category") && activeCampaignId === "8";

    const resolveAssetUrl = (value) => {
        if (!value || typeof value !== 'string') return '';
        const trimmed = value.trim();
        if (!trimmed) return '';
        if (/^https?:\/\//i.test(trimmed)) return trimmed;
        if (!api_base_url) return trimmed;
        const base = api_base_url.endsWith('/') ? api_base_url : `${api_base_url}/`;
        if (trimmed.startsWith('/')) return `${base}${trimmed.slice(1)}`;
        return `${base}${trimmed}`;
    };

    const resolveCampaignThumb = (campaign, randomProducts) => {
        if (!campaign) return "";
        const iconCandidate =
            campaign.icon ||
            campaign.icon_name ||
            campaign.mobile_cover ||
            campaign.cover ||
            campaign.image ||
            campaign.banner ||
            campaign.mobile_image ||
            "";

        if (iconCandidate) {
            if (/^https?:\/\//i.test(iconCandidate)) return iconCandidate;
            const cleaned = iconCandidate.replace(/^\/+/, "");
            return resolveAssetUrl(cleaned.includes('public/upload') ? cleaned : `public/upload/${cleaned}`);
        }

        return (randomProducts && randomProducts[0]?.product_thumbail) || "";
    };

    const getMenuList = () => {
        menuList({
            random_products_limit: 12,
            random_product_limit: 12,
            random_limit: 12,
            products_limit: 12,
            limit: 12,
        })
            .then((data) => {
                setMenuArr(data?.campaigns || []);
            })
            .catch(() => {
                setMenuArr([]);
            });
    };

    useEffect(() => {
        getMenuList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (show) {
            getMenuList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("searchHistory"));
            if (Array.isArray(stored)) {
                setSearchHistory(stored);
            }
        } catch (e) {
            // ignore
        }
    }, []);

    const saveSearchTerm = (term) => {
        if (!term || !term.trim()) return;
        const cleanTerm = term.trim();
        setSearchHistory((prev) => {
            const filtered = prev.filter((t) => t.toLowerCase() !== cleanTerm.toLowerCase());
            const updated = [cleanTerm, ...filtered].slice(0, 10);
            try {
                localStorage.setItem("searchHistory", JSON.stringify(updated));
            } catch (e) {
                // ignore
            }
            return updated;
        });
    };

    useEffect(() => {
        if (searchVal && searchproducts && Array.isArray(searchproducts) && searchproducts.length > 0) {
            saveSearchTerm(searchVal);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchVal, searchproducts]);

    const handleClearHistory = () => {
        setSearchHistory([]);
        try {
            localStorage.removeItem("searchHistory");
        } catch (e) {
            // ignore
        }
    };

    const handleHistoryClick = (term) => {
        setsearchVal(term);
        getsearchDetails(term);
    };

    // Scroll handler for mobile home page bottom footer hide/show
    useEffect(() => {
        if (show) {
            setIsFooterVisible(true);
            return;
        }
        if (!(isHomePage || isCategoryPage)) {
            setIsFooterVisible(true);
            return;
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show footer when at top or scrolling up
            if (currentScrollY < 10) {
                setIsFooterVisible(true);
            }
            // Hide footer when scrolling down (more than 50px)
            else if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsFooterVisible(false);
            }
            // Show footer when scrolling up
            else if (currentScrollY < lastScrollY) {
                setIsFooterVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage, isCategoryPage, lastScrollY,show]);

    const getsearchDetails = (searchValue) => {
        const nextValue = typeof searchValue === 'string' ? searchValue : "";
        setsearchVal(nextValue);

        setsearchLoading(true);
        if (nextValue.trim().length >= 3) {
            clearTimeout(timer);
            const newTimer = setTimeout(() => {
                const searchdetails = {
                    search_value: nextValue
                }

                searchDetails(searchdetails)
                    .then((data) => {
                        setSearchResults(data.data);
                        setsearchLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching search list:", error);
                        setsearchLoading(false);
                    });
            }, 1000);
            setTimer(newTimer);
        } else {
            setSearchResults([]);
            setsearchLoading(false);
        }

    };
    const clearSearch = () => {
        setsearchVal("");
        setSearchResults([]);
        setsearchLoading(false);
    };
    const seacrHide = () => {
        setShow(false)
    }
    useEffect(() => {
        if (typeof document === 'undefined') return;
        const body = document.body;
        if (!body) return;
        if (show) body.classList.add('search-open');
        else body.classList.remove('search-open');
        return () => body.classList.remove('search-open');
    }, [show]);

    useEffect(() => {
        if (!show) return;
        if (typeof document === 'undefined') return;
        let attempts = 0;
        const focusInterval = setInterval(() => {
            attempts += 1;
            const inputEl = document.querySelector('.search_model input.msrch.SearchHeaderInput');
            if (inputEl && typeof inputEl.focus === 'function') {
                inputEl.focus();
                try {
                    const len = inputEl.value?.length ?? 0;
                    inputEl.setSelectionRange?.(len, len);
                } catch (e) {
                    // ignore
                }
                clearInterval(focusInterval);
                return;
            }

            if (attempts >= 12) {
                clearInterval(focusInterval);
            }
        }, 50);

        return () => clearInterval(focusInterval);
    }, [show]);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
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
    const handleSearchModalNavClick = (e) => {
        const anchor = e?.target?.closest?.('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href') || '';
        if (!href || href === '#') return;

        seacrHide();
    };

    const closeSearchModalForNav = (shouldReopenOnBack = true) => {
        if (shouldReopenOnBack) {
            try { sessionStorage.setItem('reopenSearchOnBack', '1'); } catch (e) { }
        }
        setShow(false);
    };

    // place with other useEffect hooks
    useEffect(() => {
        const onPopState = () => {
            try {
                const flag = sessionStorage.getItem('reopenSearchOnBack');
                if (flag === '1') {
                    setShow(true);                         // reopen modal
                    sessionStorage.removeItem('reopenSearchOnBack');
                }
            } catch (e) { }
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);
    return (
        <div className='App d_none d_sm_block'>
            <div id='footerContainer' className="Footer">
                <div className="FooterFirstSectionContainer">
                    <div className="BreakPointContainer">
                        <div className="FooterSecondSectionContainer layout align-center mb-3">
                            <div className="FooterSecondSection BreakPointContainer">
                                <div className="layout align-center justify-space-around full-height">
                                    <div className="align-center justify-center DynamicHeightLoaderFallback">
                                        <img src="https://img.perniaspopupshop.com/pwa-assets/icons/24-hour-customer-support.svg" alt="24x7 customer support" className='mobile_footer_icon' style={{ transform: 'translate(10px, 0px)', }} />
                                    </div>
                                    <div className="align-center justify-center DynamicHeightLoaderFallback">
                                        <img src="https://img.perniaspopupshop.com/pwa-assets/icons/500-designers.svg" alt="500+ designers" className='mobile_footer_icon' />
                                    </div>
                                    <div className="align-center justify-center DynamicHeightLoaderFallback">
                                        <img src="https://img.perniaspopupshop.com/pwa-assets/icons/free-international-shipping.svg" alt="free international shipping" className='mobile_footer_icon' />
                                    </div>
                                </div>
                                <div className="layout align-center justify-space-around full-height">
                                    <div className="icon_and_text">
                                        <div>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                {/* <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                        <img src={Shape22} alt="logo" className='mobile_footer_icon'/>
                                                    </div> */}
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="bold text-uppercase">24X7 <br /> Customer<br /> Support</h6>
                                        </div>
                                    </div>
                                    <div className="icon_and_text">
                                        <div>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                {/* <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                       <img src={Shape23} alt="logo" className='trick'/>
                                                    </div> */}
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="bold">500+<br /> DESIGNERS</h6>
                                        </div>
                                    </div>
                                    <div className="icon_and_text">
                                        <div>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                {/* <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                        <img src={Shape24} alt="logo" className='footer_icon_24'/>
                                                    </div> */}
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="bold">FREE <br /> SHIPPING</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="BreakPointContainer FooterFirstSection layout wrap">
                            <Accordion className='w-100 mt-4 accor_det'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header> ABOUT US </Accordion.Header>
                                    <Accordion.Body className='layout column'>
                                        <Link to="/about-us" target='_blank'>KNOW ABOUT ORAT </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>QUICK LINKS</Accordion.Header>
                                    <Accordion.Body className='layout column'>
                                        <Link to="/best-sellers"> BESTSELLERS </Link>
                                        <Link to="/category/?campaign=8"> SALE </Link>
                                        <Link to="/category?sort_by=newest"> LATEST DESIGNES </Link>
                                        <Link to="/giftcards"> GIFT CARDS </Link>
                                        <Link to="/category/?occasion_id=all"> OCCASIONS </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>CUSTOMER CARE</Accordion.Header>
                                    <Accordion.Body className='layout column'>
                                        <Link to="/shipping-information" target='_blank'> SHIPPING INFORMATION </Link>
                                        <Link to="/return-and-exchange" target='_blank'> RETURNS & EXCHANGE </Link>
                                        <Link to="/terms-and-conditions" target='_blank'> TERMS & CONDITIONS </Link>
                                        <Link to="/privacy-cookie-policy" target='_blank'> PRIVACY & COOKIE POLICIES </Link>
                                        <Link to="/faqs" target='_blank'> FAQS </Link>
                                        <Link to="/sitemap.xml"> SITE MAP </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>CONTACT US</Accordion.Header>
                                    <Accordion.Body className='layout column'>
                                        <Link to="tel:+919147072827" className='layout link-container'>
                                            {/* <div className="DynamicHeightLoaderWrapper icon">
                                                                                   <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                                                       <img src={Telephone} alt="logo" className='contact-icons DynamicHeightLoaderImage'/>
                                                                                       <FiPhone style={{ fontSize: '37px',padding: '0px' }} />
                                                                                   </div>
                                                                               </div> */}
                                            <FiPhone style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                            <p className='m-b-0'> Call us on <a href="tel:+919147072827">(+91) 9147072827</a> </p>
                                        </Link>
                                        <Link to="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!" className='layout link-container' target='_blank'>
                                            {/* <div className="DynamicHeightLoaderWrapper icon">
                                                                                   <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                                                       <img src={Whatsapp} alt="logo" className='contact-icons DynamicHeightLoaderImage'/>
                                                                                   </div>
                                                                               </div> */}
                                            <RiWhatsappFill style={{ fontSize: '20px', padding: '0px', marginRight: '5px', color: '#2AB13F' }} />
                                            <p className='m-b-0'> Whatsapp us on (+91) 91470 72827 </p>
                                        </Link>
                                        <div className='layout link-container'>
                                            {/* <div className="DynamicHeightLoaderWrapper icon">
                                                                                   <div className="align-center justify-center DynamicHeightLoaderFallback">
                                                                                       <img src={Whatsapp} alt="logo" className='contact-icons DynamicHeightLoaderImage'/>
                                                                                   </div>
                                                                               </div> */}
                                            <MdOutlineEmail style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                            <p className='m-b-0'> Email us at <a href="mailto:sales@orat.in" onClick={(e) => e.stopPropagation()}>sales@orat.in</a> </p>
                                        </div>
                                        {/* <div className="m-t-10">
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
                                               
                                            </div>
                                        </div> */}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <div className="BreakPointContainer footer_break">
                                <div className="FooterThirdSectionContainer layout align-center">
                                    <div className="FooterThirdSection BreakPointContainer mobile_foot_third">
                                        <div className="align-center justify-center">
                                            <div className="layout column align-center justify-center">
                                                <div className="custom-flex layout column align-center justify-center">
                                                    <div className="FooterThirdSectionLeft text-center">
                                                        <h4 className="bold m-b-5">COMPLETELY SAFE AND SECURE PAYMENT METHOD</h4>
                                                        <p className="bold m-b-10">We accept Netbanking, all major credit cards.<br /> We also accept orders with cash payment</p>
                                                        <div className="text-center">
                                                            <img
                                                                src={"https://res.cloudinary.com/dgif730br/image/upload/v1764586400/Payment_options_hicxg3.png"}
                                                                alt="Payment options"
                                                                style={{ width: '80%', maxWidth: '260px', height: 'auto' }}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* <div className='text-center'>
                                                            <img src={Razorpay} alt="logo" style={{width: '20%'}}/>
                                                        </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="layout column" style={{ overflow: 'hidden', }}>
                                {/* <h4 className='bold'> GET orat’S POP-UP SHOP APP </h4> */}
                                {/* <p className="m-b-20">We will send you a link on your Email or Phone, open it on your phone and download the App.</p> */}
                                {/* <div>
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
                                    </div> */}
                                <div className="mt-4 text-center footer_sdf">
                                    <h4 className="bold">FOLLOW US</h4>
                                    <div className="layout align-center justify-content-center SocialMediaLinks">
                                        <Link to="https://www.facebook.com/oratkolkata" target='_blank' className='m-r-5 foot_des'>
                                            <FaFacebookSquare className='foot_svgi' style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                        </Link>
                                        <a href="https://www.instagram.com/orat.in?igsh=NDNnOWZzY2JwenU=" className='m-r-5 foot_des'>
                                            <FaInstagram className='foot_svgi' style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                        </a>
                                        <a href="" className='m-r-5 foot_des'>
                                            <FaXTwitter className='foot_svgi' style={{ fontSize: '18px', padding: '0px', marginRight: '5px' }} />
                                        </a>
                                    </div>
                                </div>

                                {/* <div className="mt-4 text-center footer_sdf">
                                    <p className="bold m-b-10">Orat Shop App on Mobile</p>
                                    <div className="layout align-center justify-content-center" style={{ gap: '10px' }}>
                                        <img
                                            src="https://www.perniaspopupshop.com/public/icons/app-store-badge.svg"
                                            alt="App Store"
                                            style={{ width: '135px', height: '40px' }}
                                        />
                                        <img
                                            src="https://www.perniaspopupshop.com/public/icons/google-play-badge.svg"
                                            alt="Google Play"
                                            style={{ width: '135px', height: '40px' }}
                                        />
                                    </div>
                                </div> */}

                                {/* <div className="layout row m-t-25 align-center justify-content-center">
                                        
                                        <a href="" className="w-auto" target='_blank' style={{padding: '0px', marginLeft: '20px'}}>
                                            <div className="DynamicHeightLoaderWrapper icon">
                                                <div className="DynamicHeightLoader layout row align-center justify-center DynamicHeightLoaderFallback">
                                                    <img src={Appstore} alt="logo" className='AppStoreImage DynamicHeightLoaderImage' style={{width: '100%', padding: '0px'}}/>
                                                </div>
                                            </div>
                                            
                                        </a>
                                        <a href="" className="m-r-8 w-auto" target='_blank'>
                                        <div className="DynamicHeightLoaderWrapper icon">
                                                <div className="DynamicHeightLoader layout row align-center justify-center DynamicHeightLoaderFallback">
                                                    <img src={Play} alt="logo" className='AppStoreImage DynamicHeightLoaderImage' style={{width: '100%', padding: '0px'}}/>
                                                </div>
                                            </div>
                                        </a>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="BreakPointContainer mb-4">
                <div className="FooterFourSection align-center footer-bottom">
                    <h1> SHOP ONLINE AT ORAT </h1>
                    <div dangerouslySetInnerHTML={{ __html: shopOnlineHtml }} />
                </div>
            </div>
            <div className={`footer${isFooterVisible ? " show-footer" : ""}`}>
                <div className="footer-content layout row vertical_bar">
                    <Link
                        to="/"
                        className={`${isHomePage ? "active " : ""}ripplePsl custom-flex text-center`}
                    >

                        <img src={Bag} alt="logo" className='iconNew' />
                        <p> Home </p>
                    </Link>
                    {/* <button className='ripplePsl custom-flex'>
                        <img src={Videoicon} alt="logo" className='iconNew'/>
                        <p> Video Shopping </p>
                    </button> */}
                    <button
                        onClick={() => handleShow(true)}
                        className={`${show ? "active " : ""}ripplePsl custom-flex`}
                    >
                        <img src={S} alt="logo" className='iconNew' />
                        <p> explore </p>
                    </button>

                    <Link to="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!" className='ripplePsl custom-flex text-center'>
                        <img src={Whatsapp1} alt="logo" className='iconNew' />
                        <p> Whatsapp </p>
                    </Link>
                    <Link
                        to="/category/?campaign=8"
                        className={`${isSaleCampaignActive ? "active " : ""}ripplePsl custom-flex text-center`}
                    >
                        <img src={sale} alt="logo" className='iconNew' />
                        <p> Campaign </p>
                    </Link>
                </div>
            </div>
            <div className="search_model">
                <Modal className='App search_mobile_contact' show={show} fullscreen={fullscreen} onHide={() => seacrHide()}>
                    <div className="container shsh">
                        <Modal.Header className='sh1'>
                            <div className="SearchHeaderBar">
                                <button className="SearchBackBtn" onClick={() => seacrHide()} type="button">
                                    <img
                                        src="https://img.perniaspopupshop.com/pwa-assets/icons/back.svg"
                                        alt="Back"
                                        className="SearchBackIcon"
                                    />
                                </button>

                                <div className="SearchHeaderInputWrap">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="SearchHeaderIcon"
                                    >
                                        <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h24v24H0z" />
                                            <path stroke="#757575" strokeWidth="1.5" strokeLinecap="round" d="m14.436 14.434 4.314 4.316" />
                                            <circle stroke="#757575" strokeWidth="1.5" cx="10.5" cy="10.5" r="5.25" />
                                        </g>
                                    </svg>

                                    <MDBInput
                                        placeholder='Search for products, categories, trends'
                                        name='search'
                                        value={searchVal}
                                        onChange={(e) => getsearchDetails(e.target.value)}
                                        className='msrch SearchHeaderInput'
                                        autoFocus
                                    />
                                    {searchVal ? (
                                        <button
                                            type="button"
                                            className="SearchClearBtn"
                                            aria-label="Clear search"
                                            onClick={clearSearch}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6l12 12" stroke="#757575" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </Modal.Header>
                        <Modal.Body className='md_sh' onClickCapture={handleSearchModalNavClick}>
                            <div className="SearchCampaignScroller">
                                {menuArr && menuArr.length > 0 ? (
                                    <div className="SearchCampaignTabs">
                                        {menuArr.map((data, index) => {
                                            const menuUrl = `/category/?campaign=${data.campaign.id}`;
                                            const thumb = resolveCampaignThumb(data.campaign, data.random_products);
                                            return (
                                                <Link
                                                    key={`${data.campaign.id}-${index}`}
                                                    to={menuUrl}
                                                    className="SearchCampaignTab"
                                                    onClick={() => seacrHide()}
                                                >
                                                    {thumb ? (
                                                        <span className="search-campaign-thumb">
                                                            <img
                                                                src={resolveAssetUrl(thumb)}
                                                                alt={data.campaign.campaign_title}
                                                            />
                                                        </span>
                                                    ) : null}
                                                    <span className="search-campaign-label">{data.campaign.campaign_title}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="SearchCampaignFallback">
                                        <CategoryImgList />
                                    </div>
                                )}
                            </div>
                            {searchVal && searchproducts ?
                                <>
                                    <Seacrhproducts seacrHide={seacrHide} searchvalue={searchVal} searchlist={searchproducts} closeModal={closeSearchModalForNav} />
                                </>
                                : (
                                    <>
                                        {searchHistory && searchHistory.length > 0 && (
                                            <div className="SearchHistorySection">
                                                <div className="SearchHistoryHeader">
                                                    <h5 className="demi-bold">SEARCH HISTORY</h5>
                                                    <button
                                                        type="button"
                                                        className="SearchHistoryClear p3 demi-bold"
                                                        onClick={handleClearHistory}
                                                    >
                                                        CLEAR ALL
                                                    </button>
                                                </div>
                                                <div className="SearchHistoryList">
                                                    {searchHistory.map((term, index) => (
                                                        <button
                                                            key={`${term}-${index}`}
                                                            type="button"
                                                            className="SearchHistoryChip p3"
                                                            onClick={() => handleHistoryClick(term)}
                                                        >
                                                            {term}
                                                            <span className="chip-close">×</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <Recently showrecentviewed={true} className="SearchModalRecently" />
                                        <div className="test_border"></div>
                                        <Trending />
                                    </>
                                )}
                        </Modal.Body>
                    </div>
                </Modal>
            </div>

        </div>

    )
}

export default Mobilefooter