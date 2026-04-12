import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Browse from "./browse";
import { formatPrice } from "../utils/formatPrice";

function Seacrhproducts({ seacrHide, searchvalue, searchlist, closeModal }) {
  const navigate = useNavigate();
  const productShow = (productId) => {
    // seacrHide();
    navigate(`/products/productdetails/${productId}`);
    closeModal(true)  // ask parent to reopen modal on back
  };

  // place below seacrHide or near other handlers


  return (
    <div>
      <div className="App demo">
        <div className="BreakPointContainer">
          <div className="layout row justify-space-between align-center text-left SectionTitle">
            <div className="SearchModalResultsProduct">
              {searchlist && searchlist.length > 0 ? (
                <>
                  <h2 className="ex-bold mb-4 ps-1">
                    Showing result for {searchvalue}
                  </h2>
                  <div
                    className="layout wrap align-start m-l-5"
                    style={{ justifyContent: "flex-start", gap: "20px" }}
                  >
                    {searchlist &&
                      searchlist.length > 0 &&
                      searchlist.map((product, index) => (
                        <div className="ProductCard" key={index}>
                          <Link
                            to={`/products/productdetails/${product.id}`}
                            onClick={() => closeModal(true)}
                          >
                            <div
                              className="ProductCardImageWrapper"
                              onClick={() => productShow(product.id)}
                            >
                              <div className="FirstProductImage">
                                <div
                                  className="DynamicHeightLoaderWrapper"
                                  style={{
                                    paddingTop: "130%",
                                    overflow: "hidden",
                                  }}
                                >
                                  <div
                                    className="DynamicHeightLoader layout row align-center justify-center"
                                    style={{ paddingTop: "10%" }}
                                  >
                                    <img
                                      src={product.product_thumbail}
                                      alt={product.product_title}
                                      className="img-resp DynamicHeightLoaderImage p-0"
                                    />
                                  </div>
                                  <div className="animated-bg-placeholder"></div>
                                </div>
                              </div>
                            </div>
                            <div className="ProductCardBottom">
                              <h6 className="ProductCardTitle ellipsis demi-bold">
                                {product.product_title}
                              </h6>
                              <p className="ProductCardDescription p2 ellipsis-two-line">
                                {product.product_short_description}
                              </p>
                              <div>
                                <div className="ProductPrice h6">
                                  <span
                                    className="SpecialPrice demi-bold"
                                    style={{ marginLeft: "4%" }}
                                  >
                                    <i
                                      className="fa fa-inr"
                                      style={{ fontSize: "13px" }}
                                    ></i>{" "}
                                    {formatPrice((product?.saleprice > 0
                                      ? product?.saleprice
                                      : product?.price), { showSymbol: false })}
                                  </span>
                                  {product?.discount_amount > 0 && (
                                    <span className="InitialPrice p3 w-auto p-0">
                                      <i
                                        className="fa fa-inr"
                                        style={{ fontSize: "13px" }}
                                      ></i>
                                      {formatPrice(product?.price, { showSymbol: false })}
                                    </span>
                                  )}
                                  {product?.discount_amount > 0 && (
                                    <span className="DiscountPriceRound p3 w-auto p-0">
                                      {product?.discount_type === "flat"
                                        ? `${product?.discount_amount} FLAT OFF`
                                        : product?.discount_type === "percentage"
                                        ? `${product?.discount_amount}% OFF`
                                        : ""}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                  {/* <div className="SearchModalSeeAll">
                                        <Link className="ex-bold" href="">SEE ALL SEARCH RESULTS</Link>
                                    </div> */}
                </>
              ) : (
                <>
                  <div className="p-t-20 p-b-20 layout align-center justify-center">
                    <p>
                      No result found for{" "}
                      <span className="bold">{searchvalue}</span>
                    </p>
                  </div>
                  <Browse />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seacrhproducts;
