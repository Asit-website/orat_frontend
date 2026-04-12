import React, { useState, useEffect } from 'react';
import { Productbanner1 } from '../image';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { CiFilter } from 'react-icons/ci';
import Button from 'react-bootstrap/Button';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import Filter from '../components/Filter';
import { best_seller, getBestSellerBanner } from '../services/Product-service';
import Loader from '../components/Loader';
import Footer from '../components/footer';
import { formatPrice } from "../utils/formatPrice";

function BestSellers() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('v-pills-home');
  const [productsArr, setProductsArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortby] = useState('popular');
  const [sortBylabel, setSortbylabel] = useState('');
  const [bannerimage, setbannerimage] = useState(Productbanner1);
  const [catNamelabel, setcatNamelabel] = useState('ALL');
  const [queryParameters, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(queryParameters.get('min_price') || '');
  const [maxPrice, setMaxPrice] = useState(queryParameters.get('max_price') || '');
  const navigate = useNavigate();
  


  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const updateSortby = (sort_by) => {
    setSortby(sort_by);
    if (queryParameters.has('sort_by')) {
      queryParameters.set('sort_by', sort_by);
    } else {
      queryParameters.append('sort_by', sort_by);
    }
    setSearchParams(queryParameters);

    if (queryParameters.get('sort_by') == 'newest') {
      setSortbylabel('Latest');
    } else if (queryParameters.get('sort_by') == 'popular') {
      setSortbylabel('Popular');
    } else if (queryParameters.get('sort_by') == 'price_asc') {
      setSortbylabel('Price - Low to High');
    } else if (queryParameters.get('sort_by') == 'price_desc') {
      setSortbylabel('Price - High to Low');
    } else if (queryParameters.get('sort_by') == 'discount_desc') {
      setSortbylabel('Discount - High to Low');
    } else {
      setSortbylabel('Popular');
    }

    setDropdownVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinPrice(queryParameters.get('min_price') || '');
      setMaxPrice(queryParameters.get('max_price') || '');
    }, 300);
    return () => clearTimeout(timer);
  }, [queryParameters]);

  // Fetch best-seller banner on component mount
  useEffect(() => {
    const fetchBestSellerBanner = async () => {
      try {
        const response = await getBestSellerBanner();
        const imageUrl =
          response?.data?.image_url ||
          response?.data?.image ||
          response?.data?.banner_image ||
          response?.banner?.image ||
          response?.banner ||
          response?.image;

        if (imageUrl) {
          // Set banner immediately if currently showing default banner
          setbannerimage((currentBanner) => {
            if (currentBanner === Productbanner1) {
              return imageUrl;
            }
            return currentBanner;
          });
        }
      } catch (error) {
        console.error("Error fetching best-seller banner:", error);
      }
    };

    fetchBestSellerBanner();
  }, []);

  useEffect(() => {
    async function getProductsList() {
      setLoading(true);
      if (queryParameters.get('sort_by') == 'newest') {
        setSortbylabel('Latest');
      } else if (queryParameters.get('sort_by') == 'popular') {
        setSortbylabel('Popular');
      } else if (queryParameters.get('sort_by') == 'price_asc') {
        setSortbylabel('Price - Low to High');
      } else if (queryParameters.get('sort_by') == 'price_desc') {
        setSortbylabel('Price - High to Low');
      } else if (queryParameters.get('sort_by') == 'discount_desc') {
        setSortbylabel('Discount - High to Low');
      } else {
        setSortbylabel('Popular');
      }

      // Fetch best-seller banner first
      let apiBannerImage = null;
      try {
        const bannerResponse = await getBestSellerBanner();
        const imageUrl =
          bannerResponse?.data?.image_url ||
          bannerResponse?.data?.image ||
          bannerResponse?.data?.banner_image ||
          bannerResponse?.banner?.image ||
          bannerResponse?.banner ||
          bannerResponse?.image;
        if (imageUrl) {
          apiBannerImage = imageUrl;
        }
      } catch (error) {
        console.error("Error fetching best-seller banner:", error);
      }

      best_seller().then((data) => {       
        let filteredProducts = data.data;
        if (queryParameters.get('min_price') || queryParameters.get('max_price')) {
          const min = parseFloat(queryParameters.get('min_price')) || 0;
          const max = parseFloat(queryParameters.get('max_price')) || Infinity;
          filteredProducts = data.data.filter(
            (product) => product.saleprice >= min && product.saleprice <= max
          );
        }
        if (queryParameters.get('sort_by') == 'price_asc') {
          filteredProducts.sort((a, b) => a.saleprice - b.saleprice);
        }
        if (queryParameters.get('sort_by') == 'price_desc') {
          filteredProducts.sort((a, b) => b.saleprice - a.saleprice);
        }
        if (queryParameters.get('sort_by') == 'discount_desc') {
          filteredProducts.sort((a, b) => b.discount_price - a.discount_price);
        }
        setProductsArr(filteredProducts);

        // Set banner image - priority: datadet.cover > API banner > default
        if (data?.datadet?.cover && data?.datadet?.cover != '') {
          setbannerimage(data.datadet.cover);
        } else if (apiBannerImage) {
          setbannerimage(apiBannerImage);
        } else {
          setbannerimage(Productbanner1);
        }

        // Set category name label
        if (data?.datadet?.title && data?.datadet?.title != '') {
          setcatNamelabel(data.datadet.title);
        } else {
          setcatNamelabel('ALL');
        }

        setLoading(false);
      })
        .catch((error) => {
          console.error("Error fetching product list:", error);
          setLoading(false);
        });
    }
    getProductsList();
  }, [queryParameters]);

  return (
    loading ? (
      <Loader />
    ) : (
      <>
        <div>
          <div className='App other-page-top'>
            <div className="BreakPointContainer AppContent">
              <div className="layout ProductList align-start">
                <>
                  <div className="custom-flex Productpage ProductListContainer minWidth0">
                    <div className="prel">
                      <div className="Banner m-t-20 prel category-base-banner">
                        <Link to="/">
                          <div className="timerPosition layout align-center justify-end">
                            <div className="timer-banner-container">
                              <div className="layout align-center justify-center full-height">
                                <div className="small-font">  </div>
                              </div>
                            </div>
                          </div>
                          <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '5%' }}>
                            <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '20%' }}>
                              <img src={bannerimage} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                            </div>
                            <div className="animated-bg-placeholder"></div>
                          </div>
                        </Link>
                      </div>
                      <div className="CategoryHeader layout justify-space-between align-center">
                        <div>
                          <div className="layout align-center">
                            <h4 className="CategoryTitle ellipsis demi-bold">{catNamelabel}</h4>
                            <p className="CategoryProductCount h7 font-normal">({productsArr?.length} products)</p>
                          </div>
                        </div>
                        <div className="CategoryHeaderFilters">
                          <div className="dd-wrapper">
                            <div className="dd-header" onClick={toggleDropdown}>
                              <div>
                                <span className="dd-header-sort-text">Sort by: </span>
                                <span className="dd-header-title demi-bold">
                                  {sortBylabel}
                                </span>
                                {/* <Select
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              options={options}
                            />   */}
                              </div>
                              <span className={`arrow-icon m-r-5 ${isDropdownVisible ? 'arrow-down-icon' : 'arrow-up-icon'}`}></span>
                            </div>

                            {isDropdownVisible && (
                              <ul className='dd-list bold'>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'popular' ? `selected` : ``}`} onClick={() => updateSortby('popular')} > Popular </li>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'newest' ? `selected` : ``}`} onClick={() => updateSortby('newest')}> Latest </li>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'price_asc' ? `selected` : ``}`} onClick={() => updateSortby('price_asc')}> Price - Low to High </li>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'price_desc' ? `selected` : ``}`} onClick={() => updateSortby('price_desc')}> Price - High to Low </li>
                                <li className={`dd-list-item font-normal ${queryParameters.get('sort_by') == 'discount_desc' ? `selected` : ``}`} onClick={() => updateSortby('discount_desc')}> Discount - High to Low </li>
                              </ul>
                            )}

                          </div>
                          <div className="mobile_filter" onClick={handleShow}>
                            <CiFilter />
                          </div>
                          {/* Mobile Filter  */}
                          <Modal className="filter-model ProductInfoModal fliter-model " show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Filter</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="singleproduct">
                              <Tabs id="controlled-tab-example" className="mb-3 layout custom-tailored-header row">
                                <Tab eventKey="home" title="FILTER BY">
                                  <div className="filter-div">
                                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                      <a className={`nav-link ${activeTab === 'v-pills-home' ? 'active' : ''}`} id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected={activeTab === 'v-pills-home'} onClick={() => handleTabClick('v-pills-home')}>SHOP</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-profile' ? 'active' : ''}`} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected={activeTab === 'v-pills-profile'} onClick={() => handleTabClick('v-pills-profile')}>CATEGORY</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-messages' ? 'active' : ''}`} id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected={activeTab === 'v-pills-messages'} onClick={() => handleTabClick('v-pills-messages')}>SIZE</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-settings' ? 'active' : ''}`} id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected={activeTab === 'v-pills-settings'} onClick={() => handleTabClick('v-pills-settings')}>COLOR</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-SHIPPING-TIME' ? 'active' : ''}`} id="v-pills-SHIPPING-TIME-tab" data-toggle="pill" href="#v-pills-SHIPPING-TIME" role="tab" aria-controls="v-pills-SHIPPING-TIME" aria-selected={activeTab === 'v-pills-SHIPPING-TIME'} onClick={() => handleTabClick('v-pills-SHIPPING-TIME')}>SHIPPING TIME</a>
                                      <a className={`nav-link ${activeTab === 'v-pills-PRICE' ? 'active' : ''}`} id="v-pills-PRICE-tab" data-toggle="pill" href="#v-pills-PRICE" role="tab" aria-controls="v-pills-PRICE" aria-selected={activeTab === 'v-pills-PRICE'} onClick={() => handleTabClick('v-pills-PRICE')}>PRICE</a>
                                    </div>
                                    <div className="tab-content" id="v-pills-tabContent">
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-home' ? 'show active' : ''}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <div className="CheckboxList">
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Ready To Ship</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (39)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-profile' ? 'show active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <div className="CheckboxList">
                                          <h5 className="CheckboxListTitle demi-bold">Category</h5>
                                          <div className="CheckboxListSearch">
                                            <input type="text" value="" placeholder="Search" />
                                          </div>
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Kurta Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Dresses</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Lehenga</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Sarees</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Necklaces</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Earrings</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Embroidered Lehenga</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Sharara Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Co-Ord Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Pant Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Anarkali Set</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-messages' ? 'show active' : ''}`} id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        <div className="CheckboxList">
                                          <h5 className="CheckboxListTitle demi-bold">Size</h5>
                                          <div className="CheckboxListSearch">
                                            <input type="text" value="" placeholder="Search" />
                                          </div>
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">XS</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">S</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">M</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">L</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">XL</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">XXL</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">3XL</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">4XL</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">5XL</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">6XL</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Custom Tailored</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Free Size</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Free Size</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Free Size</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Free Size</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Free Size</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-settings' ? 'show active' : ''}`} id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                        <div className="CheckboxList">
                                          <h5 className="CheckboxListTitle demi-bold">Color</h5>

                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#ffd700', borderColor: '#ffd700' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Gold</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#fff', borderColor: '#000' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">White</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#000', borderColor: '#000' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Black</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#4E8B08', borderColor: '#4E8B08' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Green</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#FFC0CB', borderColor: '#FFC0CB' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Pink</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#ffff00', borderColor: '#ffff00' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Yellow</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#ff0000', borderColor: '#ff0000' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Red</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#65DDEF', borderColor: '#65DDEF' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Powder Blue</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#FFB7DE', borderColor: '#FFB7DE' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Blush Pink</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#fff', borderColor: '#000' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Multi</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#A92AED', borderColor: '#A92AED' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Purple</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark" style={{ background: '#0051C2', borderColor: '#0051C2' }}></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Cobalt Blue</span>
                                                  <span className="PslCheckboxCount p2">(61951)</span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div className={`tab-pane fade ${activeTab === 'v-pills-SHIPPING-TIME' ? 'show active' : ''}`} id="v-pills-SHIPPING-TIME" role="tabpanel" aria-labelledby="v-pills-SHIPPING-TIME-tab">
                                        <div className="CheckboxList">
                                          <h5 className="CheckboxListTitle demi-bold">SHIPPING TIME</h5>
                                          <div className="CheckboxListOptions layout row align-start wrap">
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">48 Hours</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (31951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">7 Days</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (21951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">10 Days</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (11951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">1-2 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (41951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">2-3 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (31951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">3-4 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (31951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">4-5 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (31951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="flex xs12 CheckboxColorOptions">
                                              <div className="PslCheckbox flex">
                                                <label>
                                                  <input type="checkbox" name="5" className="PslCheckboxInput" />
                                                  <span className="PslCheckboxCheckmark"></span>
                                                  <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Above 5 Weeks</span>
                                                  <span className='PslCheckboxCount p2'>
                                                    (61951)
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div> */}
                                      <div className={`tab-pane fade ${activeTab === 'v-pills-PRICE' ? 'show active' : ''}`} id="v-pills-PRICE" role="tabpanel" aria-labelledby="v-pills-PRICE-tab">
                                        <div className="PriceFilterContainer CheckboxList">
                                          <div className="layout justify-space-between align-center CheckboxListTitle">
                                            <h5 className="demi-bold">Price</h5>
                                          </div>
                                          <div className="layout">
                                            <div className="flex xs5">
                                              <p className="m-b-5 CurrencySymbol m-l-12 p2">Min</p>
                                              <div className="layout align-center">
                                                <span className="m-r-5 CurrencySymbol p2"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i></span>
                                                <div className="layout">
                                                  <input
                                                    type="number"
                                                    value={minPrice}
                                                    onChange={(e) => setMinPrice(e.target.value)}
                                                    placeholder="Min"
                                                    className="full-width p2"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex xs6 offset-xs1">
                                              <p className="m-b-5 CurrencySymbol m-l-12 p2">Max</p>
                                              <div className="layout align-center">
                                                <span className="m-r-5 CurrencySymbol p2"><i className="fa fa-inr" style={{ fontSize: '13px' }}></i></span>
                                                <div className="layout">
                                                  <input
                                                    type="number"
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(e.target.value)}
                                                    placeholder="Max"
                                                    className="full-width p2"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Tab>
                                <Tab eventKey="profile" title="SORT BY">
                                  <div className="layout sorting-dialog column">
                                    <div className="sorting-list">
                                      <div className="borderLine-thin"></div>
                                      <h3>
                                        <div className="sorting-list-item lh-22 font-normal orat-color">Popular </div>
                                        <div className="borderLine-thin"></div>
                                      </h3>
                                      <h3>
                                        <div className="sorting-list-item lh-22 font-normal">Latest </div>
                                        <div className="borderLine-thin"></div>
                                      </h3>
                                      <h3>
                                        <div className="sorting-list-item lh-22 font-normal">Price - Low to High </div>
                                        <div className="borderLine-thin"></div>
                                      </h3>
                                      <h3>
                                        <div className="sorting-list-item lh-22 font-normal">Price - High to Low </div>
                                        <div className="borderLine-thin"></div>
                                      </h3>
                                      <h3>
                                        <div className="sorting-list-item lh-22 font-normal">Discount - High to Low</div>
                                        <div className="borderLine-thin"></div>
                                      </h3>
                                    </div>
                                  </div>
                                </Tab>
                              </Tabs>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  setMinPrice('');
                                  setMaxPrice('');
                                  setSearchParams({});
                                  handleClose();
                                }}
                              >
                                CLEAR ALL
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => {
                                  const newParams = new URLSearchParams(queryParameters);
                                  if (minPrice) newParams.set('min_price', minPrice);
                                  else newParams.delete('min_price');
                                  if (maxPrice) newParams.set('max_price', maxPrice);
                                  else newParams.delete('max_price');
                                  setSearchParams(newParams);
                                  handleClose();
                                }}
                              >
                                APPLY
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                      {/* <div className="layout FilterChips wrap">
                        <div className="chip">
                          <span className="flex text-center m-r-5">XS</span>
                          <span className="chipClose">+</span>
                        </div>
                        <div className="chip chipClear">
                          <span className="bold">CLEAR</span>
                        </div>
                      </div> */}
                      <div className="layout wrap align-start  all_product">
                        {productsArr && productsArr.length > 0 ? (
                          <>
                            {productsArr && productsArr.length > 0 && productsArr.map((product, index) => (
                              <div key={index} className='category-product pr-3'>
                                <div className="category-div">
                                  <Link to={`/products/productdetails/${product.id}`} className='ProductCard'>
                                    <div className="ProductCardImageWrapper">
                                      <div className="ProductImageWrapper">
                                        <div className="FirstProductImage">
                                          <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '38%' }}>
                                            <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '100%' }}>
                                              <img src={product.product_thumbail} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                            </div>
                                            <div className="animated-bg-placeholder"></div>
                                          </div>
                                        </div>
                                        <div className="HoverProductImage">
                                          <div className="DynamicHeightLoaderWrapper" style={{ paddingTop: '38%' }}>
                                            <div className="DynamicHeightLoader layout row align-center justify-center" style={{ paddingTop: '100%' }}>
                                              <img src={product.product_back_image} alt="logo" className='img-resp DynamicHeightLoaderImage' style={{ padding: '0px' }} />
                                            </div>
                                            <div className="animated-bg-placeholder"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="ProductCardBottom">
                                      <h6 className="ProductCardTitle ellipsis demi-bold">{product.product_title}</h6>
                                      <p className="ProductCardDescription p2 ellipsis-two-line">{product.product_short_description}</p>
                                      <div>
                                        <div className="ProductPrice h6">
                                          <span className='SpecialPrice  demi-bold ' > <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> { formatPrice(product?.saleprice > 0 ? product?.saleprice : product?.price,{ showSymbol: false })} </span>
                                          {product?.discount_amount > 0 && (<span className='InitialPrice'> <i className="fa fa-inr" style={{ fontSize: '13px' }}></i> { formatPrice(product?.pric, {showSymbol:false} )} </span>)}
                                          {product?.discount_amount > 0 && (
                                            <span className='DiscountPriceRound demi-bold'>
                                              {product?.discount_type == 'flat' ? `${product?.discount_amount} FLAT OFF` : ''}
                                              {product?.discount_type == 'percentage' ? `${product?.discount_amount}% OFF` : ''}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div className="BestSeller demi-bold">BESTSELLER</div> */}
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="ProductListEmptyView layout">
                            <div className="layout flex column align-center">
                              <h3 className="bold text-center">We are Sorry!</h3>
                              <p>We couldn’t find anything matching your search criteria.</p>
                              <p>Please try resetting the filters again</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
}

export default BestSellers;