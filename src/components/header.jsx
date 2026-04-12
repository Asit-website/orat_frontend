import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { logout } from "../Redux/features/User/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Heart, Logo, Search, Shoppingcart, User } from "../image";
import { api_base_url } from "../config/apiConfig";
import { Button, Modal } from "react-bootstrap";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import Browse from "./browse";
import Seacrhproducts from "./Seacrhproducts";
import Recently from "./recently";
import Trending from "./trending";
import LoginModal from "./loginmodal";
import CategoryImgList from "./CategoryImgList";
import { menuList } from "../services/General-service";
import { searchDetails } from "../services/Product-service";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getTotals } from "../Redux/features/Cart/CartSlice";
import {
  getWishList,
  getWishListd,
} from "../Redux/features/wishlist/WishListSlice";
import { BrowserView, MobileView } from "react-device-detect";
import { useSearchParams } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user.userInfo);
  const cart = useSelector((state) => state.cart);
  // console.log(cart);

  const wishlist = useSelector((state) => state.wishlist);

  const handleLogout = () => {
    dispatch(logout(userInfo));
    navigate("/");
  };



  useEffect(() => {
    dispatch(getTotals(userInfo));
  }, [cart, dispatch, userInfo]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setMobileCampaignVisible(null);
  }, [location.pathname]);

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchproducts, setSearchResults] = useState([]);
  const [searchloading, setSearchLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchInputRef = useRef(null);
  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const [mobileCampaignId, setMobileCampaignVisible] = useState(null);
  const [menuCampaign, setmenuCampaign] = useState(null);
 const [searchParamsc, setSearchParamsc] = useSearchParams();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [productPageTitle, setProductPageTitle] = useState(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    if (!body) return;
    if (show) body.classList.add("search-open");
    else body.classList.remove("search-open");
    return () => body.classList.remove("search-open");
  }, [show]);

  const resolveAssetUrl = (value) => {
    if (!value || typeof value !== "string") return "";
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (!api_base_url) return trimmed;
    const base = api_base_url.endsWith("/") ? api_base_url : `${api_base_url}/`;
    if (trimmed.startsWith("/")) return `${base}${trimmed.slice(1)}`;
    return `${base}${trimmed}`;
  };

  const resolveCampaignThumb = (campaign, randomProducts) => {
    if (!campaign) return "";
    const iconCandidate =
      campaign.icon ||
      campaign.icon_name ||
      campaign.mobile_cover ||
      campaign.cover ||
      campaign.image ||
      campaign.banner ||
      campaign.mobile_image ||
      "";

    if (iconCandidate) {
      // If backend sends only filename (e.g. "abc.png"), make a best-effort URL.
      // Most endpoints already send a full URL; for relative, prefix base and common upload paths.
      if (/^https?:\/\//i.test(iconCandidate)) return iconCandidate;

      const cleaned = iconCandidate.replace(/^\/+/, "");
      if (cleaned.includes("public/upload")) {
        return resolveAssetUrl(cleaned);
      }

      // Best-effort: treat as upload filename.
      return resolveAssetUrl(`public/upload/${cleaned}`);
    }

    return (randomProducts && randomProducts[0]?.product_thumbail) || "";
  };

  const currentPath = location.pathname || "";
  const isCheckoutPage = currentPath.startsWith("/checkout");
  const isAddressPage = currentPath.startsWith("/address");
  const isPaymentPage = currentPath.startsWith("/payment");
  const isCheckoutFlowPage = isCheckoutPage || isAddressPage || isPaymentPage;
  const isWishlistPage = location.pathname === "/wishlist";
  const isMyAccountPage = location.pathname === "/myaccount";
  const isOrderHistoryPage = location.pathname === "/orderhistory";
  const isManageAddressPage = location.pathname === "/addaddress";
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const isCategoryPage = location.pathname === "/category" || location.pathname === "/category/";
  const isRecentlyViewPage = isCategoryPage && (searchParamsc.get('view') === 'recently');
  const currentCampaign = searchParamsc.get('campaign');
  const isCampaignPage = isCategoryPage && currentCampaign && currentCampaign !== '';
  // Show custom header for all category pages (base /category or with filters)
  const showCategoryHeader = isCategoryPage;
  // Check if product details page
  const isProductDetailsPage = location.pathname.includes('/products/productdetails/');

  
  const modalHide = () => {
    setModalShow(false);
  };

  const toggleNavbar = () => {
    if (isOpen) {
      // Close menu and reset all dropdowns
      setIsOpen(false);
      setMobileCampaignVisible(null);
    } else {
      // Open menu
      setIsOpen(true);
    }
  };

  const [menuArr, setMenuArr] = useState([]);
  // console.log(menuArr);

  const getMenuList = () => {
    // Request more random products (up to 12) for hover panel
    // Try multiple parameter names that backend might accept
    menuList({ 
      random_products_limit: 12,
      random_product_limit: 12,
      random_limit: 12,
      products_limit: 12,
      limit: 12
    })
      .then((data) => {
        setMenuArr(data.campaigns);
        // Log to check if API returned more products
        if (data.campaigns && data.campaigns.length > 0) {
          console.log('Menu API response - random_products count:', 
            data.campaigns.map(c => ({ 
              campaign: c.campaign?.campaign_title, 
              random_products: c.random_products?.length || 0 
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching menu list:", error);
      });
  };

  useEffect(() => {
    getMenuList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSearchDetails = (searchValue) => {
    setSearchVal(searchValue);
    setSearchLoading(true);

    if (searchValue.trim().length >= 3) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        const searchDetailsData = { search_value: searchValue };
        searchDetails(searchDetailsData)
          .then((data) => {
            setSearchResults(data.data);
            setSearchLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching search list:", error);
            setSearchLoading(false);
          });
      }, 1000);
      setTimer(newTimer);
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }
  };

  // Auto-focus search input when search modal is opened
  useEffect(() => {
    if (show && searchInputRef.current) {
      try {
        searchInputRef.current.focus();
      } catch (e) {
        console.error("Error focusing search input", e);
      }
    }
  }, [show]);

  // --- SEARCH HISTORY HELPERS ---
  // Load search history from localStorage once on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("searchHistory"));
      if (Array.isArray(stored)) {
        setSearchHistory(stored);
      }
    } catch (e) {
      console.error("Error reading search history from localStorage", e);
    }
  }, []);

  // Save a term into localStorage-backed history (latest first, unique, max 10)
  const saveSearchTerm = (term) => {
    if (!term || !term.trim()) return;
    const cleanTerm = term.trim();
    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (t) => t.toLowerCase() !== cleanTerm.toLowerCase()
      );
      const updated = [cleanTerm, ...filtered].slice(0, 10);
      try {
        localStorage.setItem("searchHistory", JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving search history to localStorage", e);
      }
      return updated;
    });
  };

  // Whenever we have a non-empty term and some results, add to history
  useEffect(() => {
    if (searchVal && searchproducts && searchproducts.length > 0) {
      saveSearchTerm(searchVal);
    }
  }, [searchVal, searchproducts]);

  const handleHistoryClick = (term) => {
    if (!term) return;
    getSearchDetails(term);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem("searchHistory");
    } catch (e) {
      console.error("Error clearing search history from localStorage", e);
    }
  };

  useEffect(() => {
    const campaign_id = searchParamsc.get('campaign');
    if (campaign_id && campaign_id !== '') {
      setmenuCampaign(campaign_id);
    } else {
      setmenuCampaign(null);
    }
    getMenuList();
  }, [searchParamsc, location]);

  // Scroll handler for mobile home page header hide/show
  useEffect(() => {
    if (!isHomePage) {
      setIsHeaderVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top or scrolling up
      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
      } 
      // Hide header when scrolling down (more than 50px)
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false);
      } 
      // Show header when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, lastScrollY]);

  // State for category name (updated from sessionStorage)
  const [categoryPageTitle, setCategoryPageTitle] = useState(null);

  // Get category/campaign name from menuArr or sessionStorage
  const categoryName = useMemo(() => {
    if (!isCategoryPage) return null;
    
    // For campaign pages, get from menuArr
    if (currentCampaign && menuArr && menuArr.length > 0) {
      const campaign = menuArr.find(data => 
        String(data.campaign.id) === String(currentCampaign) ||
        Number(data.campaign.id) === Number(currentCampaign)
      );
      if (campaign) return campaign.campaign.campaign_title;
    }
    
    // For other category pages, use state (updated from sessionStorage)
    // If no name found, show "ALL" for base category page
    return categoryPageTitle || "ALL";
  }, [isCategoryPage, menuArr, currentCampaign, categoryPageTitle]);

  // Check if base category page (no filters)
  const isBaseCategoryPage = isCategoryPage && !(
    searchParamsc.get('category_id') ||
    searchParamsc.get('occasion_id') ||
    searchParamsc.get('designer_id') ||
    searchParamsc.get('style_id') ||
    searchParamsc.get('pattern_id') ||
    searchParamsc.get('edit_id') ||
    searchParamsc.get('fabric_id') ||
    searchParamsc.get('campaign') ||
    searchParamsc.get('category_ids') ||
    searchParamsc.get('occasion_ids') ||
    searchParamsc.get('size_ids') ||
    searchParamsc.get('color_ids')
  );

  // Update category name from sessionStorage when category page changes
  useEffect(() => {
    if (isCategoryPage) {
      // For base category page, always show "ALL"
      if (isBaseCategoryPage) {
        setCategoryPageTitle(null); // Will show "ALL" in categoryName useMemo
        return;
      }
      
      const storedName = sessionStorage.getItem('categoryPageTitle');
      if (storedName && storedName !== 'ALL') {
        setCategoryPageTitle(storedName);
      } else {
        setCategoryPageTitle(null);
      }
      
      // Listen for storage changes (when category page updates the name)
      const handleStorageChange = () => {
        const updatedName = sessionStorage.getItem('categoryPageTitle');
        if (updatedName && updatedName !== 'ALL') {
          setCategoryPageTitle(updatedName);
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      // Also check periodically (since storage event doesn't fire for same tab)
      const interval = setInterval(() => {
        const currentName = sessionStorage.getItem('categoryPageTitle');
        if (currentName && currentName !== 'ALL' && currentName !== categoryPageTitle) {
          setCategoryPageTitle(currentName);
        }
      }, 500);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [isCategoryPage, isBaseCategoryPage, location.pathname, categoryPageTitle]);

  // Update product name from sessionStorage when product details page changes
  useEffect(() => {
    if (isProductDetailsPage) {
      const storedName = sessionStorage.getItem('productPageTitle');
      if (storedName) {
        setProductPageTitle(storedName);
      } else {
        setProductPageTitle(null);
      }
    } else {
      setProductPageTitle(null);
    }
  }, [isProductDetailsPage, location.pathname]);

  const resetSearchState = () => {
    setSearchVal("");
    setSearchResults([]);
    setSearchLoading(false);
  };

  const searchHide = () => {
    setShow(false);
    resetSearchState();
  };

  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };

  const showSubmenuMobile = (campaignId) => {
    setMobileCampaignVisible(
      campaignId === mobileCampaignId ? null : campaignId
    );
  };

  const closeModal = (data) => {
    setShow(data);
    if (!data) {
      resetSearchState();
    }
  };


  const handleLogoClick = (e) => {
    if (isHomePage) {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      return;
    }

    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <header className={`Header${(isCheckoutPage || isPaymentPage) ? " HeaderCheckout" : ""}${isPaymentPage ? " paymentCheckout" : ""}${isAddressPage ? " headerAddress HeaderCheckout" : ""}${isWishlistPage ? " wishClass" : ""}${showCategoryHeader ? " campaignHeader" : ""}${isProductDetailsPage ? " detailHeader" : ""}${isHomePage ? " homeHeader" : ""}${isHomePage && !isHeaderVisible ? " header-hidden" : ""}${isMyAccountPage ? " accountHeader" : ""}${isOrderHistoryPage ? " orderHistory" : ""}${isManageAddressPage ? " addressHeader" : ""}`}>
        {isHomePage && (
          <MobileView>
            <div className={`TopHeader${isWishlistPage ? " wishClass" : ""}`}>
              <div className="p2 text-center">
              For best prices and early deliveries, WhatsApp us at{" "}
                <Link
                  to="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!"
                  target="_blank"
                  className="demi-bold"
                >
                  +91 91470 72827
                </Link>
              </div>
            </div>
          </MobileView>
        )}
        {isManageAddressPage && (
          <MobileView style={{ width: "100%" }}>
            <div className="CampaignMobileHeader layout align-center">
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  marginRight: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://img.perniaspopupshop.com/pwa-assets/icons/back.svg"
                  alt="Back"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
              <h4 className="demi-bold m-b-0 h6">MANAGE ADDRESS</h4>
            </div>
          </MobileView>
        )}
        <div className="Content layout BreakPointContainer break_point">
          <div className="layout column full-width prel">
            <div className="SearchAndActions layout align-center justify-center prel" style={{ display: 'flex', alignItems: 'center' }}>
                {!isCheckoutFlowPage && (
                  <div className="currencyContainer dsmnone">
                    <select name="cars" id="cars" className="currency demi-bold">
                      <option value="">INR</option>
                    </select>
                    <span className="DownBlackArrow"></span>
                  </div>
                )}
                {!isCheckoutFlowPage && !isWishlistPage && !isCategoryPage && !isProductDetailsPage && (
                  <>
                    <button
                      className="currencyContainer navbar-toggle"
                      onClick={toggleNavbar}
                    >
                      <i
                        className={
                          isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
                        }
                      ></i>
                    </button>
                    <div className="Logo cursor-pointer">
                      {/* <Link to="/"> */}
                      <img
                        src={Logo}
                        alt="Logo"
                        className="logo-img"
                        onClick={handleLogoClick}
                      />
                      {/* </Link> */}
                    </div>
                  </>
                )}
                {showCategoryHeader && (
                  <MobileView style={{ width: "100%" }}>
                    <div className="CampaignMobileHeader layout align-center">
                      <button
                        type="button"
                        className="det_sok"
                        onClick={() => navigate(-1)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          marginRight: "8px",
                          fontSize: "18px",
                          lineHeight: 1,
                          cursor: "pointer",
                          position: "relative",
                          top: "-3px",
                          flexShrink: 0,
                        }}
                      >
                        &#8592;
                      </button>
                      <h4 className="demi-bold m-b-0 h6" style={{textAlign: "left"}}>
                        {isRecentlyViewPage ? "MORE PRODUCTS" : (categoryName || "ALL")}
                      </h4>
                      <div
                        className="layout align-center"
                        style={{ marginLeft: "auto", gap: "12px", flexShrink: 0 }}
                      >
                        <div className="currencyContainer" style={{ margin: 0 }}>
                          <select name="cars" id="cars" className="currency demi-bold" style={{ padding: "4px 20px 4px 8px", fontSize: "14px" }}>
                            <option value="">INR</option>
                          </select>
                          <span className="DownBlackArrow"></span>
                        </div>
                        {userInfo ? (
                          <Link to="/wishlist" style={{ margin: "0px" }}>
                            <img
                              src={Heart}
                              alt="Wishlist"
                              className="IconBtn wishIcon"
                            />
                          </Link>
                        ) : (
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setModalShow(true);
                            }}
                          >
                            <img
                              src={Heart}
                              alt="Wishlist"
                              className="IconBtn wishIcon"
                            />
                          </button>
                        )}
                        <Link to="/checkout" style={{ margin: "0px", position: "relative" }}>
                          <img
                            src={Shoppingcart}
                            alt="Cart"
                            className="IconBtn cartIcon"
                          />
                          {cart?.cartTotalQuantity > 0 && (
                            <span className="count bold detail_bold">
                              {cart.cartTotalQuantity}
                            </span>
                          )}
                        </Link>
                      </div>
                    </div>
                  </MobileView>
                )}
                {isAddressPage && (
                  <MobileView style={{ width: "100%" }}>
                    <div
                      className="CheckoutMobileHeader layout align-center"
                      style={{
                        height: "48px",
                        borderBottom: "1px solid #e9e9e9",
                        background: "#ffffff",
                        padding: "0 12px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          marginRight: "8px",
                          fontSize: "18px",
                          lineHeight: 1,
                          cursor: "pointer",
                          position: "relative",
                          top: "-3px",
                          flexShrink: 0,
                        }}
                      >
                        &#8592;
                      </button>
                      <h4 className="demi-bold m-b-0 h6" style={{textAlign: "left",fontSize: "14px", color: "#333333",fontWeight:"600"}}>SHIPPING INFO</h4>
                      <div style={{ marginLeft: "auto", fontSize: "14px", color: "#333333",whiteSpace:"nowrap",fontWeight:"600" }}>(STEP 2/3)</div>
                    </div>
                  </MobileView>
                )}
                {isPaymentPage && (
                  <MobileView style={{ width: "100%" }}>
                    <div
                      className="CheckoutMobileHeader layout align-center"
                      style={{
                        height: "48px",
                        borderBottom: "1px solid #e9e9e9",
                        background: "#ffffff",
                        padding: "0 12px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          marginRight: "8px",
                          fontSize: "18px",
                          lineHeight: 1,
                          cursor: "pointer",
                          position: "relative",
                          top: "-3px",
                          flexShrink: 0,
                        }}
                      >
                        &#8592;
                      </button>
                      <h4 className="demi-bold m-b-0 h6" style={{textAlign: "left",fontSize: "14px", color: "#333333",fontWeight:"600"}}>MAKE PAYMENT</h4>
                      <div style={{ marginLeft: "auto", fontSize: "14px", color: "#333333",whiteSpace:"nowrap",fontWeight:"600" }}>(STEP 3/3)</div>
                    </div>
                  </MobileView>
                )}
                {isOrderHistoryPage && (
                  <MobileView style={{ width: "100%" }}>
                    <div className="CampaignMobileHeader layout align-center">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          marginRight: "8px",
                          fontSize: "18px",
                          lineHeight: 1,
                          cursor: "pointer",
                          position: "relative",
                          top: "-3px",
                        }}
                      >
                        &#8592;
                      </button>
                      <h4 className="demi-bold m-b-0 h6">ORDER HISTORY</h4>
                    </div>
                  </MobileView>
                )}
                {isProductDetailsPage && (
                  <MobileView style={{ width: "100%" }}>
                    <div className="CampaignMobileHeader layout align-center">
                      <button
                      className="deatil_ex"
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          marginRight: "8px",
                          fontSize: "18px",
                          lineHeight: 1,
                          cursor: "pointer",
                          position: "relative",
                          top: "-3px",
                          flexShrink: 0,
                        }}
                      >
                        &#8592;
                      </button>
                      <h4 className="demi-bold m-b-0 h6" style={{textAlign: "left"}}>
                        {productPageTitle || "PRODUCT"}
                      </h4>
                      <div
                        className="layout align-center"
                        style={{ marginLeft: "auto", gap: "12px", flexShrink: 0 }}
                      >
                        {!isCheckoutPage && (
                          <Button
                            className="prel btn-icon p-l-0 p-r-0"
                            style={{ background: "none" }}
                            onClick={() => handleShow(true)}
                          >
                            <img
                              src={Search}
                              alt="Search"
                              className="IconBtn SearchImg"
                            />
                          </Button>
                        )}
                        {!isCheckoutPage && userInfo ? (
                          <Link to="/wishlist" style={{ margin: "0px", position: "relative" }}>
                            <img
                              src={Heart}
                              alt="Wishlist"
                              className="IconBtn wishIcon"
                            />
                            {wishlist?.wishlistItems?.length > 0 && (
                              <span className="count bold">
                                {wishlist.wishlistItems.length}
                              </span>
                            )}
                          </Link>
                        ) : !isCheckoutPage ? (
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setModalShow(true);
                            }}
                          >
                            <img
                              src={Heart}
                              alt="Wishlist"
                              className="IconBtn wishIcon"
                            />
                          </button>
                        ) : null}
                        <Link to="/checkout" style={{ margin: "0px", position: "relative" }}>
                          <img
                            src={Shoppingcart}
                            alt="Cart"
                            className="IconBtn cartIcon"
                          />
                          {cart?.cartTotalQuantity > 0 && (
                            <span className="count bold bold_de">
                              {cart.cartTotalQuantity}
                            </span>
                          )}
                        </Link>
                      </div>
                    </div>
                  </MobileView>
                )}
                {(isCampaignPage || isProductDetailsPage || isCategoryPage) && (
                  <BrowserView>
                    <div className="Logo cursor-pointer">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="logo-img"
                        onClick={handleLogoClick}
                      />
                    </div>
                  </BrowserView>
                )}
                {isCheckoutPage && (
                  <MobileView style={{ width: "100%" }}>
                    <div className="CheckoutMobileHeader layout align-center">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          marginRight: "8px",
                          fontSize: "18px",
                          lineHeight: 1,
                          cursor: "pointer",
                          position: "relative",
                          top: "-3px",
                        }}
                      >
                        &#8592;
                      </button>
                      <h4 className="demi-bold m-b-0 h6" style={{fontSize:"14px"}}>
                        MY CART ({cart?.cartTotalQuantity || 0})
                      </h4>
                      <div
                        className="layout align-center header_cart_ero"
                        style={{ marginLeft: "auto" }}
                      >
                        <Link
                          to="https://api.whatsapp.com/send?phone=919147072827&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!"
                          target="_blank"
                          className="m-r-10"
                        >
                          <img
                            src="https://img.perniaspopupshop.com/pwa-assets/icons/newwhatsapp.png"
                            alt="WhatsApp"
                            style={{ width: "24px", height: "24px" }}
                            className="whatsapp_iko"
                          />
                        </Link>
                        <Link to="/wishlist">
                          {/* <i
                            className="fa-regular fa-heart "
                            style={{ fontSize: "16px", color: "#212121" }}
                          ></i> */}
                           <img  style={{ width: "24px", height: "24px" }} src="https://img.perniaspopupshop.com/ppus-assets/icons/wishlist-grey_06_09_23.svg" alt=""/>
                        </Link>
                      </div>
                    </div>
                  </MobileView>
                )}
                {isMyAccountPage && (
                  <MobileView style={{ width: "100%" }}>
                    <div className="MyAccountMobileHeader layout align-center">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          marginRight: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="https://img.perniaspopupshop.com/pwa-assets/icons/back.svg"
                          alt="Back"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </button>
                      <h4 className="demi-bold m-b-0 h6" style={{width:"100%"}}>MY ACCOUNT</h4>
                      <div
                        className="layout align-center"
                        style={{ marginLeft: "auto", gap: "12px" }}
                      >
                        {userInfo ? (
                          <Link to="/wishlist" style={{ margin: "0px", position: "relative" }}>
                            <img
                              src={Heart}
                              alt="Wishlist"
                              className="IconBtn wishIcon"
                            />
                            {wishlist?.wishlistItems?.length > 0 && (
                              <span className="count bold">
                                {wishlist.wishlistItems.length}
                              </span>
                            )}
                          </Link>
                        ) : (
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setModalShow(true);
                            }}
                          >
                            <img
                              src={Heart}
                              alt="Wishlist"
                              className="IconBtn wishIcon"
                            />
                          </button>
                        )}
                        <Link to="/checkout" style={{ margin: "0px", position: "relative" }}>
                          <img
                            src={Shoppingcart}
                            alt="Cart"
                            className="IconBtn cartIcon"
                          />
                          {cart?.cartTotalQuantity > 0 && (
                            <span className="count bold">
                              {cart.cartTotalQuantity}
                            </span>
                          )}
                        </Link>
                      </div>
                    </div>
                  </MobileView>
                )}
                {isWishlistPage && (
                  <MobileView style={{ width: "100%" }}>
                    <div className="WishlistMobileHeader layout align-center">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          marginRight: "8px",
                          fontSize: "18px",
                          lineHeight: 1,
                          cursor: "pointer",
                          position: "relative",
                          top: "-3px",
                        }}
                      >
                        &#8592;
                      </button>
                      <h4 className="demi-bold m-b-0 h6">
                        MY WISHLIST ({wishlist?.wishlistItems?.length || 0} ITEMS)
                      </h4>
                      <div
                        className="layout align-center"
                        style={{ marginLeft: "auto" }}
                      >
                        <Link to="/checkout" style={{ margin: "0px" }}>
                          <img
                            src={Shoppingcart}
                            alt="Cart"
                            className="IconBtn cartIcon"
                          />
                          {cart?.cartTotalQuantity > 0 && (
                            <span className="count bold">
                              {cart.cartTotalQuantity}
                            </span>
                          )}
                        </Link>
                      </div>
                    </div>
                  </MobileView>
                )}
                {isWishlistPage && (
                  <BrowserView>
                    <div className="Logo cursor-pointer">
                      <img
                        src={Logo}
                        alt="Logo"
                        className="logo-img"
                        onClick={handleLogoClick}
                      />
                    </div>
                  </BrowserView>
                )}
                {isCheckoutFlowPage && (
                  <BrowserView className="desktopcart" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',position:"relative",top:'-15px'}}>
                    <div className="Logo cursor-pointer">
                      {/* <Link to="/"> */}
                      <img
                        src={Logo}
                        alt="Logo"
                        className="logo-img"
                        onClick={handleLogoClick}
                      />
                      {/* </Link> */}
                    </div>
                    <div className="CheckoutInfoBar">
                      <span className="CheckoutInfoItem">
                        <img width="14" height="14" src="https://res.cloudinary.com/dgif730br/image/upload/v1765190286/free-international-shipping-white_xmv1e7.png" alt="aeroplane" />
                        {/* <i className="fa fa-truck" aria-hidden="true"></i> */}
                        FREE SHIPPING*
                      </span>
                      <span className="CheckoutInfoItem">
                        <img width="14" height="14" src="https://res.cloudinary.com/dgif730br/image/upload/v1765190286/Group_bwhmck.png" alt="" />
                        {/* <i className="fa fa-headphones" aria-hidden="true"></i> */}
                        24*7 CUSTOMER SUPPORT
                      </span>
                      <span className="CheckoutInfoItem">
                        {/* <i className="fa fa-refresh" aria-hidden="true"></i> */}
                        <img width="18" height="14" src="https://res.cloudinary.com/dgif730br/image/upload/v1765190286/easy-returns_tyghpt.png" alt="" />
                        EASY EXCHANGE
                      </span>
                      <span className="CheckoutInfoItem">
                        <img width="14" height="14"src="https://res.cloudinary.com/dgif730br/image/upload/v1765190287/call-us_rb8kjc.png" alt="" />
                        {/* <i className="fa fa-phone" aria-hidden="true"></i> */}
                        CALL US AT +91 91470 72827
                      </span>
                    </div>
                    <button className="prel btn-icon p-l-0 p-r-0 btn btn-primary">
                    <Link to="/checkout" style={{ margin: "0px" }}>
                          <img
                            src={Shoppingcart}
                            alt="Cart"
                            className="IconBtn cartIcon"
                          />
                          {cart?.cartTotalQuantity > 0 && (
                            <span className="count bold">
                              {cart.cartTotalQuantity}
                            </span>
                          )}
                        </Link>
                        </button>
                        
                  </BrowserView>
                )}
                <MobileView className="homeFart">
                  {!isCampaignPage && !isProductDetailsPage && !isOrderHistoryPage && !isManageAddressPage && (
                   
                      <div className="flex layout align-center Actions">
                      {/* Mobile: only user & cart as per Pernia-style header */}
                      {!isCheckoutPage && userInfo ? (
                        <Button
                          className="prel btn-icon p-l-0 p-r-0 d-lg-none d-sm-block"
                          style={{ background: "none" }}
                        >
                          <Link to="/myaccount" style={{ margin: "0px" }}>
                            <img
                              src={User}
                              alt="My Account"
                              className="IconBtn user-icon"
                            />
                          </Link>
                        </Button>
                      ) : !isCheckoutPage ? (
                        <Button
                          className="prel btn-icon p-l-0 p-r-0"
                          style={{ background: "none" }}
                          onClick={() => setModalShow(true)}
                        >
                          <img
                            src={User}
                            alt="Login"
                            className="IconBtn user-icon"
                          />
                        </Button>
                      ) : null}
                      {!isCheckoutPage && (
                        <Button
                          className="prel btn-icon p-l-0 p-r-0"
                          style={{ background: "none" }}
                        >
                          <Link to="/checkout" style={{ margin: "0px" }}>
                            <img
                              src={Shoppingcart}
                              alt="Cart"
                              className="IconBtn cartIcon"
                            />
                            {cart?.cartTotalQuantity > 0 && (
                              <span className="count bold">
                                {cart.cartTotalQuantity}
                              </span>
                            )}
                          </Link>
                        </Button>
                      )}
                      </div>
                    
                  )}
                </MobileView>
                <BrowserView style={{display:'flex',alignItems:"center"}}>
                  <div className="flex layout align-center Actions">
                    {!isCheckoutFlowPage && (
                      <Button
                        className="prel btn-icon p-l-0 p-r-0"
                        style={{ background: "none" }}
                        onClick={() => handleShow(true)}
                      >
                        <img
                          src={Search}
                          alt="Search"
                          className="IconBtn SearchImg"
                        />
                      </Button>
                    )}
                    {!isCheckoutFlowPage && !isWishlistPage && (
                      <>
                        {userInfo ? (
                          <Button
                            className="prel btn-icon p-l-0 p-r-0 d-block"
                            style={{ background: "none" }}
                          >
                            <Link to="/wishlist" style={{ margin: "0px" }}>
                              <img
                                src={Heart}
                                alt="Wishlist"
                                className="IconBtn wishIcon"
                              />
                              {wishlist?.wishlistItems?.length > 0 && (
                                <span className="count bold">
                                  {wishlist.wishlistItems.length}
                                </span>
                              )}
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            className="prel btn-icon p-l-0 p-r-0"
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setModalShow(true);
                            }}
                          >
                            <img
                              src={Heart}
                              alt="Wishlist"
                              className="IconBtn wishIcon"
                            />
                          </Button>
                        )}
                      </>
                    )}
                    {!isCheckoutFlowPage && userInfo ? (
                      <Button
                        className="prel btn-icon p-l-0 p-r-0"
                        style={{ background: "none" }}
                      >
                        <Link to="/myaccount" style={{ margin: "0px" }}>
                          <img
                            src={User}
                            alt="My Account"
                            className="IconBtn user-icon"
                          />
                        </Link>
                      </Button>
                    ) : !isCheckoutFlowPage ? (
                      <Button
                        className="prel btn-icon p-l-0 p-r-0"
                        style={{ background: "none" }}
                        onClick={() => setModalShow(true)}
                      >
                        <img
                          src={User}
                          alt="Login"
                          className="IconBtn user-icon"
                        />
                      </Button>
                    ) : null}
                    {!isCheckoutFlowPage && (
                      <Button
                        className="prel btn-icon p-l-0 p-r-0"
                        style={{ background: "none" }}
                      >
                        <Link to="/checkout" style={{ margin: "0px" }}>
                          <img
                            src={Shoppingcart}
                            alt="Cart"
                            className="IconBtn cartIcon"
                          />
                          {cart?.cartTotalQuantity > 0 && (
                            <span className="count bold">
                              {cart.cartTotalQuantity}
                            </span>
                          )}
                        </Link>
                      </Button>
                    )}
                  </div>
                </BrowserView>
                <div className="search_model">
                  <Modal
                    className="App"
                    show={show}
                    fullscreen={fullscreen}
                    onHide={searchHide}
                  >
                    <div className="container-inn">
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <MDBInputGroup>
                            <div style={{ position: 'relative', flex: 1 }}>
                              <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                                className="search-icon-permanent"
                                style={{ 
                                  position: 'absolute', 
                                  left: '16px', 
                                  top: '50%', 
                                  transform: 'translateY(-50%)',
                                  zIndex: 10,
                                  pointerEvents: 'none',
                                  display: 'block',
                                  visibility: 'visible',
                                  opacity: 1
                                }}
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path d="M0 0h24v24H0z"/>
                                  <path stroke="#757575" strokeWidth="1.5" strokeLinecap="round" d="m14.436 14.434 4.314 4.316"/>
                                  <circle stroke="#757575" strokeWidth="1.5" cx="10.5" cy="10.5" r="5.25"/>
                                </g>
                              </svg>
                              <MDBInput
                                inputRef={searchInputRef}
                                autoFocus
                                placeholder="Search for designers, products and categories"
                                name="search"
                                value={searchVal}
                                onChange={(e) =>
                                  getSearchDetails(e.target.value)
                                }
                                style={{ paddingLeft: '48px' }}
                              />
                            </div>
                            <label htmlFor="image-search-input" style={{ margin: 0, cursor: 'pointer' }}>
                              <input
                                type="file"
                                id="image-search-input"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  // Handle image upload here
                                  if (e.target.files && e.target.files[0]) {
                                    console.log('Image selected:', e.target.files[0]);
                                    // Add your image search logic here
                                  }
                                }}
                              />
                              <span 
                                className="image-search-button"
                                // style={{ marginLeft: '12px' }}
                                onClick={() => document.getElementById('image-search-input').click()}
                              >
                                <svg 
                                  width="24" 
                                  height="24" 
                                  viewBox="0 0 24 24" 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="camera-icon-svg"
                                  style={{ 
                                    marginRight: '10px', 
                                    display: 'inline-block', 
                                    verticalAlign: 'middle',
                                    visibility: 'visible',
                                    opacity: 1,
                                    width: '24px',
                                    height: '24px',
                                    flexShrink: 0
                                  }}
                                >
                                  <g fill="none" fillRule="evenodd">
                                    <rect width="24" height="24" rx="6"/>
                                    <path d="M14 5c1 0 1.667.833 2 2.5h3a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1h3c.332-1.667.998-2.5 2-2.5h4z" stroke="#FFF" strokeLinejoin="round" strokeWidth="1"/>
                                    <circle stroke="#FFF" cx="12" cy="12.25" r="2.5" strokeWidth="1"/>
                                  </g>
                                </svg>
                                <span>Image Search</span>
                              </span>
                            </label>
                          </MDBInputGroup>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="SearchCampaignScroller">
                          {menuArr && menuArr.length > 0 ? (
                            <div className="SearchCampaignTabs">
                              {menuArr.map((data, index) => {
                                const menuUrl = `/category/?campaign=${data.campaign.id}`;
                                const thumb = resolveCampaignThumb(
                                  data.campaign,
                                  data.random_products
                                );
                                return (
                                  <Link
                                    key={`${data.campaign.id}-${index}`}
                                    to={menuUrl}
                                    className="SearchCampaignTab"
                                    onClick={searchHide}
                                  >
                                    {thumb ? (
                                      <span className="search-campaign-thumb">
                                        <img
                                          src={resolveAssetUrl(thumb)}
                                          alt={data.campaign.campaign_title}
                                        />
                                      </span>
                                    ) : null}
                                    <span className="search-campaign-label">
                                      {data.campaign.campaign_title}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="SearchCampaignFallback">
                              <CategoryImgList />
                            </div>
                          )}
                        </div>
                        {(searchVal && searchproducts.length > 0) ? (
                          <Seacrhproducts
                            searchHide={searchHide}
                            searchvalue={searchVal}
                            searchlist={searchproducts}
                            closeModal={closeModal}
                          />
                        ) : (
                          <>
                            <Browse
                              showTrending={false}
                              onViewAllClick={searchHide}
                              onCategoryClick={searchHide}
                            />

                            {searchHistory && searchHistory.length > 0 && (
                              <div>
                              <div className="SearchHistorySection">
                                <div className="SearchHistoryHeader">
                                  <h5 className="demi-bold">SEARCH HISTORY</h5>
                                  <button
                                    type="button"
                                    className="SearchHistoryClear p3 demi-bold"
                                    onClick={handleClearHistory}
                                  >
                                    CLEAR ALL
                                  </button>
                                </div>
                                <div className="SearchHistoryList">
                                  {searchHistory.map((term, index) => (
                                    <button
                                      key={`${term}-${index}`}
                                      type="button"
                                      className="SearchHistoryChip p3"
                                      onClick={() => handleHistoryClick(term)}
                                    >
                                      {term}
                                      <span className="chip-close">×</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              </div>
                            )}

                            <Recently showrecentviewed={true} className="SearchModalRecently" />
                            <Trending />
                          </>
                        )}
                      </Modal.Body>
                    </div>
                  </Modal>
                </div>
              </div>
             <BrowserView>
              <div className="desktop_menu">
                <div className="flex layout justify-center Menu">
                  {menuArr?.map((data, index) => {
                    const menuUrl = `/category/?campaign=${data.campaign.id}`;
                    const campaignId = data.campaign.id.toString();
                    const currentCampaign = searchParamsc.get('campaign');
                    // Check if current URL matches this menu item
                    // Handle both /category and /category/ paths
                    const isCategoryPage = location.pathname === '/category' || location.pathname === '/category/';
                    const isActive = isCategoryPage && 
                      currentCampaign && 
                      (currentCampaign === campaignId || 
                       currentCampaign === String(data.campaign.id) ||
                       String(currentCampaign) === String(campaignId) ||
                       Number(currentCampaign) === Number(data.campaign.id));
                    const isHovered = hoveredMenuId === data.campaign.id;
                    
                    return (
                    <div
                      className="cursor-pointer MenuItem"
                      key={index}
                      onMouseEnter={() => setHoveredMenuId(data.campaign.id)}
                      onMouseLeave={() => setHoveredMenuId(null)}
                    >
                      <Link
                        to={menuUrl}
                        className={`p4 menu-link ${isHovered ? "MainMenuLink" : ""
                          } ${isActive ? "active-menu-link" : ""
                          }`}
                          onClick={() => setHoveredMenuId(null)}
                          style={isActive ? { color: '#e83647' } : {}}
                      >
                        <div className={`prel layout align-center`}>
                          <span style={isActive ? { color: '#e83647' } : {}}>{data.campaign.campaign_title}</span>
                        </div>
                      </Link>
                      <div
                        className={`showSubMenuContent mega-dropdown ${hoveredMenuId === data.campaign.id ? "visible" : ""
                          }`}
                      >
                        <div className="layout full-height BreakPointContainer">
                          <div className="row w-100">
                            {data?.occasions?.length > 0 && (
                              <div className="flex xs2 layout column">
                                <h4>
                                  <span className="prel">Shop By Occasion</span>
                                </h4>
                                {data.occasions.slice(0, 14).map((occasion, index) => (
                                  <div className="m-b-5" key={index}>
                                    <Link
                                      to={`/category/?occasion_id=${occasion.id}`}
                                      className="prel"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>{occasion.title}</span>
                                    </Link>
                                  </div>
                                ))}
                                {data.occasions.length > 14 && (
                                  <div className="mt-3">
                                    <Link
                                      to="/category/?occasion_id=all"
                                      className="SellAllLink demi-bold"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>SEE ALL</span>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )}
                            {data?.categories?.length > 0 && (
                              <div className="flex xs2 layout column">
                                <h4>
                                  <span className="prel">Shop By Category</span>
                                </h4>
                                {data.categories.slice(0, 14).map((category, index) => (
                                  <div className="m-b-5" key={index}>
                                    <Link
                                      to={`/category/?category_ids=${category.id}`}
                                      className="prel"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>{category.title}</span>
                                    </Link>
                                  </div>
                                ))}
                                {data.categories.length > 14 && (
                                  <div className="mt-3">
                                    <Link
                                      to="/category/?category_id=all"
                                      className="SellAllLink demi-bold"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>SEE ALL</span>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )}
                            {data?.styles?.length > 0 && (
                              <div className="flex xs2 layout column">
                                <h4>
                                  <span className="prel">Shop By Style</span>
                                </h4>
                                {data.styles.slice(0, 14).map((style, index) => (
                                  <div className="m-b-5" key={index}>
                                    <Link
                                      to={`/category/?style_id=${style.id}`}
                                      className="prel"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>{style.title}</span>
                                    </Link>
                                  </div>
                                ))}
                                {data.styles.length > 14 && (
                                  <div className="mt-3">
                                    <Link
                                      to="/category/?style_id=all"
                                      className="SellAllLink demi-bold"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>SEE ALL</span>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )}
                            {data?.fabrics?.length > 0 && (
                              <div className="flex xs2 layout column">
                                <h4>
                                  <span className="prel">Shop By Fabric</span>
                                </h4>
                                {data.fabrics.slice(0, 14).map((fabric, index) => (
                                  <div className="m-b-5" key={index}>
                                    <Link
                                      to={`/category/?fabric_id=${fabric.id}`}
                                      className="prel"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>{fabric.title}</span>
                                    </Link>
                                  </div>
                                ))}
                                {data.fabrics.length > 14 && (
                                  <div className="mt-3">
                                    <Link
                                      to="/category/?fabric_id=all"
                                      className="SellAllLink demi-bold"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>SEE ALL</span>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )}
                            {data?.patterns?.length > 0 && (
                              <div className="flex xs2 layout column">
                                <h4>
                                  <span className="prel">Shop By Pattern</span>
                                </h4>
                                {data.patterns.slice(0, 14).map((pattern, index) => (
                                  <div className="m-b-5" key={index}>
                                    <Link
                                      to={`/category/?pattern_id=${pattern.id}`}
                                      className="prel"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>{pattern.title}</span>
                                    </Link>
                                  </div>
                                ))}
                                {data.patterns.length > 14 && (
                                  <div className="mt-3">
                                    <Link
                                      to="/category/?pattern_id=all"
                                      className="SellAllLink demi-bold"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>SEE ALL</span>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )}
                            {data?.edits?.length > 0 && (
                              <div className="flex xs2 layout column">
                                <h4>
                                  <span className="prel">Shop By Edits</span>
                                </h4>
                                {data.edits.slice(0, 14).map((edit, index) => (
                                  <div className="m-b-5" key={index}>
                                    <Link
                                      to={`/category/?edit_id=${edit.id}`}
                                      className="prel"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>{edit.title}</span>
                                    </Link>
                                  </div>
                                ))}
                                {data.edits.length > 14 && (
                                  <div className="mt-3">
                                    <Link
                                      to="/category/?edit_id=all"
                                      className="SellAllLink demi-bold"
                                      onClick={() => setHoveredMenuId(null)}
                                    >
                                      <span>SEE ALL</span>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )}
                            {data?.random_products?.length > 0 && (() => {
                              // Count how many sections exist (occasions, categories, styles, fabrics, patterns, edits)
                              const hasOccasions = data?.occasions && data.occasions.length > 0;
                              const hasCategories = data?.categories && data.categories.length > 0;
                              const hasStyles = data?.styles && data.styles.length > 0;
                              const hasFabrics = data?.fabrics && data.fabrics.length > 0;
                              const hasPatterns = data?.patterns && data.patterns.length > 0;
                              const hasEdits = data?.edits && data.edits.length > 0;
                              
                              const sectionsCount = [hasOccasions, hasCategories, hasStyles, hasFabrics, hasPatterns, hasEdits].filter(Boolean).length;
                              
                              // 5 products if sections exist (like "SHOP BY EDITS" sidebar), 6 products if no sections
                              const productLimit = sectionsCount > 0 ? 5 : 6;
                              
                              // Debug log to check API response
                              console.log('Header hover panel debug:', { 
                                sectionsCount, 
                                productLimit, 
                                availableProducts: data.random_products.length,
                                hasOccasions,
                                hasCategories,
                                hasStyles,
                                hasFabrics,
                                hasPatterns,
                                hasEdits,
                                randomProducts: data.random_products
                              });
                              
                              return data.random_products
                                .slice(0, productLimit)
                                .map((product, index) => (
                                  <div
                                    className="Product flex xs2 offset-xs0"
                                    key={index}
                                  >
                                    <div className="layout column">
                                      <Link
                                        to={`/products/productdetails/${product.id}`}
                                        className="flex ProductImage"
                                        onClick={() => setHoveredMenuId(null)}
                                      >
                                        <div
                                          className="DynamicHeightLoaderWrapper"
                                          style={{ paddingTop: "150%" }}
                                        >
                                          <div className="DynamicHeightLoader layout row align-center justify-center">
                                            <img
                                              src={product.product_thumbail}
                                              alt={product.product_title}
                                              className="img-resp DynamicHeightLoaderImage"
                                            />
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="ProductImageDetail">
                                        <h4 className="ellipsis demi-bold">
                                          {product.product_title}
                                        </h4>
                                        <p className="ellipsis-two-line">
                                          {product.product_short_description}
                                        </p>
                                        <div className="ProductPrice layout d-inline">
                                          <span className="SpecialPrice p2 demi-bold">
                                            <i
                                              className="fa fa-inr"
                                              style={{ fontSize: "13px" }}
                                            ></i>{" "}
                                            {formatPrice((product?.saleprice > 0
                                              ? product.saleprice
                                              : product.price), { showSymbol: false })}
                                          </span>
                                          {product?.discount_amount > 0 && (
                                            <span className="InitialPrice p3">
                                              <i
                                                className="fa fa-inr"
                                                style={{ fontSize: "13px" }}
                                              ></i>
                                              {formatPrice(product.price, { showSymbol: false })}
                                            </span>
                                          )}
                                          {product?.discount_amount > 0 && (
                                            <span className="DiscountPriceRound p3">
                                              {product?.discount_type === "flat"
                                                ? `${product.discount_amount} FLAT OFF`
                                                : product?.discount_type ===
                                                  "percentage"
                                                  ? `${product.discount_amount}% OFF`
                                                  : ""}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ));
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            </BrowserView>
            {/* <MobileView> */}
            <div className="mobile_menu">
              <div
                className={`flex layout justify-center Menu ${isOpen ? "active" : ""
                  }`}
              >
                <div className="mobile-menu-close-btn" onClick={toggleNavbar}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
                {menuArr.map((data, index) => {
                  const menuUrl = `/category/?campaign=${data.campaign.id}`;
                  return (
                  <div
                    className={`cursor-pointer MenuItem ${index === 0 ? "start" : ""
                      }`}
                    key={index}
                  >
                    <Link
                      to={menuUrl}
                      className="p4"
                      onClick={(e) => {
                        // If clicking on chevron icon, toggle dropdown instead of navigating
                        if (e.target.closest('.dropdown-icon') || e.target.classList.contains('dropdown-icon')) {
                          e.preventDefault();
                          showSubmenuMobile(data.campaign.id);
                        } else {
                          // Navigate and close menu
                          setIsOpen(false);
                          setMobileCampaignVisible(null);
                        }
                      }}
                    >
                      <div className="prel layout align-center justify-content-between">
                        <span>{data.campaign.campaign_title}</span>
                        <i
                          className={`fa-solid fa-chevron-down dropdown-icon ${mobileCampaignId === data.campaign.id
                              ? "active"
                              : ""
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            showSubmenuMobile(data.campaign.id);
                          }}
                          style={{ cursor: 'pointer' }}
                        ></i>
                      </div>
                    </Link>
                    {mobileCampaignId === data.campaign.id && (
                      <div className="menu-dropdown">
                        <div className="full-height BreakPointContainer">
                          {data?.occasions?.length > 0 && (
                            <div className="menu-div">
                              <h4>
                                <span className="prel">Shop By Occasion</span>
                              </h4>
                              {data.occasions.slice(0, 14).map((occasion, index) => (
                                <div className="m-b-5" key={index}>
                                  <a
                                    href={`/category/?occasion_id=${occasion.id}`}
                                    className="prel"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>{occasion.title}</span>
                                  </a>
                                </div>
                              ))}
                              {data.occasions.length > 14 && (
                                <div className="mt-3">
                                  <a
                                    href="/category/?occasion_id=all"
                                    className="SellAllLink demi-bold"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>SEE ALL</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                          {data?.categories?.length > 0 && (
                            <div className="menu-div">
                              <h4>
                                <span className="prel">Shop By Category</span>
                              </h4>
                              {data.categories.slice(0, 14).map((category, index) => (
                                <div className="m-b-5" key={index}>
                                  <a
                                    href={`/category/?category_id=${category.id}`}
                                    className="prel"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>{category.title}</span>
                                  </a>
                                </div>
                              ))}
                              {data.categories.length > 14 && (
                                <div className="mt-3">
                                  <a
                                    href="/category/?category_id=all"
                                    className="SellAllLink demi-bold"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>SEE ALL</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                          {data?.styles?.length > 0 && (
                            <div className="menu-div">
                              <h4>
                                <span className="prel">Shop By Style</span>
                              </h4>
                              {data.styles.slice(0, 14).map((style, index) => (
                                <div className="m-b-5" key={index}>
                                  <a
                                    href={`/category/?style_id=${style.id}`}
                                    className="prel"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>{style.title}</span>
                                  </a>
                                </div>
                              ))}
                              {data.styles.length > 14 && (
                                <div className="mt-3">
                                  <a
                                    href="/category/?style_id=all"
                                    className="SellAllLink demi-bold"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>SEE ALL</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                          {data?.fabrics?.length > 0 && (
                            <div className="menu-div">
                              <h4>
                                <span className="prel">Shop By Fabric</span>
                              </h4>
                              {data.fabrics.slice(0, 14).map((fabric, index) => (
                                <div className="m-b-5" key={index}>
                                  <a
                                    href={`/category/?fabric_id=${fabric.id}`}
                                    className="prel"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>{fabric.title}</span>
                                  </a>
                                </div>
                              ))}
                              {data.fabrics.length > 14 && (
                                <div className="mt-3">
                                  <a
                                    href="/category/?fabric_id=all"
                                    className="SellAllLink demi-bold"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>SEE ALL</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                          {data?.patterns?.length > 0 && (
                            <div className="menu-div">
                              <h4>
                                <span className="prel">Shop By Pattern</span>
                              </h4>
                              {data.patterns.slice(0, 14).map((pattern, index) => (
                                <div className="m-b-5" key={index}>
                                  <a
                                    href={`/category/?pattern_id=${pattern.id}`}
                                    className="prel"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>{pattern.title}</span>
                                  </a>
                                </div>
                              ))}
                              {data.patterns.length > 14 && (
                                <div className="mt-3">
                                  <a
                                    href="/category/?pattern_id=all"
                                    className="SellAllLink demi-bold"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>SEE ALL</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                          {data?.edits?.length > 0 && (
                            <div className="menu-div">
                              <h4>
                                <span className="prel">Shop By Edits</span>
                              </h4>
                              {data.edits.slice(0, 14).map((edit, index) => (
                                <div className="m-b-5" key={index}>
                                  <a
                                    href={`/category/?edit_id=${edit.id}`}
                                    className="prel"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>{edit.title}</span>
                                  </a>
                                </div>
                              ))}
                              {data.edits.length > 14 && (
                                <div className="mt-3">
                                  <a
                                    href="/category/?edit_id=all"
                                    className="SellAllLink demi-bold"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>SEE ALL</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>
            {/* </MobileView> */}
          </div>
        </div>
      </header>
      {isHomePage && (
        <MobileView>
          <div className="HomeMobileCampaigns">
            <div className="HomeCampaignTabs">
              {menuArr?.map((data, index) => {
                const menuUrl = `/category/?campaign=${data.campaign.id}`;
                const thumb = resolveCampaignThumb(
                  data.campaign,
                  data.random_products
                );
                return (
                  <Link
                    key={data.campaign.id || index}
                    to={menuUrl}
                    className="home-campaign-tab"
                  >
                    {thumb && (
                      <span className="home-campaign-thumb">
                        <img
                          src={resolveAssetUrl(thumb)}
                          alt={data.campaign.campaign_title}
                        />
                      </span>
                    )}
                    <span className="home-campaign-label">
                      {data.campaign.campaign_title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </MobileView>
      )}
      <LoginModal showModal={modalShow} modalHide={modalHide} />
    </div>
  );
}

export default Header;
