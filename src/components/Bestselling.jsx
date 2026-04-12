import React, { useEffect, useState } from 'react'
import { Bestsellingbanner1, Bestsellingbanner2, Bestsellingbanner3, Bestsellingbanner4, Bestsellingbanner5, Bestsellingbanner6, Bestsellingbanner7 } from '../image'
import { Link } from 'react-router-dom';
import { designerList } from '../services/General-service';
import { getApiUrl } from '../config/apiConfig';


function Bestselling({showbestselling}) {

    const [designerArr,setDesignerArr] = useState([]);

    const getDesignerList = () =>{
        var arr_data = {
            limit:7,
            designer_stat:'best_designers',
        };
        designerList(arr_data).then((data) =>{
           
            setDesignerArr(data.data);
            }
            
        ).catch((error)=>{

        })
    }

    useEffect(()=> {
        getDesignerList();
    },[])


    return (
        showbestselling && ( <div>
            <div className='App'>
                <div className="BreakPointContainer">
                    <div className="CarouselSectionContainer">
                        <div className="layout row justify-space-between align-center text-left SectionTitle">
                            <h1 className='m-t-0 m-b-0 demi-bold w-auto'> BESTSELLING DESIGNERS </h1>
                            <Link to="/category" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
                        </div>
                        <div className="grid-2 layout row wrap align-start">

                        {
                            designerArr.map((data,index) =>(
                                data.image_positions == 5 ? (
                                    <div className="flex GridSection xs12 sm6 p-sm-0" key={index}>
                                        <div className="prel Gutter">
                                        <Link to={`/category/?designer_id=${data.id}`}>
                                                <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '40%' }}>
                                                    <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '30%' }}>
                                                        <img src={data.designer_thumbnail } alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                    </div>
                                                    <div className="animated-bg-placeholder"></div>
                                                </div>
                                                <div className="ImageTextDetail CategoryImageTextDetail">
                                                    <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> {data.designer_name}</label>
                                                    <label className="h6 ellipsis ImageTextLabelBottom block font-normal">SHOP NOW</label>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex GridSection xs6 sm3 p-sm-0" key={index}>
                                        <div className="prel Gutter">
                                        <Link to={`/category/?designer_id=${data.id}`}>
                                                <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '112%' }}>
                                                    <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                        <img src={data.designer_thumbnail} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                    </div>
                                                    <div className="animated-bg-placeholder"></div>
                                                </div>
                                                <div className="ImageTextDetail CategoryImageTextDetail">
                                                    <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> {data.designer_name}</label>
                                                    <label className="h6 ellipsis ImageTextLabelBottom block font-normal">SHOP NOW</label>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            ))
                        }

                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    )
}

export default Bestselling