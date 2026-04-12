import React, { useState, useEffect, useRef } from 'react';
import Singleproductimg from '../components/SingleProductImg';
import { Link } from 'react-router-dom';
import Similar from '../components/similar';
import Complete from '../components/complete';
import Fatiz from '../components/fatiz';
import { useParams } from 'react-router-dom';
import { productDetails } from '../services/Product-service';
import SingleProductTextDetails from '../components/SingleProductTextDetails';
import Footer from '../components/footer';
import { recentproductList } from '../services/Product-service';
import { blogsList } from '../services/General-service';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../components/Loader";
import { useDispatch } from 'react-redux';
import { addRecentlyViewedProduct } from '../Redux/features/Product/ProductSlice';
import { formatPrice } from "../utils/formatPrice";
export default function ProductDetails() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };
    const { id } = useParams();

    const [productAllDetails, setProductAllDetails] = useState();
    const [similarProduct, setSimilarProduct] = useState();
    const [fatizProducts, setFatizProducts] = useState([]);
    const [completeProducts, setCompleteProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productImglist, setproductImglist] = useState();
    const [productVarlist, setproductVarlist] = useState();
    const [couponslist, setCouponslist] = useState();
    const [blogs, setBlogs] = useState([]);
    const dispatch = useDispatch();

    // Function to shuffle array randomly
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };


    const getProductDetails = (id) => {
        productDetails(id).then((data) => {
            console.log("gggggggg",data);

            setProductAllDetails(data.product);
            const similarProducts = data.similar_products || [];
            setSimilarProduct(similarProducts);
            
            // Create different shuffled arrays for each section
            if (similarProducts.length > 0) {
                // Shuffle for Fatiz section
                setFatizProducts(shuffleArray(similarProducts));
                // Shuffle again for Complete section (different order)
                setCompleteProducts(shuffleArray(similarProducts));
            }
            
            setproductImglist(data.productimages);
            setproductVarlist(data.productvariants);
            setCouponslist(data.coupons);
            
            // Store product name for header (prefer product_title like "MEHER")
            if (data.product) {
                const productName = data.product.product_title || data.product.designer_name || 'PRODUCT';
                sessionStorage.setItem('productPageTitle', productName);
            }
            
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    const getBlogsList = () => {
        blogsList('')
            .then((data) => {
                setBlogs(data.data);
            })
            .catch((error) => {
                console.error("Error fetching blog list:", error);
            });
    };

    useEffect(() => {
        getProductDetails(id);
    }, [id])

    
    useEffect(() => {
        dispatch(addRecentlyViewedProduct(productAllDetails))
    }, [productAllDetails]);
    const [recentproductArr, setrecentproductArr] = useState([]);
    const similarSectionRef = useRef(null);

    const scrollToSimilarSection = () => {
        if (similarSectionRef.current) {
            similarSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const getrecentproductList = async () => {

        await recentproductList().then((data) => {
            setrecentproductArr(data.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching data list:", error);
            setLoading(false);
        })
    }

    useEffect(() => {
        getrecentproductList();

    }, [])

    useEffect(() => {
        getBlogsList();

    }, [])

    const [countdown, setCountdown] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const deadline = new Date("2024-05-04T19:30:00"); // Set the concert time here
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance <= 0) {
                clearInterval(interval);
                setCountdown({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setCountdown({ hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>

            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <div>
                            <div className="App other-page-top singleproductimg_mobile">
                                <div className="Product">
                                    <div className="ProductDetail BreakPointContainer">
                                        {/* <div className="w-100 bg-orange pt-4 pb-4 pl-3 pr-3 layout d-grid-sm">
                                            <h3> FLASH SALE UP TO 45% OFF </h3>
                                            <p> Scene-Stealing Fusion Selects! &#127; ENDS IN </p>
                                            <div className='time-div'>
                                                <span>{countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}</span>:
                                                <span>{countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}</span>:
                                                <span>{countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}</span>
                                            </div>
                                            <button type='button' className='btn'> SHOP NOW </button>
                                        </div> */}
                                        {productAllDetails && productAllDetails.details_banner && (
                                            <div className="w-100 pt-3 layout d-grid-sm">
                                                <img src={productAllDetails.details_banner} alt="ORAT Product Banner" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />

                                            </div>
                                        )}

                                        <div className="Breadcrumbs layout align-center">
                                            <div>
                                                <Link to={'/'} className="orat-color-hover ellipsis">Home</Link>
                                                <span className="m-l-5 m-r-5">&gt;</span>
                                            </div>
                                            <div>
                                                <span className="ellipsis">
                                                    {productAllDetails?.product_short_description || productAllDetails?.product_title}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="layout secpage">
                                            <Singleproductimg productDetails={productImglist} scrollToSimilarSection={scrollToSimilarSection} />
                                            <SingleProductTextDetails productDetails={productAllDetails} productVars={productVarlist} couponslist={couponslist} />
                                        </div>
                                        {/* <div className="layout justify-center m-t-15">
                                            <button
                                                type="button"
                                                className="view_sim"
                                                onClick={scrollToSimilarSection}
                                            >
                                                VIEW SIMILAR
                                            </button>
                                        </div> */}
                                        <div className="m-b-20">
                                            <div ref={similarSectionRef} className="SimilarProductFromVueAI full-width">
                                                <Fatiz designerName={productAllDetails?.designer_name} designerProducts={fatizProducts.length > 0 ? fatizProducts : similarProduct} />
                                            </div>
                                            <div
                                                className="full-bleed-divider"
                                                style={{
                                                    height: '8px',
                                                    backgroundColor: '#eeeeee',
                                                    width: '100vw',
                                                    margin: '20px 0',
                                                    marginLeft: 'calc(50% - 50vw)',
                                                    marginRight: 'calc(50% - 50vw)',
                                                    zIndex:1,
                                                    position:"relative"
                                                }}
                                            />
                                            <div className="SimilarProductFromVueAI full-width">
                                                <Similar similarProducts={similarProduct} />
                                            </div>
                                            {/* Divider between Similar Products and Recently Viewed Products */}
                                            <div
                                                className="full-bleed-divider"
                                                style={{
                                                    height: '8px',
                                                    backgroundColor: '#eeeeee',
                                                    width: '100vw',
                                                    margin: '20px 0',
                                                    marginLeft: 'calc(50% - 50vw)',
                                                    marginRight: 'calc(50% - 50vw)',
                                                    zIndex:1,
                                                    position:"relative"
                                                }}
                                            />
                                            <div className="SimilarProductFromVueAI full-width">
                                                <div>
                                                    <div className='App HomeSection'>
                                                        <div className="BreakPointContainer">
                                                            <div className="CarouselSectionContainer CarouselOneSectionContainer">
                                                                <div className="layout row justify-space-between align-center text-left SectionTitle">
                                                                    <h1 className='m-t-0 m-b-0 demi-bold w-auto'> RECENTLY VIEWED PRODUCTS </h1>
                                                                    <Link to="/category?view=recently" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
                                                                </div>
                                                                <div className="slider-container">
                                                                    <Slider {...settings}>
                                                                        {recentproductArr?.map((data, index) => (
                                                                            <div className='item' key={index}>
                                                                                <div className="CarouselSection product">
                                                                                    <div className="prel Gutter">
                                                                                        <Link to={`/products/productdetails/${data.id}`} >
                                                                                            <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '130%', overflow: 'hidden' }} onClick={() => { scrollToTop(); }}>
                                                                                                <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '20%' }}>
                                                                                                    <img src={data.product_thumbail} alt={data.product_title} className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />

                                                                                                </div>
                                                                                                <div className="animated-bg-placeholder"></div>
                                                                                            </div>
                                                                                            {/* <div className="image-gradient"></div> */}
                                                                                            <div className="ImageTextDetail ProductImageTextDetail">
                                                                                                <label className="ellipsis h5 ImageTextLabelTop m-t-5 demi-bold"> {data.product_title} </label>
                                                                                                <label className="h6 ellipsis-two-line font-normal ImageTextLabelBottom block font-normal">{data.product_short_description}</label>
                                                                                                <div className="ProductPrice layout row wrap">
                                                                                                    <span className='SpecialPrice p2 demi-bold w-auto p-0 detail_spc' style={{ marginLeft: '4%' }}> <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> {formatPrice((data?.saleprice > 0 ? data?.saleprice : data?.price), { showSymbol: false })} </span>
                                                                                                    {data?.discount_amount > 0 && (<span className='InitialPrice p3 w-auto p-0'> <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> {formatPrice(data?.price, { showSymbol: false })} </span>)}
                                                                                                    {data?.discount_amount > 0 && (
                                                                                                        <span className='DiscountPriceRound p3 w-auto p-0'>
                                                                                                            {data?.discount_type == 'flat' ? `${data?.discount_amount} FLAT OFF` : ''}
                                                                                                            {data?.discount_type == 'percentage' ? `${data?.discount_amount}% OFF` : ''}
                                                                                                        </span>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}

                                                                    </Slider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="full-bleed-divider"
                                                style={{
                                                    height: '8px',
                                                    backgroundColor: '#eeeeee',
                                                    width: '100vw',
                                                    margin: '20px 0',
                                                    marginLeft: 'calc(50% - 50vw)',
                                                    marginRight: 'calc(50% - 50vw)',
                                                    zIndex:1,
                                                    position:"relative"
                                                }}
                                            />
                                            <div className="SimilarProductFromVueAI full-width">
                                                <Complete similarProducts={completeProducts.length > 0 ? completeProducts : similarProduct} />
                                            </div>
                                            <div
                                                className="full-bleed-divider"
                                                style={{
                                                    height: '8px',
                                                    backgroundColor: '#eeeeee',
                                                    width: '100vw',
                                                    margin: '20px 0',
                                                    marginLeft: 'calc(50% - 50vw)',
                                                    marginRight: 'calc(50% - 50vw)',
                                                    zIndex:1,
                                                    position:"relative"
                                                }}
                                            />
                                            <div style={{marginTop:"20px"}} className="SimilarProductFromVueAI full-width">
                                                <div className="BlogSectionContainer HomeSection layout column">
                                                    <div className="SectionTitle prof" style={{ textAlign: 'center' }}>
                                                        <h1 className="m-t-0 m-b-15 demi-bold">FIRST LOOK ARTICLES</h1>
                                                    </div>
                                                    <div style={{marginTop:"30px"}} className="FirstLookBlogContainer prof layout  justify-center flex">
                                                        <div className="FirstLookBlogContainer layout  justify-center flex">
                                                            {blogs?.map((data, index) => (
                                                                <div className="FirstLookBlog flex w-100 " key={index}>
                                                                    <Link to={`/blogdetails/${data.id}`} className='layout row align-stretch'>
                                                                        <div className="flex xs5">
                                                                            <div className="DynamicHeightLoaderWrapper icon">
                                                                                <div className="DynamicHeightLoader layout DynamicHeightLoaderFallback" style={{ paddingTop: '0%' }}>
                                                                                    <img src={data.blog_thumb_img} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="readMoreWrap flex xs6 layout column">
                                                                            <div class="h5 text-left text-uppercase ellipsis-two-line demi-bold">
                                                                                {data.blog_title}
                                                                            </div>
                                                                            <div class="p5 font-normal layout column justify-start align-start">
                                                                                <div class="BlogdetailText text-left ellipsis-three-line m-t-4 m-b-auto">
                                                                                    <p>{data.blog_short_desc}
                                                                                        <span class="demi-bold p4 "> ...<Link to={`/blogdetails/${data.id}`}>Read More </Link>
                                                                                        </span>
                                                                                    </p>
                                                                                </div>
                                                                                <div class="read-more-txt demi-bold m-t-4">{data.blog_date}</div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            ))}
                                                        </div>
                                                       
                                                    </div>
                                                    <div className='prof poij' style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                     <Link to={`/blogs`} className='p4 btn btn-orat-primary viewAllBlogLink bold view_all_blg'> VIEW ALL BLOG POSTS </Link>
                                                     </div>
                                                      <div className="flex xs4 layout column prof1">
                                                                             <div className="BlogSectionContainer HomeSection layout column yes_mob">
                                                                                 <div className="SectionTitle">
                                                                                     <h1 className="m-t-0 m-b-15 text-left demi-bold">FIRST LOOK ARTICLES</h1>
                                                                                 </div>
                                                                                 <div className="FirstLookBlogContainer layout wrap justify-center flex">
                                                                                     <div className="FirstLookBlogContainer layout wrap justify-center flex">
                                                                                         {blogs?.map((data, index) => (
                                                                                             <div className="FirstLookBlog flex " key={index}>
                                                                                                 <Link to={`/blogdetails/${data.id}`} className='layout row align-stretch'>
                                                                                                     <div className="flex xs5">
                                                                                                         <div className="DynamicHeightLoaderWrapper icon">
                                                                                                             <div className="DynamicHeightLoader layout DynamicHeightLoaderFallback" style={{ paddingTop: '0%' }}>
                                                                                                                 <img src={data.blog_thumb_img} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                                                                             </div>
                                                                                                         </div>
                                                                                                     </div>                                                
                                                                                                     <div class="readMoreWrap flex xs6 layout column">
                                                                                                         <div class="h5 text-left text-uppercase ellipsis-two-line demi-bold">
                                                                                                             {data.blog_title}
                                                                                                         </div>
                                                                                                         <div class="p5 font-normal layout column justify-start align-start">
                                                                                                             <div class="BlogdetailText text-left ellipsis-three-line m-t-4 m-b-auto">
                                                                                                                 <p style={{color:"#757575"}}>{data.blog_short_desc}
                                                                                                                     <span class="demi-bold p4 "> ...<Link to={`/blogdetails/${data.id}`}> </Link>
                                                                                                                     </span>
                                                                                                                 </p>
                                                                                                             </div>
                                                                                                             <div style={{color:"#acacac"}} class="read-more-txt demi-bold m-t-4">{data.blog_date}</div>
                                                                                                         </div>
                                                                                                     </div>
                                                                                                 </Link>
                                                                                             </div>
                                                                                         ))}
                                                                                     </div>
                                                                                     <Link to={`/blogs`} className='p4 btn btn-orat-primary viewAllBlogLink bold'> VIEW ALL STORIES </Link>
                                                                                     {/* <SignUpBanner /> */}
                                                                                 </div>
                                                                             </div>
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
            }

        </>
    )
}
