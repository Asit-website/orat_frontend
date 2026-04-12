import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword} from '../services/User-service';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from "react-loader-spinner";
import { BrowserView, MobileView } from 'react-device-detect';

function ForgotPassword({ showModal, modalHide }) {
   
    const [regShow, setRegShow] = useState(false);

    let [loading, setLoading] = useState(false);
    let [color] = useState("#ffffff");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);
    const [email, setEmail] = useState('');

    const [errors, seterrors] = useState([]);
    const [loginerrors, setloginerrors] = useState();
    const [successm, setsuccessm] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [showloginLoader, setShowloginLoader] = useState(false);
   
    
    
    const hideerrorshow = () => {
        setRegShow(false);
        seterrors([]);
        setloginerrors('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowloginLoader(true);

        const userDetails = {
            email: email,
        }

        forgotPassword(userDetails).then((data) => {
            setShowloginLoader(false);
            if (data.status) {
                setsuccessm(data.message);
                console.log(data.message);
                
                e.target.reset();
            } else {
                seterrors(data.message);
                
            }
        }).catch((error) => {
            if (error) {
                setShowLoader(false);
                console.log("User Register error:", error);
            }
        })

    };
   

    useEffect(() => {

        if (userInfo) {
            // dispatch(fetchCart());
            // dispatch(fetchWishlist());
            // navigate('/'); // Redirect to the homepage or dashboard after login
            modalHide();
        }
    }, [userInfo, dispatch, navigate]);


   return (
  <div>
    {/* Desktop view (unchanged look) */}
    <BrowserView>
      <Modal
        show={showModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="close">
          <div
            onClick={function (event) {
              modalHide();
              hideerrorshow();
            }}
            style={{ cursor: 'pointer', float: 'right' }}
          >
            <IoClose style={{ width: '30px', height: '32px' }} />
          </div>
        </div>

        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            <ul>
              {errors.length > 0 &&
                errors?.map((data, index) => <li key={index}>{data}</li>)}
            </ul>
          </div>
        )}
        {loginerrors && (
          <div className="alert alert-danger" role="alert">
            <ul>
              {loginerrors.email && <li>{loginerrors.email}</li>}
              {loginerrors.error && <li>{loginerrors.error}</li>}
            </ul>
          </div>
        )}
        {successm && (
          <div className="alert alert-success" role="alert">
            {successm}
          </div>
        )}

        <Modal.Body className="">
          <div className="layout">
            <div className="flex xs12">
              <div className="layout Login" style={{ display: regShow ? 'none' : 'flex' }}>
                <div className="layout column">
                  <h3 className="demi-bold p-b-10">Forgot Password</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="input-container">
                      <input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="layout align-center justify-center p-t-5">
                      <button className="btn-orat-primary flex" type="submit" disabled={showloginLoader}>
                        {!showloginLoader ? 'Reset' : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </BrowserView>

    {/* Mobile view (matches login modal) */}
    <MobileView>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login_modal_root"
        dialogClassName="login_modal_dialog"
      >
        <div className="login_mobile_header">
          <button
            type="button"
            className="login_mobile_header_btn login_mobile_back"
            onClick={function (event) {
              modalHide();
              hideerrorshow();
            }}
            aria-label="Back"
          >
            <img
              src="https://img.perniaspopupshop.com/pwa-assets/icons/back.svg"
              alt="Back"
              className="login_mobile_back_icon"
            />
          </button>
          <div className="login_mobile_header_title">FORGOT PASSWORD</div>
          <div className="login_mobile_header_spacer" />
        </div>

        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            <ul>
              {errors.length > 0 &&
                errors?.map((data, index) => <li key={index}>{data}</li>)}
            </ul>
          </div>
        )}
        {loginerrors && (
          <div className="alert alert-danger" role="alert">
            <ul>
              {loginerrors.email && <li>{loginerrors.email}</li>}
              {loginerrors.error && <li>{loginerrors.error}</li>}
            </ul>
          </div>
        )}
        {successm && (
          <div className="alert alert-success" role="alert">
            {successm}
          </div>
        )}

        <Modal.Body className="CredentialsModal forgot_cer login login_mobile_body">
          <div className="row justify-content-center">
            <div className="row">
              <div className="layout Login" style={{ display: regShow ? 'none' : 'flex' }}>
                <div>
                  <h3 className="demi-bold p-b-20">FORGOT PASSWORD</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="input-container">
                      <input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <p style={{fontWeight:"600",fontSize:"12px"}}>*The new password will be send to register Email ID </p>
                    <div className="layout align-center justify-center p-t-5">
                      <button className="btn-orat-primary flex" type="submit" disabled={showloginLoader}>
                        {!showloginLoader ? 'Reset' : <RotatingLines color="#FFFFFF" height={30} width={30} />}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </MobileView>

    {loading && (
      <ScaleLoader
        color={color}
        loading={loading}
        size={250}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="my_spanner"
      />
    )}
  </div>
);
}

export default ForgotPassword