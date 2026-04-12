import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homehandpicksList } from '../services/Product-service';
import { Link } from 'react-router-dom';





function Handpicked({showhpdeals}) {
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
    var requestOptions = {
        home_positions: 'hand_deals'
    };
    const [homedesignerdiscountArr, sethomedesignerdiscountArr] = useState([]);
    const gethomedesignerdiscountList = () => {
        homehandpicksList(requestOptions).then((data) => {
            sethomedesignerdiscountArr(data.data);
        }).catch((error) => {
            console.error("Error fetching data list:", error);
        })
    }

    useEffect(() => {
        gethomedesignerdiscountList();
    }, [])
    return (
        showhpdeals && (  <div>
            <div className='App'>
                <div className="BreakPointContainer">
                    <div className="CarouselSectionContainer">
                        <div className="layout row justify-space-between align-center text-left SectionTitle">
                            <h1 className='m-t-0 m-b-0 demi-bold w-auto'> HANDPICKED DEALS </h1>
                            <Link to="/category" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
                        </div>
                        <div className="layout">
                            <div className="flex left-align-slick xs12">
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {homedesignerdiscountArr.map((data, index) => (
                                        <div className='item' key={index}>
                                            <div className="CarouselSection category">
                                                <div className="prel Gutter">
                                                <Link to={`/category/?designer_id=${data.id}`}>
                                                        <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '70%' }}>
                                                            <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                                <img src={data.designer_thumbnail} alt={data.designer_name} className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                            </div>
                                                            <div className="animated-bg-placeholder"></div>
                                                        </div>
                                                        {/* <div className="image-gradient"></div> */}
                                                        <div className="ImageTextDetail CategoryImageTextDetail">
                                
                                                            <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> UP TO 55% OFF </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">{data.designer_name}</label>
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
        </div>
        )
    )
}

export default Handpicked