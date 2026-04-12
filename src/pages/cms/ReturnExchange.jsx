import React from 'react';

import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
const ReturnExchange = () => {

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

                                        <h4 className="mt-2">Exchanges</h4>
                                        <p className="mt-2 mb-4 p3">
                                            We ensure that we provide you with the best fits, and our garments are quite true to size,
                                            however in the event that it does not fit you right, please reach out and we will exchange
                                            it for the desired size. We offer exchange in sizes. The customer must initiate the
                                            size exchange request via email at help@orat.in, within 1 week of receiving the goods.
                                            The goods must be sent back in their original state, unused and with intact tags. Each piece
                                            goes through a quality check, packed and sealed carefully. The product is only eligible for a
                                            return in the case of damage in transit. We do not accept returns or exchange on custom made,
                                            or made to measure pieces.
                                        </p>

                                        <h4 className="mt-2"> Exceptions / non-returnable items</h4>
                                        <p className="mt-2 mb-4 p3">
                                            Some items cannot be returned like custom made products, made to order products, gift cards
                                            and sale products  Please get in touch if you have questions or concerns about your specific item.
                                        </p>
                                        <h4 className="mt-2"> Returns</h4>
                                        <p className="mt-2 mb-4 p3">
                                            We have a no return policy, which means since all our products are
                                            made to order, we will not be able to process returns unless the product delivered is wrong or
                                            defected.
                                        </p>
                                        <p className="mt-2 mb-4 p3">
                                            To be eligible for a return, your item must be in the same condition that you received it,
                                            unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof
                                            of purchase.
                                        </p>
                                        <p className="mt-2 mb-4 p3">
                                            To start a return, you can contact us at help@orat.in . If your return is accepted, we’ll
                                            send you a return shipping label, as well as instructions on how and where to send your package.
                                            Items sent back to us without first requesting a return will not be accepted.
                                            You can always contact us for any return question at help@orat.in.

                                        </p>
                                        <h4 className="mt-2"> Sale Items:</h4>
                                        <p className="mt-2 mb-4 p3">
                                            Items sold under promotions, or at a discounted price cannot be
                                            exchanged or returned
                                        </p>

                                        <h4 className="mt-2"> Refunds</h4>
                                        <p className="mt-2 mb-4 p3"> We will notify you once we’ve received and inspected your return,
                                            and let you know if the refund was approved or not. If approved, you’ll be automatically
                                            refunded on your original payment method. Please remember it can take some time for your
                                            bank or credit card company to process and post the refund too.
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

export default ReturnExchange