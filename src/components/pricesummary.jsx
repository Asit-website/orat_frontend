import React , { useState }from 'react';
import { Link } from 'react-router-dom';
import { Loyalty } from '../image';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from '../Redux/features/Cart/CartSlice';
import { getTotalDiscount } from '../services/User-service';
function Pricesummary() {
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [totalAmount, settotalAmount] = useState();
  const [totalPrice, settotalPrice] = useState();
  const [totalDiscount, settotalDiscount] = useState();
  useEffect(() => {
    dispatch(getTotals());
  }, []);



 

  const gettotaldiscount = () => {
    const userDetailsd = {
        user_id: userInfo?.data?.user?.id,
        carts:cart
    }
    getTotalDiscount(userDetailsd)
        .then((data) => {
         
          settotalAmount(data.total_amount);
          settotalDiscount(data.total_discount);
          settotalPrice(data.total_price);
            setLoading(false);

        })
        .catch((error) => {
            console.error("Error fetching wishlist list:", error);
            setLoading(false);
        });
};
  useEffect(() => {
    gettotaldiscount();
}, [])
  return (
    <div>
      <div className="CartWrapperContentRightContent">
        <h4>CART SUMMARY</h4>
        <div className="CartSummary">
          <div className="CartTotal bold">
            <span>Cart Total</span>
            <span className="float-right"><i className="fa fa-inr" style={{ fontSize:'13px'}}></i>{totalPrice}</span>
          </div>
          <div className="Shipping bold layout justify-space-between">
            <span><p>Total Discount</p></span>
            <span className="float-right">(-) <i className="fa fa-inr" style={{ fontSize:'13px'}}></i>{totalDiscount}</span>
          </div>
          <div className="Shipping bold m-b-0">
            <span>Shipping</span>
            <span className="float-right"><i className="fa fa-inr" style={{ fontSize:'13px'}}></i>0</span>
          </div>
          <p className="h7 demi-bold">Shipping charges to be calculated on Checkout</p>
        </div>
        <div className="LoyaltyEarnPoints layout align-center">
          <img src={Loyalty} alt='logo' />
          <p>You are earning <span className="bold">18490 Points</span> on this transaction</p>
        </div>
        <div className="LoyaltyEarnPoints m-t-10 m-b-10 layout align-center">
          <div className="PslCheckbox flex">
            <label>
              <input type="checkbox" className="PslCheckboxInput" />
              <span className="PslCheckboxCheckmark"></span>
              <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">This is a gift item</span>
            </label>
          </div>
          <Link href="" className='font-normal h6 cursor-pointer'> (Know More) </Link>
        </div>
        <div className="PromoCodeWrapper">
          <h4>COUPON CODE</h4>
          <div className="ApplyPromoCode m-b-25">
            <div className="layout">
              <input type='text' placeholder="Enter Coupon Code" />
              <button type="button" className="btn-orat-primary bold">APPLY</button>
            </div>
          </div>
        </div>
        <div className="TotalWrapper">
          <span className="Total bold">TOTAL PAYABLE</span>
          <span className="float-right ex-bold TotalAmount"><i className="fa fa-inr" style={{ fontSize:'13px'}}></i>{totalAmount}</span>
        </div>
        <div className="Buttons">
          <Link to="/address"> <button className="btn-orat-primary bold">  PROCEED TO CHECKOUT </button> </Link>
          <Link to="/"> <button className="btn-orat-secondry bold">CONTINUE SHOPPING</button> </Link>
        </div>
      </div>
    </div>
  )
}

export default Pricesummary