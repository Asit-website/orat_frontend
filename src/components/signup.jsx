import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";

function signup({lgShow,modalHide}) {
    return (
        <div>
            {/* <Button onClick={() => setLgShow(true)}>Large modal</Button> */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={modalHide}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                    Signup
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="layout">
                        <div className="flex xs4 offset-xs1">
                            <div className="layout">
                                <div>
                                    <h3 className="demi-bold p-b-20">User Login Signup</h3>
                                    <h4 className="font-normal">For Existing Customers</h4>
                                    <form  >
                                        <div className="input-container">
                                            <input name="email"   type="email" placeholder="Email" />
                                        </div>
                                        <div className="input-container">
                                            <input name="password"  type="password"    placeholder="Password" />
                                        </div>
                                        <div className="m-b-10">
                                            <button type="button" className="btn-icon ForgotPasswordLink font-normal text-left p-l-0 orat-color-hover">Forgot your password?</button>
                                        </div>
                                        <div className="layout align-center justify-center p-t-5">
                                            <button className='btn-orat-primary flex' type='submit'> Login </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                       
                        <div className="flex xs4 offset-xs1">
                            <div onClick={modalHide} style={{ cursor: 'pointer' }}>
                                <IoClose style={{ width: '30px', height: '32px' }} />
                            </div>
                        </div>
                    </div></Modal.Body>
            </Modal>
        </div>
    )
}

export default signup