// timermodal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../components/Model'; // Update this line to the correct path

const TimerModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* {showModal && <Modal onClose={() => setShowModal(false)} />} */}
      {/* Add your main content here */}
    </div>
  );
};

export default TimerModal;
