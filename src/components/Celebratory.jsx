import React, { useEffect, useState } from 'react'
import { Celebratorybanner1, Celebratorybanner2, Celebratorybanner3, Celebratorybanner4, Celebratorybanner5 } from '../image'
import { Link } from 'react-router-dom';
import { celebMustHave } from '../services/General-service'
import { getApiUrl } from '../config/apiConfig';

function Celebratory({showmusthave}) {

    const [categoryArr,setCategoryArr] = useState([]);

    const getCategoryList = () =>{
        var limit = {
            limit:5
        }
        celebMustHave(limit).then((data) =>{
          
            setCategoryArr(data.data);
            }
            
        ).catch((error)=>{

        })
    }

    useEffect(()=> {
        getCategoryList();
    },[])

  return (
    showmusthave && (
    <div>
          <div className='App'>
                <div className="BreakPointContainer">
                    <div className="CarouselSectionContainer">
                        <div className="layout row justify-space-between align-center text-left SectionTitle">
                            <h1 className='m-t-0 m-b-0 demi-bold w-auto'> SHOP BY CATEGORY </h1>
                            <Link to="/category" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
                        </div>


                        <div className="grid-2 layout row wrap align-start liki">

                        {
                            categoryArr.map((data,index) =>(
                                (data.image_positions==1) ? (
                                    <div className="flex GridSection xs12 sm8 p-sm-0" key={index}>
                                        <div className="prel Gutter">
                                        <Link to={`/category/?category_ids=${data.id}`}>
                                                <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '35%' }}>
                                                    <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '30%' }}>
                                                        <img src={data.thumbnail} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                    </div>
                                                    <div className="animated-bg-placeholder"></div>
                                                </div>
                                                {/* <div className="image-gradient"></div> */}
                                                <div className="ImageTextDetail CategoryImageTextDetail">
                                                    <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> {data.title} </label>
                                                    
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ):(
                                    <div className="flex GridSection xs6 sm4 p-sm-0">
                                        <div className="prel Gutter">
                                        <Link to={`/category/?category_ids=${data.id}`}>
                                                <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '100%' }}>
                                                    <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '32%' }}>
                                                        <img src={data.thumbnail} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                                    </div>
                                                    <div className="animated-bg-placeholder"></div>
                                                </div>
                                                {/* <div className="image-gradient"></div> */}
                                                <div className="ImageTextDetail CategoryImageTextDetail">
                                                    <label className="h4 ImageTextLabelTop m-t-5 demi-bold"> {data.title} </label>
                                                    
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

export default Celebratory