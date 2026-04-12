import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homeweddingtaleList } from '../services/Product-service';
import { Link } from 'react-router-dom';


function Wedding({showweddingtale}) {
    const [currentSlide, setCurrentSlide] = useState(0);
      
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



    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        prevArrow: <CustomPrevArrow isDisabled={currentSlide === 0} />,
        nextArrow: <CustomNextArrow />,

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




    const [homeweddingtaleArr, sethomeweddingtaleArr] = useState([]);
    const gethomeweddingtaleList = () => {
        homeweddingtaleList().then((data) => {
            sethomeweddingtaleArr(data.data);
        }).catch((error) => {
            console.error("Error fetching data list:", error);
        })
    }

    useEffect(() => {
        gethomeweddingtaleList();
    }, [])
    return (
        showweddingtale && (
        <div className='App'>
            <div className="BreakPointContainer">
                <div className="CarouselSectionContainer">
                    <div className="layout row justify-space-between align-center text-left SectionTitle">
                        <h1 className='m-t-0 m-b-0 demi-bold w-auto'> WEDDING TALES </h1>
                        <Link to="/category" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
                    </div>
                    <div className="layout">
                        <div className="flex left-align-slick xs12">
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {homeweddingtaleArr.map((data, index) => (
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
                                                            <label className="h3 demi-bold ellipsis ImageTextLabelBottom block font-normal"> {data.designer_name} </label>
                                                            <label className="h6 ellipsis ImageTextLabelBottom block font-normal">SHOP NOW</label>
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
        )
    )
}

export default Wedding;