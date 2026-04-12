import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homedesignerhighlightList } from '../services/Product-service';
import { formatPrice } from "../utils/formatPrice";
import { Link } from 'react-router-dom';
import Loader from "./Loader";

function Wendell({ showhiighlightd }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    const [homedhArr, sethomedhArr] = useState([]);
    const [designerdArr, setdesignerdArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const gethomedhList = () => {
        homedesignerhighlightList().then((data) => {
            sethomedhArr(data.data);
            setdesignerdArr(data.designer);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching data list:", error);
            setLoading(false);
        })
    }

    useEffect(() => {
        gethomedhList();
    }, [])
    return (
        showhiighlightd && (
            loading ? (
                <Loader />
            ) : (
                designerdArr && designerdArr.length>0 &&(
                <div className='App'>
                    <div className="BreakPointContainer">
                        <div className="CarouselSectionContainer CarouselOneSectionContainer">
                            <div className="d-lg-flex mobile">
                                <div className="layout flex xs3 justify-center">
                                    <div className="flex left-align-slick xs8 offset-xs1">
                                        <div className="SideCarouselHeaderImg">
                                            <div className="DynamicHeightLoaderWrapper icon mobile_img" style={{ paddingTop: '66%' }}>
                                                <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '66%' }}>
                                                    <img src={designerdArr.designer_thumbnail} alt={designerdArr.designer_name} className='DynamicHeightLoaderImage' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mobile_button">
                                            <Link to={`/category`} className='btn-orat-primary m-t-10 purple-bg-color demi-bold-manrope'> EXPLORE ALL </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex left-align-slick xs8 offset-xs1">
                                    <Slider className='owl-theme' {...settings}>
                                        {homedhArr.map((data, index) => (
                                            <div className='item' key={index}>
                                                <div className="CarouselSection product">
                                                    <div className="prel Gutter">
                                                        <Link to={`/products/productdetails/${data.id}`} >
                                                            <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '130%', overflow: 'hidden' }}>
                                                                <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '20%' }}>
                                                                    <img src={data.product_thumbail} alt={data.product_title} className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px', bottom: 'inherit' }} />

                                                                </div>
                                                                <div className="animated-bg-placeholder"></div>
                                                            </div>
                                                            {/* <div className="image-gradient"></div> */}
                                                            <div className="ImageTextDetail ProductImageTextDetail">
                                                                <label className="ellipsis h5 ImageTextLabelTop m-t-5 demi-bold"> {data.product_title} </label>
                                                                <label className="h6 ellipsis-two-line font-normal ImageTextLabelBottom block font-normal">{data.product_short_description}</label>
                                                                <div className="ProductPrice layout row wrap">
                                                                    <span className='SpecialPrice p2 demi-bold w-auto p-0' style={{ marginLeft: '4%' }}> <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> {formatPrice((data?.saleprice > 0 ? data?.saleprice : data?.price), { showSymbol: false })} </span>
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
        )
    )
}

export default Wendell;