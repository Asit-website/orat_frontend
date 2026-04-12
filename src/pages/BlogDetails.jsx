import React, { useState, useEffect } from 'react';
import Singleproductimg from '../components/SingleProductImg';
import { Link } from 'react-router-dom';
import Similar from '../components/similar';
import Complete from '../components/complete';
import Fatiz from '../components/fatiz';
import { useParams } from 'react-router-dom';
import { blogDetailsd } from '../services/General-service';
import Loader from "../components/Loader";
import Footer from '../components/footer';

function BlogDetails() {

    const { id } = useParams();
    const [blog, setBlog] = useState();
    const [loading, setLoading] = useState(true);
    const [html, setHTML] = useState({__html: ""});
    const getBlogDetails = () => {
        const blogDetails = {
            blog_id: id,
        }
        blogDetailsd(blogDetails).then((data) => {
            setBlog(data.data);
            setHTML({__html: data.data.blog_long_desc});
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getBlogDetails(id);
    }, [id])

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <div>
                            <div className="App other-page-top singleproductimg_mobile">
                                <div className="Product">
                                    <div className="ProductDetail BreakPointContainer">
                                        <div className="Breadcrumbs layout align-center">
                                            <div>
                                                <Link className="orat-color-hover ellipsis">Home</Link>
                                                <span className="m-l-5 m-r-5">&gt;</span>
                                            </div>
                                            <div>
                                                <span className="ellipsis">{blog.blog_title}</span>
                                            </div>
                                        </div>
                                        <div className="layout secpage">
                                            <div class="blog-single gray-bg">
                                                <div class="container">
                                                    <div class="row align-items-start justify-content-center">
                                                        <div class="col-lg-8 m-15px-tb ">
                                                            <article class="article">
                                                                <div class="article-img">
                                                                    <img src={blog.blog_img} title="" alt="" />
                                                                </div>
                                                                <div class="article-title">
                                                                    <h2>{blog.blog_title}</h2>
                                                                    <div class="media">

                                                                        <div class="media-body">
                                                                            <label>ORAT</label>
                                                                            <span>{blog.blog_date}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="article-content">
                                                                    
                                                                    <div dangerouslySetInnerHTML={html} />
                                                                </div>

                                                            </article>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
                )
            }
        </>
    )
}
export default BlogDetails;