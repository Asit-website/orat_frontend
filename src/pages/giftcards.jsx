import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { giftaidList } from '../services/Product-service';
import Footer from '../components/footer';
import Loader from "../components/Loader";
function Giftcards() {
    const [GiftArr, setGiftArr] = useState([]);
    const [loading, setLoading] = useState(true);

    const getGiftList = () => {
        giftaidList('')
            .then((data) => {
               
                setGiftArr(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching Gift list:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getGiftList();
    }, []);
    return (
        loading ? (
            <Loader />
          ) : (
        <>
        <div className='App other-page-top'>
            <div className="BreakPointContainer AppContent">
                <div className="CategoryHeader layout justify-space-between align-center pt-3 pb-3 mb-3 gift-card-heading" style={{ borderBottom: '1px solid #212121', }}>
                    <div className="layout align-center">
                        <h4 className="CategoryTitle ellipsis demi-bold">Gift Cards </h4>
                        <p className="CategoryProductCount h7 font-normal"> ({GiftArr.length > 0 &&<>{GiftArr.length}</>} products)</p>
                    </div>
                </div>
                <div className="gift-card-all-div">

                    {GiftArr.length > 0 &&
                        GiftArr.map((data, index) => (
                            <div>
                                <Link to={`/giftdetails/${data.id}`}  className="ProductCard ProductGiftCard">
                                    <div className="ProductCardImageWrapper">
                                        <div className="ProductImageWrapper">
                                            <div className="">
                                                <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '100%', }}>
                                                    <div className="DynamicHeightLoader layout row align-center justify-center">
                                                        <img src={data.file} alt={data.title} className='img-resp DynamicHeightLoaderImage p-0' />
                                                    </div>
                                                    {/* <div className="animated-bg-placeholder"></div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ProductCardBottom">
                                        <h6 className="ProductCardTitle ellipsis demi-bold">{data.title}</h6>
                                        <p className="ProductCardDescription p2 ellipsis-two-line">{data.short_desc}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
         <Footer />
         </>
          )
    )
}

export default Giftcards;