import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { giftaidList } from '../services/Product-service';
import Footer from '../components/footer';
import Loader from "../components/Loader";
import { blogsList } from '../services/General-service';
function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

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
        getBlogsList();
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
                                <h4 className="CategoryTitle ellipsis demi-bold">Blogs </h4>
                                <p className="CategoryProductCount p5 font-normal m-t-5 m-l-5">  ({blogs.length > 0 && <>{blogs.length}</>} blogs)</p>
                            </div>
                        </div>
                        <div className="blogs-all-div">
                            <div id="main-content" class="blog-page">
                                <div class="container">
                                    <div class="row clearfix justify-content-center" >
                                        <div class="col-lg-8 col-md-12 left-box mb-2">
                                            {blogs.map((data, index) => (
                                                <div class="card single_post mb-2" key={index}>
                                                    <div class="body">
                                                        <div class="img-post">
                                                            <img class="d-block img-fluid" src={data.blog_img} alt="First slide" />
                                                        </div>
                                                        <h3><Link to={`/blogdetails/${data.id}`}>{data.blog_title}</Link></h3>
                                                        <p>
                                                            {data.blog_desc_list}<span class="demi-bold p4 "> ...<Link to={`/blogdetails/${data.id}`}>Read More </Link></span>
                                                        </p>
                                                        <div class="read-more-txt demi-bold m-t-10">{data.blog_date}</div>
                                                    </div>
                                                    <div class="footer">
                                                        <div class="actions">
                                                            <Link to={`/blogdetails/${data.id}`} class="continue-reading-link blog-white-color text-decor-none d-flex items-center justify-center p5 blog-white-color  ls-2-0 font-medium text-uppercased">Continue Reading</Link>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))
                                            }
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
    )
}


export default Blogs;