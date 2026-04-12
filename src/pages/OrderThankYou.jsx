import React, { useState } from 'react';
import { FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/footer';



function OrderThankYou({id}) {
    const userInfo = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();
    if (!userInfo) {
        navigate('/');
    }

    return (

       
            <>
                <div className='App other-page-top my-account-mobile'>
                    <div className="AppContent BreakPointContainer">
                        <div className="MyAccountWrapper prel overflow-hidden">
                            <div className="MyAccBody layout xs12">
                                <section className="thank-you-wrapper">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                               

                                                <div className="thank-you-page-content">
                                                    <h1>Your order has been placed successfully.  </h1>
                                                    <Link to="/" className="btn-orat-secondry width-auto text-uppercase">continue shopping</Link>
                                     
                                                </div>
                                               
                                               
                                            </div>

                                        </div>

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        
    )
}

export default OrderThankYou;