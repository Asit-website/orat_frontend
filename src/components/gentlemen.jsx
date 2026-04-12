import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Gentlemenbanner1, Gentlemenbanner2, Gentlemenbanner3, Gentlemenbanner4, Gentlemenbanner5, Gentlemenbanner6, Gentlemenbanner7, Gentlemenbanner8 } from '../image';
import { Link } from 'react-router-dom';

const optiongentlemen = {
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

function gentlemen() {
    return (
        <div>
            <div className='App'>
                <div className="BreakPointContainer">
                    <div className="CarouselSectionContainer">
                        <div className="layout row justify-space-between align-center text-left SectionTitle">
                            <h1 className='m-t-0 m-b-0 demi-bold w-auto'> GENTLEMEN'S JOURNAL </h1>
                            <Link to="/category" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
                        </div>
                        <div className="layout">
                            <div className="flex left-align-slick xs12">
                                <OwlCarousel className='owl-theme' loop nav {...optiongentlemen}>
                                    <div className='item'>
                                        <div className="CarouselSection category">
                                            <div className="prel Gutter">
                                                <a href="">
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                            <img src={Gentlemenbanner1} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> KURTA SETS </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">UP TO 80% OFF</label>
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
                                                            <img src={Gentlemenbanner2} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> INDO-WESTERN </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">UP TO 50% OFF</label>
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
                                                            <img src={Gentlemenbanner3} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> SHERWANI </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">UP TO 50% OFF</label>
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
                                                            <img src={Gentlemenbanner4} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold">NEHRU JACKET</label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">UP TO 60% OFF</label>
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
                                                            <img src={Gentlemenbanner5} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold">SHIRTS</label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">UP TO 50% OFF</label>
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
                                                            <img src={Gentlemenbanner6} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> BANDHGALA </label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">UP TO 60% OFF</label>
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
                                                            <img src={Gentlemenbanner7} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold">SUITS</label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">UP TO 50% OFF</label>
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
                                                            <img src={Gentlemenbanner8} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                        </div>
                                                        {/* <div className="animated-bg-placeholder"></div> */}
                                                    </div>
                                                    {/* <div className="image-gradient"></div> */}
                                                    <div className="ImageTextDetail CategoryImageTextDetail">
                                                        <label className="h4 ImageTextLabelTop m-t-5 demi-bold">MENS ACCESSORIES</label>
                                                        <label className="h6 ellipsis ImageTextLabelBottom block font-normal">UP TO 50% OFF</label>
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
}

export default gentlemen