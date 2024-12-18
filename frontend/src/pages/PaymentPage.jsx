import React from 'react';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import Payment from "../components/Payment/Payment"; // Import Payment component
import FooterNav from '../components/Layout/FooterNav';

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} /> {/* Step indicator */}
       <Payment /> {/* Payment component */}
       <br />
       <br />
       <Footer />
       <FooterNav />
    </div>
  )
}

export default PaymentPage;
