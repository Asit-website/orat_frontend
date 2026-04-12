import React, { useState , useEffect} from 'react';
import ReactImageMagnify from 'react-image-magnify';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  useSearchParams } from 'react-router-dom';
import { getProductColorImage } from '../services/Product-service';
import Loader from "../components/Loader";
const SingleProductImg = ({productDetails,scrollToSimilarSection}) => {
  
const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: false,
};

  const [images, setImages] = useState(productDetails || []);
  const [image, setImage] = useState(productDetails?.product_thumbail || []);
  const [largeimage, setlargeImage] = useState('');
  const [queryParameters, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    // Update images state when productDetails change
    if (productDetails) {
      setImages(productDetails);
    }
    if(productDetails?.length>0){
      setlargeImage(productDetails[0]?.image_name);
    }
    
  }, [productDetails]);
 
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [showHiResModal, setShowHiResModal] = useState(false);
  const [currentHiResIndex, setCurrentHiResIndex] = useState(0);

  const handleThumbnailClick = (index,image_url) => {
    setActiveThumbnailIndex(index);
    setlargeImage(image_url);
  };

  const handleViewHiResClick = () => {
    setCurrentHiResIndex(activeThumbnailIndex);
    setShowHiResModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeHiResModal = () => {
    setShowHiResModal(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  const handleHiResThumbnailClick = (index) => {
    setCurrentHiResIndex(index);
  };

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showHiResModal) {
        setShowHiResModal(false);
        document.body.style.overflow = 'unset';
      }
    };

    if (showHiResModal) {
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [showHiResModal]);
  
  
  
   useEffect(() => {
    
    async function getProductColorImagesList (){
      if (queryParameters.has('coolorvar')) {
      setLoading(true);
      if (queryParameters.has('coolorvar')) {
      const productDetails = {
        var_id: queryParameters.get('coolorvar')
    }
    getProductColorImage(productDetails).then((data) => {
      setLoading(false);
        
        if(data?.data?.length>0){
          setImages(data?.data);
          setlargeImage(data?.data[0]?.image_name);
        }else{
          setImages([]);
          setlargeImage('');
        }
        }
  
        ).catch((error) => {
  
        })
      }
    }
    }
    getProductColorImagesList();
       }, [queryParameters]);
  
  
  

  return (
    loading ? (
      <div className="flex xs5 prel">
      <Loader />
      </div>
    ) : (
    <div className="flex xs5 prel">
      <div className="layout align-start ProductImageSlider">
        <div className="ThumbnailImages">
          {images.map((data, index) => (
             index <=4 &&(
            <div
              key={index}
              className={index === activeThumbnailIndex ? 'active' : ''}
              onClick={() => handleThumbnailClick(index,data.image_name)}
            >
              <div className="dynamicImgContainer prel layout row align-center justify-center">
                <img src={data?.image_name} alt="logo" style={{ padding: '0px' }} />
              </div>
            </div>
             )
          ))}
          <button 
            className="ViewHiResBtn" 
            onClick={handleViewHiResClick}
            type="button"
          >
            <img 
              src="https://img.perniaspopupshop.com/ppus-assets/icons/icon-zoom29_03_23.svg" 
              alt="Zoom Icon" 
              className="ViewHiResIcon"
            />
            VIEW HI-RES IMAGES
          </button>
        </div>
        <div className="SelectedImage animated-background prel">

      {images ? (
              <ReactImageMagnify
              className='test_mag'
                {...{
                  smallImage: {
                    alt: 'Product thumbnail',
                    isFluidWidth: true,
                    src: largeimage,
                  },
                  largeImage: {
                    src: largeimage, // Use the same image for large and small for simplicity
                    width: 1200, // Adjust dimensions as needed
                    height: 1800, // Adjust dimensions as needed
                  },
                  enlargedImageContainerDimensions: {
                    width: '180%',
                    height: '100%',
                  },
                  
                }}
                enlargedImageContainerClassName="magnified-image-overlay"
              />
            ) : (
              <p>Loading image...</p>
            )}

        </div>
      </div>
      <div className="ProductImageSlider_mobile">
        <Slider className="owl-theme"  {...settings}>
        {images.map((data, index) => (
          index <=4 &&(
          <div className="item"  key={index}>
            <div className="CarouselSection product">
              <div className="prel Gutter">
                 <div className="layout justify-center m-t-15">
                                            <button
                                                type="button"
                                                className="view_sim"
                                                onClick={scrollToSimilarSection}
                                            >
                                                VIEW SIMILAR
                                            </button>
                                        </div>
                <a href="">
                  <div
                    className="DynamicHeightLoaderWrapper"
                    style={{ paddingTop: '130%', overflow: 'hidden' }}
                  >
                    <div
                      className="DynamicHeightLoader layout row align-center justify-center"
                      style={{ paddingTop: '22%' }}
                    >
                      <img
                        src={data?.image_name}
                        alt="logo"
                        className="img-resp DynamicHeightLoaderImage"
                        style={{ padding: '0px', bottom: 'inherit' }}
                      />
                    </div>
                    {/* <div className="animated-bg-placeholder"></div> */}
                  </div>
                  {/* <div className="image-gradient"></div> */}
                </a>
              </div>
            </div>
          </div>
          )
         ))}
        </Slider>
      </div>
      
      {/* Hi-Res Images Modal */}
      {showHiResModal && (
        <div className="HiResModalOverlay" onClick={closeHiResModal}>
          <div className="HiResModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="HiResModalClose" onClick={closeHiResModal}>
              <img 
                src="https://img.perniaspopupshop.com/ppus-assets/icons/cross-black.svg" 
                alt="Close" 
                style={{ width: '26px', height: '26px' }}
              />
            </button>
            <div className="HiResModalMain">
              <div className="HiResModalThumbnails">
                {images && images.length > 0 ? (
                  images.map((data, index) => (
                    index <= 4 && data?.image_name && (
                      <div
                        key={index}
                        className={`HiResThumbnail ${index === currentHiResIndex ? 'active' : ''}`}
                        onClick={() => handleHiResThumbnailClick(index)}
                      >
                        <img src={data.image_name} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    )
                  ))
                ) : null}
              </div>
              <div className="HiResModalMainImage">
                {images && images[currentHiResIndex]?.image_name ? (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: 'Product thumbnail',
                        isFluidWidth: true,
                        src: images[currentHiResIndex].image_name,
                      },
                      largeImage: {
                        src: images[currentHiResIndex].image_name,
                        width: 1200,
                        height: 1800,
                      },
                      enlargedImageContainerDimensions: {
                        width: '100%',
                        height: '100%',
                      },
                      enlargedImagePosition: 'over',
                      isHintEnabled: false,
                    }}
                    enlargedImageContainerClassName="magnified-image-overlay-modal"
                  />
                ) : (
                  <img 
                    src={largeimage || images[0]?.image_name || ''} 
                    alt="Hi-Res Product" 
                    className="HiResMainImg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    )
  );
};

export default SingleProductImg;
