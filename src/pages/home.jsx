import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import Flash_sale from '../components/flash_sale';
import Shipped from '../components/shipped';
import Recently from '../components/recently';
import Wedding from '../components/wedding';
import Designers from '../components/designers';
import Wendell from '../components/wendell';
import Celebrating from '../components/celebrating';
import Handpicked from '../components/handpicked';
import Occasion from '../components/occasion';
import Eid from '../components/Eid';
import Hidden from '../components/hidden';
import Jewel from '../components/jewel';
import Decor from '../components/decor';
import Junior from '../components/junior';
import Bestselling from '../components/Bestselling';
import Celebratory from '../components/Celebratory';
import Celebriy from '../components/celebriy';
import Stores from '../components/stores';
import Studio from '../components/studio';
import ImageSlider from '../components/imageSlider';
import CategoryImgList from '../components/CategoryImgList';
import { homeshowhideList } from '../services/General-service';
import { TailSpin } from "react-loader-spinner";
import Footer from '../components/footer';
import Loader from "../components/Loader";
import { BrowserView, MobileView } from 'react-device-detect';
import LazyLoad from 'react-lazyload';
function Home() {
  const [showhidebanner, setshowhideBanner] = useState(false);
  const [showhidebestselling, setshowhidebestselling] = useState(false);
  const [showhidemusthave, setshowhidemusthave] = useState(false);
  const [showhideccloset, setshowhideccloset] = useState(false);
  const [showhideddecor, setshowhideddecor] = useState(false);
  const [showhidejunior, setshowhidejunior] = useState(false);
  const [showhidestores, setshowhidestores] = useState(false);
  const [showhidesubbanner, setshowhidesubBanner] = useState(false);
  const [showhidejcabinet, setshowhidejcabinet] = useState(false);
  const [showlastchancetobuy, setshowlastchancetobuy] = useState(false);
  const [showrecentviewed, setshowrecentviewed] = useState(false);
  const [showweddingtale, setshowweddingtale] = useState(false);
  const [showdondis, setshowdondis] = useState(false);
  const [showhiighlightd, setshowhiighlightd] = useState(false);
  const [showwatchshop, setshowwatchshop] = useState(false);
  const [showcelebsaree, setshowcelebsaree] = useState(false);
  const [showsbyocc, setshowsbyocc] = useState(false);
  const [showeidpicks, setshoweidpicks] = useState(false);
  const [showhpdeals, setshowhpdeals] = useState(false);
  const [showwomenj, setshowwomenj] = useState(false);
  const [loading, setLoading] = useState(true);

  const getShowhideList = () => {
    const sectionMap = {
      'BANNER': setshowhideBanner,
      'SUBBANNER': setshowhidesubBanner,
      'DAZZLING DECOR': setshowhideddecor,
      'FOR YOUR JUNIOR': setshowhidejunior,
      'STORES': setshowhidestores,
      'CELEBRITY CLOSET': setshowhideccloset,
      'CELEBRATORY MUST-HAVES': setshowhidemusthave,
      'BESTSELLING DESIGNERS': setshowhidebestselling,
      'THE JEWEL CABINET': setshowhidejcabinet,
      'RECENTLY VIEWED PRODUCTS': setshowrecentviewed,
      'LAST CHANCE TO BUY': setshowlastchancetobuy,
      'WEDDING TALES': setshowweddingtale,
      'DESIGNERS ON DISCOUNT': setshowdondis,
      'HIGHLIGHT DESIGNER': setshowhiighlightd,
      'WATCH AND SHOP': setshowwatchshop,
      'CELEBRATING THE SAREES': setshowcelebsaree,
      'SHOP BY OCCASION': setshowsbyocc,
      'EID PICKS': setshoweidpicks,
      'HANDPICKED DEALS': setshowhpdeals,
      'WOMEN JOURNA': setshowwomenj
    };

    homeshowhideList('')
      .then((data) => {
        // Handle different possible response structures
        const cmsSettingList = data?.data || data || [];

        // Debug: Log the entire response to see what we're getting
        console.log("Home Show/Hide API Response:", data);
        console.log("CMS Setting List:", cmsSettingList);

        if (cmsSettingList?.length > 0) {
          cmsSettingList.forEach(dtlist => {
            // Some backends send different fields for show/hide, so normalise them here
            const rawStatus =
              dtlist.status !== undefined && dtlist.status !== null
                ? dtlist.status
                : dtlist.show_hide !== undefined && dtlist.show_hide !== null
                ? dtlist.show_hide
                : dtlist.show_hide_status !== undefined && dtlist.show_hide_status !== null
                ? dtlist.show_hide_status
                : dtlist.show;

            const statusStr = rawStatus !== undefined && rawStatus !== null
              ? String(rawStatus).trim().toUpperCase()
              : '';

            // Treat ONLY these values as VISIBLE, everything else hidden
            const isVisible =
              statusStr === '1' ||
              statusStr === 'TRUE' ||
              statusStr === 'SHOW' ||
              rawStatus === 1 ||
              rawStatus === true;

            const isHidden = !isVisible;

            // Normalize name: trim whitespace and compare (case-insensitive)
            const name = dtlist.name?.trim().toUpperCase();

            // Debug: Log each item being processed
            console.log(`Processing home CMS: name="${name}", rawStatus="${rawStatus}" (type: ${typeof rawStatus}), isVisible=${isVisible}, isHidden=${isHidden}`);

            // Use mapping object to set state
            if (name && sectionMap[name]) {
              if (isHidden) {
                console.log(`Hiding ${name}`);
                sectionMap[name](false);
              } else {
                console.log(`Showing ${name}`);
                sectionMap[name](true);
              }
            }
          });
        } else {
          console.warn("CMS Setting List is empty or not an array:", cmsSettingList);
          // If API fails or returns empty, hide all sections to avoid accidentally showing hidden CMS blocks.
          Object.values(sectionMap).forEach(setter => setter(false));
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching home show hide list:", error);
        // On error also hide all sections so nothing hidden in CMS accidentally shows.
        Object.values(sectionMap).forEach(setter => setter(false));
        setLoading(false);
      });
  };

  useEffect(() => {
    getShowhideList();

  }, []);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    loading ? (
      <Loader />
    ) : (
      <>
        <div>
          <div className='BreakPointContainer AppContent'>
            <div className='HomeSection'>
              <div className="list">
                <LazyLoad height={200} >
                  <CategoryImgList />
                </LazyLoad>
                <MobileView>
                  <Banner showBanner={showhidebanner} />
                  <Flash_sale showsubBanner={showhidesubbanner} />
                  <LazyLoad height={200} offset={[-350, 0]}>
                    <Recently showrecentviewed={showrecentviewed} />
                    <Shipped showlastchancetobuy={showlastchancetobuy} />
                    <Wedding showweddingtale={showweddingtale} />
                  </LazyLoad>
                </MobileView>
                <BrowserView>
                  <LazyLoad height={200}>
                    <Banner showBanner={showhidebanner} />
                  </LazyLoad>
                  <LazyLoad height={200} offset={[-250, 0]}>
                    <Recently showrecentviewed={showrecentviewed} />
                  </LazyLoad>
                  <LazyLoad height={200} offset={[-300, 0]}>
                    <Flash_sale showsubBanner={showhidesubbanner} />
                  </LazyLoad>
                  <LazyLoad height={200} offset={[-50, 0]}>
                    <Shipped showlastchancetobuy={showlastchancetobuy} />
                  </LazyLoad>
                  <LazyLoad height={200}>
                      <Wedding showweddingtale={showweddingtale} />
                    </LazyLoad>                  
                </BrowserView>

                <LazyLoad height={200}>
                  <Designers showdondis={showdondis} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Wendell showhiighlightd={showhiighlightd} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <ImageSlider showwatchshop={showwatchshop} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Celebrating showcelebsaree={showcelebsaree} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Occasion showsbyocc={showsbyocc} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Eid showeidpicks={showeidpicks} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Handpicked showhpdeals={showhpdeals} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Jewel showjcabinet={showhidejcabinet} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Decor showddecor={showhideddecor} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Junior showjunior={showhidejunior} />
                </LazyLoad>
                <LazyLoad height={200}>
                  <Hidden showwomenj={showwomenj} />
                </LazyLoad>
                <LazyLoad height={200}>
                  {/* <Gentlemen/> */}
                  {/* <Bestselling showbestselling={showhidebestselling} /> */}
                </LazyLoad>
                <LazyLoad height={200}>
                  <Celebratory showmusthave={showhidemusthave} />
                  <Stores showstores={showhidestores} />
                  <Studio />
                </LazyLoad>
              </div>
            </div>
          </div>
        </div>
        <LazyLoad height={200}>
          <Footer />
        </LazyLoad>
      </>

    )
  )
}

export default Home