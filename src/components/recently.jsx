import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Link, NavLink } from 'react-router-dom';
import { recentproductList } from '../services/Product-service';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./Loader";
// import { useSelector } from 'react-redux';
import { formatPrice } from "../utils/formatPrice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import LoginModal from "./loginmodal";
import { addWishList, removeWishList } from "../services/User-service";
import { useSelector } from "react-redux";

function Recently({ showrecentviewed, className }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
const userInfo = useSelector((state) => state.user?.userInfo);
const [wishlistMap, setWishlistMap] = useState({});

    // Custom Prev Arrow
    const CustomPrevArrow = ({ className, style, onClick, isDisabled }) => (
        <button
            className={className}
            style={{
                ...style,
                display: isDisabled ? "none" : "block", // Hide arrow if disabled
            }}
            onClick={!isDisabled ? onClick : null}
        />
    );

    // Custom Next Arrow (Optional)
    const CustomNextArrow = ({ className, style, onClick }) => (
        <button className={className} style={{ ...style }} onClick={onClick} />
    );

    const recentproductArr = useSelector((state) => state.products.recentlyViewed);

    const totalItems = Array.isArray(recentproductArr) ? recentproductArr.length : 0;
    const desktopSlidesToShow = 5;
    const tabletSlidesToShow = 2;
    const mobileSlidesToShow = 2;

    var settings = {
        dots: totalItems > desktopSlidesToShow,
        infinite: totalItems > desktopSlidesToShow,
        speed: 500,
        slidesToShow: desktopSlidesToShow,
        slidesToScroll: totalItems > desktopSlidesToShow ? desktopSlidesToShow : 1,
        initialSlide: 0,

        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        prevArrow: <CustomPrevArrow isDisabled={currentSlide === 0} />,
        nextArrow: <CustomNextArrow />,


        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: totalItems > desktopSlidesToShow,
                    infinite: totalItems > desktopSlidesToShow,
                    slidesToShow: desktopSlidesToShow,
                    slidesToScroll: totalItems > desktopSlidesToShow ? desktopSlidesToShow : 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    infinite: totalItems > tabletSlidesToShow,
                    slidesToShow: tabletSlidesToShow,
                    slidesToScroll: totalItems > tabletSlidesToShow ? tabletSlidesToShow : 1,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    infinite: totalItems > mobileSlidesToShow,
                    slidesToShow: mobileSlidesToShow,
                    slidesToScroll: totalItems > mobileSlidesToShow ? mobileSlidesToShow : 1,
                    arrows: false,
                    initialSlide: 0
                }
            },
        ]
    };

    return (
        showrecentviewed && totalItems > 0 && (
            <div className={className || ""}>
                <div className='App HomeSection'>
                    <div className="BreakPointContainer">
                        <div className="CarouselSectionContainer CarouselOneSectionContainer">
                            <div className="layout row justify-space-between align-center text-left SectionTitle">
                                <h1 className='m-t-0 m-b-0 demi-bold w-auto'> RECENTLY VIEWED PRODUCTS </h1>
                                <NavLink to="/category?view=recently" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</NavLink>
                            </div>
                            <div className="slider-container recently-viewed-slider">
                                <Slider {...settings}>
                                    {recentproductArr?.map((data, index) => (
                                        <div className='item' key={index}>
                                            <div className="CarouselSection product">
                                                <div className="prel Gutter">

                                                    <Link to={`/products/productdetails/${data.id}`} >
                                                        {/* <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '130%', overflow: 'hidden' }} >
                                                            <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '20%' }}>
                                                                <img src={data.product_thumbail} alt={data.product_title} className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />

                                                            </div>
                                                            <div className="animated-bg-placeholder"></div>
                                                        </div> */}
                                                        <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '130%', overflow: 'hidden', position: 'relative' }} >
  <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '20%' }}>
    <img src={data.product_thumbail} alt={data.product_title} className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />

    <button
      type="button"
      className="btn-icon"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!userInfo) { setShowLogin(true); return; }

        const already = !!wishlistMap[data.id];
        const payload = {
          product_id: data.id,
          user_id: userInfo?.data?.user?.id,
        };
        if (already) {
          removeWishList(payload).finally(() =>
            setWishlistMap((m) => ({ ...m, [data.id]: false }))
          );
        } else {
          addWishList(payload).finally(() =>
            setWishlistMap((m) => ({ ...m, [data.id]: true }))
          );
        }
      }}
      aria-label="Wishlist"
      style={{
        position: 'absolute',
        right: '8px',
        top: '8px',
        background: 'rgba(255,255,255,0.92)',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        zIndex:10
      }}
    >
      {wishlistMap[data.id] ? (
        <BsHeartFill style={{ color: '#e83647', width: '18px', height: '18px' }} />
      ) : (
        <BsHeart style={{ width: '18px', height: '18px' }} />
      )}
    </button>
  </div>
  <div className="animated-bg-placeholder"></div>
</div>
                                                        {/* <div className="image-gradient"></div> */}
                                                        <div className="ImageTextDetail ProductImageTextDetail">
                                                            <label className="ellipsis h5 ImageTextLabelTop m-t-5 demi-bold"> {data.product_title} </label>
                                                            <label className="h6 ellipsis-two-line font-normal ImageTextLabelBottom block font-normal line_1 short_de">{data.product_short_description}</label>
                                                            <div className="ProductPrice layout row wrap">
                                                                <span className='SpecialPrice p2 demi-bold w-auto p-0 short_de' style={{ marginLeft: '6%' }}> <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> {formatPrice((data?.saleprice > 0 ? data?.saleprice : data?.price), { showSymbol: false })} </span>
                                                                {data?.discount_amount > 0 && (<span className='InitialPrice p3 w-auto p-0'> <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> {formatPrice(data?.price, { showSymbol: false })} </span>)}
                                                                <span className='DiscountPriceRound p3 w-auto p-0'>
                                                                    {data?.discount_type == 'flat' ? `${data?.discount_amount} FLAT OFF` : ''}
                                                                    {data?.discount_type == 'percentage' ? `${data?.discount_amount}% OFF` : ''} </span>
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
        )
    )
}

export default Recently;