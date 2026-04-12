import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Link,NavLink } from 'react-router-dom';
import { recentproductList } from '../services/Product-service';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./Loader";
import { formatPrice } from "../utils/formatPrice";

function Trending() {
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
    const [recentproductArr, setrecentproductArr] = useState([]);
    const [loading, setLoading] = useState(true);
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
    return (
        loading ? (      
            <Loader />
    ) : (
        <div>
            <div className='App HomeSection'>
                <div className="BreakPointContainer">
                    <div className="CarouselSectionContainer CarouselOneSectionContainer">
                        <div className="layout row justify-space-between align-center text-left SectionTitle">
                            <h1 className='m-t-0 m-b-0 demi-bold w-auto'> TRENDING PRODUCTS </h1>
                            <NavLink  to="/category?view=trending" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</NavLink>
                        </div>
                        <div className="slider-container">
                            <Slider {...settings}>
                                {recentproductArr?.map((data, index) => (
                                    <div className='item' key={index}>
                                        <div className="CarouselSection product">
                                            <div className="prel Gutter">
                                                <Link   to={`/products/productdetails/${data.id}`} >
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '130%', overflow: 'hidden' }} >
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
                                                            <span className='SpecialPrice p2 demi-bold w-auto p-0 spr' style={{ marginLeft: '4%' }}> <i className="fa fa-inr" style={{ fontSize:'13px'}}></i> {formatPrice((data?.saleprice > 0 ? data?.saleprice : data?.price), { showSymbol: false })} </span>
                                                           {data?.discount_amount>0 && ( <span className='InitialPrice p3 w-auto p-0'> <i className="fa fa-inr" style={{ fontSize:'13px'}}></i> {formatPrice(data?.price, { showSymbol: false })} </span>)}
                                                            <span className='DiscountPriceRound p3 w-auto p-0'> 
                                                            {data?.discount_type=='flat'? `${data?.discount_amount} FLAT OFF`:''} 
                                                            {data?.discount_type=='percentage'? `${data?.discount_amount}% OFF`:''} </span>
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

export default Trending;