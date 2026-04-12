// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../src/css/style.css';
import '../src/css/font.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import Home from './pages/home';
import Category from './pages/category';
import Designers from './pages/designers';
import Checkout from './pages/checkout';
import Address from './pages/address';
import Payment from './pages/payment';
import Myaccount from './pages/myaccount';
import Orderhistory from './pages/orderhistory';
import Addaddress from './pages/addaddress';
import Credits from './pages/credits';
import Wishlist from './pages/wishlist';
import Settings from './pages/settings';
import Giftcards from './pages/giftcards';
import Mobilefooter from '../src/components/mobilefooter';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import BestSellers from './pages/BestSellers';
import GiftcardsDetails from './pages/GiftcardsDetails';
import ShippingInformation from './pages/cms/ShippingInformation';
import TermsCondition from './pages/cms/TermsCondition';
import ReturnExchange from './pages/cms/ReturnExchange';
import PrivacyPolicy from './pages/cms/PrivacyPolicy';
import Faq from './pages/cms/Faq';
import AboutUs from './pages/cms/AboutUs';
import HowToShop from './pages/cms/HowToShop';
import Contact from './pages/cms/Contact';
import OrderThankYou from './pages/OrderThankYou';
import BookAppointment from './pages/BookAppointment';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import PersonalDetails from './pages/PersonalDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevKeyRef = useRef(null);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey) {
      try {
        sessionStorage.setItem(`scroll:${prevKey}`, String(window.scrollY || 0));
      } catch (e) {
        // ignore
      }
    }

    const nextKey = location.key;
    prevKeyRef.current = nextKey;

    if (navigationType === 'POP') {
      let y = 0;
      try {
        const raw = sessionStorage.getItem(`scroll:${nextKey}`);
        y = raw ? parseInt(raw, 10) : 0;
      } catch (e) {
        y = 0;
      }
      window.scrollTo({ top: Number.isFinite(y) ? y : 0, left: 0, behavior: 'auto' });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.key, navigationType]);

  return null;
}

function App() {
  return (
        <Router basename="/">
        <ScrollToTop />
        <Header />
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable={false}
        pauseOnHover={false}
        toastStyle={{ background: '#000000', color: '#ffffff', borderRadius: '4px' }}
      />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/designers" element={<Designers />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/singleproduct/:id" element={<ProductDetails />} /> */}
        <Route path="/products/productdetails/:id" element={<ProductDetails />} />
        <Route path="/giftdetails/:id" element={<GiftcardsDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/myaccount" element={<Myaccount />} />
        <Route path="/orderhistory" element={<Orderhistory />} />
        <Route path="/addaddress" element={<Addaddress />} />
        <Route path="/best-sellers" element={<BestSellers />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/giftcards" element={<Giftcards />} />   
        <Route path="/shipping-information" element={<ShippingInformation />} /> 
        <Route path="/how-to-shop" element={<HowToShop />} /> 
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/return-and-exchange" element={<ReturnExchange />} />   
        <Route path="/terms-and-conditions" element={<TermsCondition />} />   
        <Route path="/privacy-cookie-policy" element={<PrivacyPolicy />} />   
        <Route path="/faqs" element={<Faq />} />  
        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/book-appointment" element={<BookAppointment />} /> 
        <Route path="/ordersuccess/:id" element={<OrderThankYou />} /> 
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogdetails/:id" element={<BlogDetails />} /> 
        <Route path="/personalDetails" element={<PersonalDetails />} /> 
       
      </Routes>
      <MobileFooterWrapper />
     
    </Router>
    
  );
}

function MobileFooterWrapper() {
  const location = useLocation();
  const pathname = location?.pathname || "";
  const hide =
    pathname.startsWith("/products/productdetails") ||
    pathname.startsWith("/wishlist");
  return hide ? null : <Mobilefooter />;
}

export default App;
