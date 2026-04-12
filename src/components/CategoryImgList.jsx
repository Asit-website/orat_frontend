import React, { useEffect, useState } from 'react'
import { categoryList } from '../services/General-service'
import { getApiUrl } from '../config/apiConfig';
import { Link } from 'react-router-dom';

export default function CategoryImgList() {



    const [categoryArr,setCategoryArr] = useState([]);

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
    <div className='categoryimg-div shop_by_mobile'>
        <ul className='highlight-stock scrolling-wrapper-for-ios'>

            {
                categoryArr.map((data,index) =>(
                    <li key={index}>
                        <Link to={`/category/?category_ids=${data.id}`}>
                        <div className="DynamicHeightLoaderWrapper">
                            <div className="DynamicHeightLoader layout row align-center justify-center img-small dynamic-img-container prel">
                                <img src={data.icon} alt="logo" style={{ padding: '0px' }} className='img-resp DynamicHeightLoaderImage' />
                                <div className="animated-bg-placeholder"></div>   
                            </div>
                            </div>

                            <p>{data.title} </p>
                        </Link>
                    </li>
                ))
            }

        </ul>
    </div>
  )
}
