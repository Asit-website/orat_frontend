import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ImageSlider({ showwatchshop }) {
  useEffect(() => {
    if (!showwatchshop) return;

    const scriptSrc = 'https://d1qflh9ill7vje.cloudfront.net/whatmore.js';
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existing) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.defer = true;
    document.body.appendChild(script);
  }, [showwatchshop]);

  return (
    showwatchshop && (
      <div className='App'>
        <div className="BreakPointContainer">
          <div className="CarouselSectionContainer">
            <div className="layout row justify-space-between align-center text-left SectionTitle">
              <h1 className='m-t-0 m-b-0 demi-bold w-auto'> WATCH AND SHOP </h1>
              <Link to="/category" className='ViewAllUrlsLink orat-color-hover h5 demi-bold w-auto'>VIEW ALL</Link>
            </div>
            <div className="layout">
              <div className="whatmore-base" style={{ minHeight: 300 }}>
                <div id="whatmoreShopId" data-wh="STRF8S43FI9"></div>
                <div id="whatmoreHeading" data-wh=""></div>
                <div id="whatmoreTitleFontSize" data-wh="28"></div>
                <div id="whatmoreLandscapePadding" data-wh="40"></div>
                <div id="whatmoreTopBottomPadding" data-wh="20"></div>
                <div id="whatmoreVideoTileSize" data-wh="80"></div>
                <div id="whatmoreVideoTileSizePortrait" data-wh="80"></div>
                <div id="whatmoreTitleFont" data-wh="sans-serif"></div>
                <div className="whatmore-template-type" data-wh="template-j"></div>
                <div id="whatmoreIsInDesignMode" data-wh="false"></div>
                <div className="whatmore-widget" data-wh="carousel"></div>
                <div className="whatmore-render-root"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageSlider;
