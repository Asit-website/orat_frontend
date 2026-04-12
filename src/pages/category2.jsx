import React from 'react'
import Filter from '../components/Filter';
import Productpage from '../components/Productpage';
import Footer from '../components/footer';


function category() {
  return (
    <>
    <div>
      <div className='App other-page-top'>
        <div className="BreakPointContainer AppContent">
          <div className="layout ProductList align-start">
          
            <Productpage/>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default category