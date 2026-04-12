import React, { useState,useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Eid from './Eid';
import { categoryList } from '../services/General-service';
var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


function Browse({ onViewAllClick, onCategoryClick, showTrending = true }) {
    
    const [hideTitle, sethideTitle] = useState(true);
    const [categoryArr,setCategoryArr] = useState([]);
    const handleCategoryClick = () => {
        if (onCategoryClick) {
            onCategoryClick();
        }
    };
    const getCategoryLink = (category) => {
        const categoryId = category?.category_id || category?.id;
        return categoryId ? `/category/?category_ids=${categoryId}` : '/category';
    };

    const getCategoryList = () =>{
        categoryList('').then((data) =>{
           
            setCategoryArr(data.data);
            }
            
        ).catch((error)=>{

        })
    }

    useEffect(()=> {
        getCategoryList();
    },[])
    return (
        <div>
                <div className='BrowseCategories layout column m-t-64 p-b-64'>
                    <div className='App HomeSection '>
                        <div className="BrowseCategoriesContainer">
                            <div className="layout row justify-space-between align-center text-left SectionTitle m-0">
                                <h1 className='m-t-0 m-b-15 p-l-5 demi-bold w-auto'> BROWSE CATEGORIES </h1>
                            </div>
                            <Slider  {...settings}>
                            {categoryArr&& categoryArr.length>0 && categoryArr.map((data, index) => (
                                <div className='item' key={index}>
                                    <div className="CarouselSection product">
                                        <div className="prel Gutter">
                                            <Link 
                                                to={getCategoryLink(data)}
                                                onClick={() => handleCategoryClick()}
                                            >
                                                <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '130%', overflow: 'hidden' }}>
                                                    <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '22%' }}>
                                                        <img src={data.thumbnail} alt={data.title} className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px', bottom: 'inherit' }} />
                                                    </div>
                                                    {/* <div className="animated-bg-placeholder"></div> */}
                                                </div>
                                                {/* <div className="image-gradient"></div> */}
                                                <div className="ImageTextDetail ProductImageTextDetail">
                                                    <label className="ellipsis h5 ImageTextLabelTop m-t-5 demi-bold"> {data.title} </label>
                                                    <label className="h6 ellipsis-two-line font-normal ImageTextLabelBottom block font-normal">Blush Pink & Bright Red Embroidered Anarkali Set</label>
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

                {showTrending && (
                  <div className='App demo'>
                      <div className="BreakPointContainer">
                          <div className="layout row justify-space-between align-center text-left SectionTitle">
                              <h1 className='m-t-0 m-b-0 demi-bold w-auto'> TRENDING PRODUCTS </h1>
                              <Link 
                                to="/category" 
                                className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'
                                onClick={() => {
                                  if (onViewAllClick) {
                                    onViewAllClick();
                                  }
                                }}
                              >
                                VIEW ALL
                              </Link>
                          </div>
                          <Eid showeidpicks={true} notShowTitle={hideTitle} />
                      </div>
                  </div>
                )}
       </div>
    )
}

export default Browse