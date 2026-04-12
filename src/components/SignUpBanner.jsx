import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginModal from "./loginmodal";

function SignUpBanner() {
  const [showSignup, setShowSignup] = useState(false);
  const { userInfo } = useSelector((state) => state.user || {});

  if (userInfo) return null;

  return (
    <div className="SignUpBannerContainer">
      <div className="SignUpBannerInner">
        <div className="SignUpBannerText">
          <div className="h6 bold text-center">Sign up to get exclusive sale tips,</div>
          <div className="p5 text-center">new arrivals and personalized product edits.</div>
        </div>

        <div className="SignUpBannerCta layout align-center justify-center">
          <button
            type="button"
            className="SignUpBannerBtn"
            onClick={() => setShowSignup(true)}
          >
            SIGN ME UP
          </button>
        </div>

        <LoginModal
          showModal={showSignup}
          modalHide={() => setShowSignup(false)}
          defaultToRegister={true}
        />
      </div>
    </div>
  );
}

export default SignUpBanner;
