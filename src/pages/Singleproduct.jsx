import React, { useState, useEffect } from 'react';
import Singleproducttext from '../components/singleproducttext';
import Singleproductimg from '../components/singleproductimg';
import { Link } from 'react-router-dom';
import Similar from '../components/similar';
import Complete from '../components/complete';
import Recently from '../components/recently';
import Fatiz from '../components/fatiz';

export default function Singleproduct() {

   
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
});

useEffect(() => {
    const deadline = new Date("2024-05-04T19:30:00"); // Set the concert time here
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance <= 0) {
            clearInterval(interval);
            setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        } else {
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({ hours, minutes, seconds });
        }
    }, 1000);

    return () => clearInterval(interval);
}, []);

  return (
    <>
  
        <div>
            <div className="App other-page-top singleproductimg_mobile">
                <div className="Product">
                    <div className="ProductDetail BreakPointContainer">
                        <div className="w-100 bg-orange pt-4 pb-4 pl-3 pr-3 layout d-grid-sm">
                            <h3> FLASH SALE UP TO 45% OFF </h3>
                            <p> Scene-Stealing Fusion Selects! &#127; ENDS IN </p>
                            <div className='time-div'>
                                <span>{countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}</span>:
                                <span>{countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes}</span>:
                                <span>{countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}</span>
                            </div>
                            <button type='button' className='btn'> SHOP NOW </button>
                        </div>
                        <div className="Breadcrumbs layout align-center">
                            <div>
                                <Link className="orat-color-hover ellipsis">Home</Link>
                                <span className="m-l-5 m-r-5">&gt;</span>
                            </div>
                            <div>
                                <span className="ellipsis">Multi-Colored Printed &amp; Embellished Lehenga Set</span>
                            </div>
                        </div>
                        <div className="layout secpage">
                            <Singleproductimg />
                            <Singleproducttext />
                        </div>
                        <div className="m-b-20">
                            <div className="SimilarProductFromVueAI full-width">
                                <Fatiz />
                            </div>
                            <div className="SimilarProductFromVueAI full-width">
                                <Similar />
                            </div>
                            <div className="SimilarProductFromVueAI full-width">
                                <Recently />
                            </div>
                            <div className="SimilarProductFromVueAI full-width">
                                <Complete />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}
