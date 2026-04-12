import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Celebriybanner1, Celebriybanner2, Celebriybanner3, Celebriybanner4, Celebriybanner5, Celebriybanner6, Celebriybanner7, Celebriybanner8, } from '../image';
import { Link } from 'react-router-dom';

const optioncelebriy = {
    loop: true,
    // margin: 10,
    nav: true,
    dots: false,
    responsive: {
        0: {
            items: 2.2
        },
        600: {
            items: 3
        },
        1000: {
            items: 4
        }
    }
};

function celebriy({ccloset}) {
    return (
        ccloset && ( <div>
            <div className='App'>
                <div className="BreakPointContainer">
                    <div className="CarouselSectionContainer">
                        <div className="layout row justify-space-between align-center text-left SectionTitle">
                            <h1 className='m-t-0 m-b-0 demi-bold w-auto'> CELEBRITY CLOSET </h1>
                            <Link to="/category" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
                        </div>
                        <div className="layout">
                            <div className="flex left-align-slick xs12">
                                <OwlCarousel className='owl-theme' loop nav {...optioncelebriy}>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Celebriybanner1} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        <div className="animated-bg-placeholder"></div>
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> PRANUTAN BAHL IN NITYA BAJAJ </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">Maroon Modal Silk Ajrakh Printed & Embroidered Lehenga Set</label>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Celebriybanner2} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> KONKANA SEN SHARMA IN AMPM </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">Black Wool Cord Embroidered Draped Saree</label>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Celebriybanner3} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> SHILPA SHETTY IN LABEL EARTHEN PRET </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">Black & White Saree Set With Polkas</label>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Celebriybanner4} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold">MADHURI DIXIT IN MRUNALINI RAO</label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">Magenta Pure Silk Resham & Zardosi Hand Embroidered Short Kurta Set</label>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Celebriybanner5} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold">MASOOM MINAWALA IN MALA AND KINNARY</label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">Ivory Georgette Embroidered Saree Set</label>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Celebriybanner6} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> MIRA KAPOOR IN SHEETAL BATRA </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">Ivory Silk Chanderi Embroidered Kurta Set</label>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Celebriybanner7} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold">TARA SUTARIA IN RUDRAKSH DWIVEDI</label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">Black Sequins & Tulle Skirt Set</label>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Celebriybanner8} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold">SHIBANI AKTHAR IN PAYAL SINGHAL</label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">Purple Silk Mul Sharara Set</label>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    )
}

export default celebriy