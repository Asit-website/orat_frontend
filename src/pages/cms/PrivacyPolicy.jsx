import React from 'react';

import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
const PrivacyPolicy = () => {

    return (
        <>
        <div className='App other-page-top my-credits-mobile'>
            <div className="AppContent BreakPointContainer">
                <div>
                    <div className="StaticPageContent">
                        <div className="StaticPages p-t-25 p-b-25">
                            <div className="layout">

                                <div className="flex xs12 sm12">
                                    <div className="m-t-25 return-ex">
                                        <h4>Privacy Policy</h4>
                                        <p className="mt-2 mb-4 p3">
                                        We make every effort to protect the privacy of our users and customers. As such, this privacy policy sets out how ORAT uses and protects any information that you give us when you use this website. Your online privacy and security is our priority, and we are committed to ensuring that you are protected. We will not disclose, sell, distribute or lease, personal information that you provide to us including your name, address, telephone number and email address. We do not receive your banking details, credit/debit card number, expiry date, card holder name, or any other information for payments made through our payment gateway.
                                        By using our website, you (the visitor) agree to allow third parties to process your IP address, in order to determine your location for the purpose of currency conversion. You also agree to have that currency stored in a session cookie in your browser (a temporary cookie which gets automatically removed when you close your browser). We do this in order for the selected currency to remain selected and consistent when browsing our website so that the prices can convert to your (the visitor) local currency.
                                        </p>
                                        <h4 className="mt-2">COOKIES</h4>
                                        <p className="mt-2 mb-4 p3">
                                        Cookies are small data files which are stored on your computer's hard drive when you visit a website. These cookies help web browsers to remember your preferences, and collect information about your usage patterns to help form a better and more personalized web experience. Usually, web browsers automatically accept cookies, however you can choose to modify your browser settings so you are notified when you are sent a cookie, and then you can choose to accept or decline it.
                                        </p>
                                        <h4 className="mt-2">SMS UPDATES</h4>
                                        <p className="mt-2 mb-4 p3">
                                        On signing up or placing an order with us you agree to get SMS communication regarding your order from our team.
                                        </p>
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </div>
                        </div></div></div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default PrivacyPolicy