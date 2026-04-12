import React, { useEffect, useState } from 'react';
import { topsubbannerList } from '../services/General-service';
import { Link } from 'react-router-dom';
function Flash_sale({ showsubBanner }) {

    const [subbannerArr, setsubBannerArr] = useState([]);
    const [loading, setLoading] = useState(true);

    const getsubBannerList = () => {
        topsubbannerList('')
            .then((data) => {

                setsubBannerArr(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching banner list:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getsubBannerList();
    }, []);
    return (
        showsubBanner && (
            <div className="StaticSection App">
                <div className='Content layout BreakPointContainer'>
                    {subbannerArr.map((data, index) => (
                        <Link to={data.url? `${data.url}` : '#'} {...data.url ? `target='_blank'` : ''} key={index}  >
                            <div className="prel">
                                <div className="DynamicHeightLoaderWrapper item" >
                                    <div className="layout row align-center justify-center">
                                        <img src={data.banner_image} alt="logo" className='img-resp DynamicHeightLoaderImage'  />
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    )
}

export default Flash_sale;