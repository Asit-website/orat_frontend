import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { homeeidpicksList } from '../services/Product-service';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Eid({showeidpicks,notShowTitle}) {
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
    const getrecentproductList = async () => {

        await homeeidpicksList().then((data) => {

            setrecentproductArr(data.data);
        }).catch((error) => {
            console.error("Error fetching data list:", error);
        })
    }

    useEffect(() => {
        getrecentproductList();
    }, [])

    return (
        showeidpicks && (
        <div>
            <div className='App'>
                <div className="BreakPointContainer">
                    {!notShowTitle &&(
                    <div className="layout row justify-space-between align-center text-left SectionTitle">
                        <h1 className='m-t-0 m-b-0 w-auto'> EID PICKS </h1>
                        <Link to="/category" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
                    </div>
                    )}
                    <div className="slider-container">
                        <Slider {...settings}>
                            {recentproductArr?.map((data, index) => (
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
                                                            <span className='SpecialPrice p2 demi-bold w-auto p-0' style={{ marginLeft: '4%' }}> <i className="fa fa-inr" style={{ fontSize:'13px'}}></i> { data?.saleprice>0 ? data?.saleprice : data?.price} </span>
                                                           {data?.discount_amount>0 && ( <span className='InitialPrice p3 w-auto p-0'> <i className="fa fa-inr" style={{ fontSize:'13px'}}></i> {data?.price} </span>)}
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
        )
    )
}

export default Eid