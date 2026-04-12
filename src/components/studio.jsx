import React, { useEffect, useState } from 'react';
import { lookimg2, lookimg3, lookimg4 } from '../image'
import { bottomsubbannerList, blogsList } from '../services/General-service';
import { Link } from 'react-router-dom';
import SignUpBanner from './SignUpBanner';

function Studio() {
    const [subbannerArr, setsubBannerArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    const getsubBannerList = () => {
        bottomsubbannerList('')
            .then((data) => {
 console.log("sub banner", data);
                setsubBannerArr(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching banner list:", error);
                setLoading(false);
            });
    };
    const getBlogsList = () => {
        blogsList('')
            .then((data) => {

                setBlogs(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blog list:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getsubBannerList();
        getBlogsList();
    }, []);

    return (
        <div>
            <div className='App BlogBannerContainer'>
                <div className="BreakPointContainer d_sm_none">
                    <div className="flex xs8">
                        <div className="m-r-25 layout column align-start blog_imk">

                            {subbannerArr.map((data, index) => (
                                ((index + 1) == subbannerArr.length) ?
                                    (
                                        <>
                                            <div className="full-width" key={index}>
                                                <Link to={data.url ? `${data.url}` : '#'} {...data.url ? `target='_blank'` : ''} className='full-width' >
                                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '0%' }}>
                                                        <div className="DynamicHeightLoader layout row align-center justify-center " style={{ paddingTop: '18%' }}>
                                                            <img src={data.banner_image} alt="logo" className='img-resp DynamicHeightLoaderImage im_dot' style={{ padding: '0px' }} />
                                                            <div className="animated-bg-placeholder"></div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <Link to={data.url ? `${data.url}` : '#'} {...data.url ? `target='_blank'` : ''} className='full-width mb-4' key={index}>
                                            <div className="DynamicHeightLoaderWrapper inncont" style={{ paddingTop: '5%' }}>
                                                <p className="bkapnt">Book Your Appointment</p>
                                                <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '43%' }}>
                                                    <img src={data.banner_image} alt="logo" className='img-resp DynamicHeightLoaderImage im_dot' style={{ margin: '0px', padding: '0px' }} />
                                                    <div className="animated-bg-placeholder"></div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                            ))}


                            {/* <div className="full-width">
                                <a href="" className='full-width'>
                                    <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '0%' }}>
                                        <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '18%' }}>
                                            <img src={Studio2} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{padding:'0px' }}/>
                                        </div>
                                    </div>
                                </a>
                            </div> */}
                        </div>
                    </div>
                    <div className="flex xs4 layout column">
                        <div className="BlogSectionContainer bt_sect HomeSection layout column">
                            <div className="SectionTitle">
                                <h1 className="m-t-0 m-b-15 text-left demi-bold">FIRST LOOK ARTICLES</h1>
                            </div>
                            <div className="FirstLookBlogContainer layout wrap justify-center flex">
                                <div className="FirstLookBlogContainer layout wrap justify-center flex">
                                    {blogs?.map((data, index) => (
                                        <div className="FirstLookBlog flex " key={index}>
                                            <Link to={`/blogdetails/${data.id}`} className='layout row align-stretch'>
                                                <div className="flex xs5">
                                                    <div className="DynamicHeightLoaderWrapper icon">
                                                        <div className="DynamicHeightLoader layout DynamicHeightLoaderFallback" style={{ paddingTop: '0%' }}>
                                                            <img src={data.blog_thumb_img} alt="logo" className='img-resp DynamicHeightLoaderImage' />
                                                        </div>
                                                    </div>
                                                </div>                                                
                                                <div class="readMoreWrap flex xs6 layout column">
                                                    <div class="h5 text-left text-uppercase ellipsis-two-line demi-bold">
                                                        {data.blog_title}
                                                    </div>
                                                    <div class="p5 font-normal layout column justify-start align-start">
                                                        <div class="BlogdetailText text-left ellipsis-three-line m-t-4 m-b-auto mking">
                                                            <p className='mking1'>{data.blog_short_desc}
                                                                <span class="demi-bold p4 "> ...<Link to={`/blogdetails/${data.id}`}> </Link>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div class="read-more-txt demi-bold m-t-4 ac_ac">{data.blog_date}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/blogs`} className='p4 btn btn-orat-primary viewAllBlogLink bold'> VIEW ALL STORIES </Link>
                                <SignUpBanner />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Studio;