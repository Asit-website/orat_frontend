import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Razorpay } from "../image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromCart,
  updatecartCount,
} from "../Redux/features/Cart/CartSlice";
import {
  addToWishList,
  removeFromWishList,
} from "../Redux/features/wishlist/WishListSlice";
import { formatPrice } from "../utils/formatPrice";
import {
  addWishList,
  getallWishList,
  removeWishList,
  getAllCart,
  removeCart,
} from "../services/User-service";
import { toast } from "react-toastify";
function ShoppingCart() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [wishlisticon, setwishlisticon] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBtnId, setSelectedBtnId] = useState([]);
  const [cartArr, setCartdetails] = useState([]);
  const [selectedSizeId, setSelectedeSizeId] = useState(-1);
  const toggleDropdown1 = (varientID) => {
    setDropdownVisible(!isDropdownVisible);
    setSelectedeSizeId(varientID);
  };
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();
  const handlewishlist = (cartItem) => {
    setLoading(true);
    const userDetails = {
      product_id: cartItem?.id,
      user_id: userInfo?.data?.user?.id,
    };

    addWishList(userDetails)
      .then((data) => {
        if (data.status) {
          setLoading(false);
          setwishlisticon(true);
          dispatch(addToWishList(cartItem));
          selectedBtnId.push(cartItem.id);
          toast.success(data.message, {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        if (error) {
          setLoading(false);
          console.log("Add wishlist error:", error);
        }
      });
  };
  const removewishlist = (cartItem) => {
    setLoading(true);
    const userDetails = {
      product_id: cartItem?.id,
      user_id: userInfo?.data?.user?.id,
    };

    removeWishList(userDetails)
      .then((data) => {
        if (data.status) {
          setLoading(false);
          setwishlisticon(false);
          const newWishlistd = selectedBtnId.filter(
            (product) => product !== cartItem.id
          );
          setSelectedBtnId(newWishlistd);
          dispatch(removeFromWishList(cartItem));
          toast.success(data.message, {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        if (error) {
          setLoading(false);
          console.log("Remove wishlist error:", error);
        }
      });
  };

  const handleRemoveFromCart = (product) => {
    const ok = window.confirm("Are you sure you want to remove this item from your cart?");
    if (!ok) {
      return;
    }

    setLoading(true);
    const userDetails = {
      product_id: product?.id,
      user_id: userInfo?.data?.user?.id,
    };

    removeCart(userDetails)
      .then((data) => {
        if (data.status) {
          setLoading(false);
          dispatch(removeFromCart(product));
          toast.success(data.message, {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        if (error) {
          setLoading(false);
          console.log("Remove cart error:", error);
        }
      });
  };

  const getwishlistList = () => {
    const userDetailsd = {
      user_id: userInfo?.data?.user?.id,
    };
    getallWishList(userDetailsd)
      .then((data) => {
        setSelectedBtnId(data.productsList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wishlist list:", error);
        setLoading(false);
      });
  };
  const getallCartList = () => {
    const userDetailsd = {
      user_id: userInfo?.data?.user?.id,
      carts: cart,
    };
    getAllCart(userDetailsd)
      .then((data) => {
        setCartdetails(data.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching carts list:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getallCartList();
  }, []);
  useEffect(() => {
    if (userInfo) {
      getwishlistList();
    }
  }, []);

  return (
    <>
      <div>
        <div>
          <h4>YOUR SHOPPING CART</h4>
          <ul className="list-unstyled p-l-0 m-t-0 CartItemWrapper">
            {cartArr &&
              cartArr.map((cartItem) => (
                <li className="CartItem" key={cartItem.id}>
                  <div className="layout row">
                    <div className="layout row">
                      <div className="ProductImage xs2 sm2 flex prel">
                        <Link to={`/products/productdetails/${cartItem.id}`}>
                          <img
                            src={cartItem.cover_image}
                            alt={cartItem.product_title}
                            className="overflow-hidden p4"
                          />
                        </Link>
                      </div>
                      <div className="ProductDetails xs5 sm5 flex">
                        <div className="Brand text-uppercase bold">
                          {cartItem.product_title}
                        </div>
                        <div className="Name bold">
                          {cartItem.product_short_description}
                        </div>
                        <div className="Code m-t-10 bold">
                          CODE: AAOC0722147
                        </div>
                        <div className="dd-wrapper plainDropdown cartItemSizes">
                          <div
                            className="dd-header"
                            onClick={() => toggleDropdown1(cartItem.envpriceid)}
                          >
                            <div className="dd-header-sort-text cartItemSizesHeader demi-bold">
                              {" "}
                              Size: {cartItem.size || "Select"}{" "}
                            </div>
                            <span
                              className={`arrow-icon m-r-5 ${
                                selectedSizeId == cartItem.envpriceid &&
                                isDropdownVisible
                                  ? "arrow-down-icon"
                                  : "arrow-up-icon"
                              }`}
                            ></span>
                          </div>
                          {selectedSizeId == cartItem.envpriceid &&
                            isDropdownVisible && (
                              <ul className="dd-list bold">
                                {Array.isArray(cartItem.productvariants) &&
                                cartItem.productvariants.length > 0 ? (
                                  cartItem.productvariants.map(
                                    (data, index) => (
                                      <li
                                        className="dd-list-item font-normal"
                                        key={index}
                                      >
                                        {data?.size}
                                      </li>
                                    )
                                  )
                                ) : (
                                  <li className="dd-list-item font-normal disabled">
                                    Size options unavailable
                                  </li>
                                )}
                              </ul>
                            )}
                        </div>
                        <div className="Code m-t-10 bold text-uppercase">
                          estimated shipping date :
                          <span className="text-underline">25th of April</span>
                        </div>
                      </div>
                      <div className="ProductPricing xs5 sm5 flex text-right layout column justify-space-between">
                        <div>
                          <div className="layout align-center justify-end">
                            <div className="Discount bold m-r-8">
                              {cartItem.discount_type == "flat"
                                ? `${cartItem.discount_amount} FLAT OFF`
                                : ""}
                              {cartItem.discount_type == "percentage"
                                ? `${cartItem.discount_amount}% OFF`
                                : ""}
                            </div>
                            <div className="ActualPrice m-l-0 m-r-8">
                              <i
                                className="fa fa-inr"
                                style={{ fontSize: "13px" }}
                              ></i>
                              {formatPrice(cartItem.price, { showSymbol: false })}{" "}
                            </div>
                            <div className="DiscountedPrice bold m-l-0">
                              <i
                                className="fa fa-inr"
                                style={{ fontSize: "13px" }}
                              ></i>
                              {formatPrice(cartItem.saleprice, { showSymbol: false })}{" "}
                            </div>
                          </div>
                          <div className="layout align-center justify-end">
                            <div>
                              <div className="LoyaltyPoints bold layout align-center">
                                <span>EARN 9245 POINTS</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                        <div className="ActionButton">
                          <span className="Wishlist">
                            {selectedBtnId.includes(cartItem.id) ? (
                              <button
                                className=" btn-icon ProductToWishlist flex "
                                onClick={() => removewishlist(cartItem)}
                              >
                                <FaHeart />
                              </button>
                            ) : (
                              <button
                                className=" btn-icon ProductToWishlist flex "
                                onClick={() => handlewishlist(cartItem)}
                              >
                                <FaRegHeart />
                              </button>
                            )}
                          </span>

                          <span
                            className="Remove"
                            onClick={() => handleRemoveFromCart(cartItem)}
                          >
                            <IoMdClose />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <div className="layout align-start justify-end">
            <img
              src={Razorpay}
              alt="logo"
              style={{ width: "23.5%" }}
              className="razorpay"
            />
          </div>
          <div className="layout justify-space-between Instructions m-t-25 m-b-25 p-b-25">
            <div>
              <div>
                <p>
                  *Once your order has been placed no subsequent changes can be
                  made in it.
                </p>
                <p>
                  *Shipping cost may vary depending on the delivery destination.
                </p>
                <p>
                  *Please check the final amount on the order summary page
                  before completing the payment.
                </p>
                <p>*An item's price may vary according to the size selected.</p>
              </div>
              <div className="m-t-10">
                <Link href="" className="bold orat-color-hover">
                  {" "}
                  SHIPPING POLICY{" "}
                </Link>
                <Link href="" className="bold orat-color-hover">
                  {" "}
                  HELP{" "}
                </Link>
                <Link href="" className="bold orat-color-hover">
                  {" "}
                  CONTACT US{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
