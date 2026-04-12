// Modal.js
import React from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="time-modal modal-overlay">
      <div className="modal">
        <h2>Modal Content</h2>
        {/* Add your modal content here */}
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

export default Modal;
