import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { bannerList } from '../services/General-service';
import { Link } from 'react-router-dom';
function Banner({showBanner}) {
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

    // const settings = {
    //     dots: false,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: true,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
       
    //   };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        prevArrow: <CustomPrevArrow isDisabled={currentSlide === 0} />,
        nextArrow: <CustomNextArrow />,
      };

      


    const [bannerArr, setBannerArr] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBannerList = () => {
        bannerList('')
            .then((data) => {
                
                setBannerArr(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching banner list:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getBannerList();
    }, []);

    return (
        showBanner &&  (          
            <div className='banner-sec App'>
            <div className="BreakPointContainer">
                {bannerArr?.length > 0 && (
                    <Slider className='owl-theme' {...settings}>
                        {bannerArr?.map((data, index) => (
                            <div className='item' key={index}>
                                <Link to={data.url? `${data.url}` : '#'}>
                                    <div className="DynamicHeightLoaderWrapper">
                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '46%' }}>
                                            <img src={data.banner_image} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                            <div className="animated-bg-placeholder lg-animated-bg-placeholder"></div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
        
        )) ;
    
}

export default Banner;
