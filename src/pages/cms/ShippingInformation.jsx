import React from 'react';

import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
const ShippingInformation = () => {

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
                                        <h4>Shipping Policy</h4>
                                        <p className="mt-2 mb-4 p3">
                                            As soon you place your order, you will receive a confirmation email. All orders are shipped from our Manufacturing unit in Kolkata. Incase the customer requires the delivery to be done urgently, we can try and will have to be notified 7 days in advance. Once shipped please allow 3-5 working days from dispatch for your goods to reach the destination.
                                        </p>
                                        <h4 className="mt-2">Help</h4>
                                        <h4 className="mt-2">  Sizing Information:</h4>
                                        <p className="mt-2 mb-4 p3">
                                            The size guide is available next to the size selection option, labeled as "What's my size." Here, you can easily view the complete size chart and a measuring guide. Additionally, a "How to Measure" video is provided to ensure you choose the right size with precision.
                                            For those seeking a perfect fit, we offer a custom tailoring option. You can input your measurements along with the size guide to get a size tailored to your body type.
                                            If you're unsure about your size, there's a dedicated "I don’t know my size" section. Simply fill in your details, and our team will reach out to assist you in finding your ideal fit.
                                        </p>
                                        <h4 className="mt-2"> HOW DO I MAKE A PURCHASE?</h4>
                                        <p className="mb-4 p3">
                                            Shopping at Orat is easy:
                                            - Once you have found an item, select your size and click on the 'ADD TO SHOPPING BAG' button underneath each item.
                                            - Review the items in your shopping bag by clicking the 'SHOPPING BAG' link at the top of the page. You can use the 'REMOVE FROM BASKET' link to delete items from your shopping bag.
                                            - Click on 'PROCEED TO PURCHASE' to complete your order.
                                        </p>
                                        <h4 className="mt-2"> Do I need to set up an account to place an order?</h4>
                                        <p className="mb-4 p3">
                                            Yes. You can browse through the collection without creating an account and select merchandise you like. But, to be able to buy, you need to set up an account which is a fairly easy process.
                                            Register with us and you'll be able to enjoy the following benefits through your ORAT Pop-Up Shop account:
                                            - Track your orders and review past purchases
                                            - Request your return or exchange directly from your account
                                            - Save your address and card details so you can shop even quicker next time
                                            - Manage your account details, address book and email preferences
                                            - To create an account, simply click on 'SIGN IN' and then 'REGISTER NOW' to fill in your details.
                                            I've forgotten my password. What should I do?
                                            If you have forgotten your password, click here to change it or follow the 'FORGOT PASSWORD' instructions on the SIGN IN page
                                        </p>
                                        <h4 className="mt-2">Are the colors of products shown on the website accurate?</h4>
                                        <p className="mb-4 p3">
                                            While we have made every effort to display as accurately as possible the colors of
                                            the products that appear on the Site, we cannot guarantee that your monitor or screen’s
                                            display of any color will be completely accurate, as computer monitors and screens of
                                            electronic devices vary.
                                        </p>
                                        <p>&nbsp;</p>
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

export default ShippingInformation