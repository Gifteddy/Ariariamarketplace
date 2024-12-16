import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import FooterNav from "../components/Layout/FooterNav";

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
      <FooterNav />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">Frequently Asked Questions (FAQ)</h2>
      <div className="mx-auto space-y-4">
        {/* FAQ items */}
        <FaqItem
          question="How do I register my shop at Ariariamarketplace?"
          answer="You can register your shop online via login to our website @ www.ariariamarketplace.com.ng or download our mobile app at Google Play store, go to the menu, click become a Seller/Vendor, complete the form and submit, activate your account via a link that will be sent to you in your email, then become a Seller."
          isActive={activeTab === 1}
          onClick={() => toggleTab(1)}
        />

        <FaqItem
          question="Is email address compulsory in opening my online Shop?"
          answer="Yes, you must have an email address to be able to register successfully."
          isActive={activeTab === 2}
          onClick={() => toggleTab(2)}
        />

        <FaqItem
          question="How do I enlist my products on my online Shop?"
          answer="You enlist your products after a successful registration of your Shop and become a Vendor. On your Dashboard, you will see add products, Products Name, products description, choose products category and sub-categories, original amount and discounted Amount, Quantity of products available in stock, upload products pictures and submit for listing approval."
          isActive={activeTab === 3}
          onClick={() => toggleTab(3)}
        />

        <FaqItem
          question="Is there any fee for registration?"
          answer="Registration is FREE for now."
          isActive={activeTab === 4}
          onClick={() => toggleTab(4)}
        />

        <FaqItem
          question="Can the Ariariamarketplace management do products listing for online Shop owners?"
          answer="There will be FREE Products listing on at least (20 products each) for the 1st 100 Sellers who registered on our platform, after which a service fee will be charged for each product listing."
          isActive={activeTab === 5}
          onClick={() => toggleTab(5)}
        />

        <FaqItem
          question="Who are the managers of Ariariamarketplace?"
          answer="Ariariamarketplace is owned and managed by AbaNaijaMade Ecart Ltd®. A Nigerian Company duly registered @ Corporate Affairs Commission (CAC) with its corporate Head office located at 206 Faulks Road by Samek Junction Aba Abia State."
          isActive={activeTab === 6}
          onClick={() => toggleTab(6)}
        />

        <FaqItem
          question="How do I buy products services in Ariariamarketplace?"
          answer="You can buy products and Services in Ariariamarketplace by login to our website www.ariariamarketplace.com.ng Or download our mobile app via Google Play store, look for any products of your choice to make purchases."
          isActive={activeTab === 7}
          onClick={() => toggleTab(7)}
        />

        <FaqItem
          question="How do I make payment?"
          answer="After adding your choice products to Cart, you can proceed to checkout where you will see payment options via Paystack. You can pay through Debit Cards, and Online Bank transfers."
          isActive={activeTab === 8}
          onClick={() => toggleTab(8)}
        />

        <FaqItem
          question="How do I get notified when I order a product or Service?"
          answer="You will be notified via an email which will be sent to you informing you about your order confirmation."
          isActive={activeTab === 9}
          onClick={() => toggleTab(9)}
        />

        <FaqItem
          question="How will the product be delivered to the buyers?"
          answer="When an Order is placed and confirmed, the seller of that particular product gets notified and packages the product and sends it to the buyer."
          isActive={activeTab === 10}
          onClick={() => toggleTab(10)}
        />
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer, isActive, onClick }) => (
  <div className="border-b border-gray-200 pb-4">
    <button className="flex items-center justify-between w-full" onClick={onClick}>
      <span className="text-lg font-medium text-gray-900 text-left">{question}</span>
      {isActive ? (
        <svg
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
    {isActive && (
      <div className="mt-4">
        <p className="text-base text-gray-500 text-left">{answer}</p>
      </div>
    )}
  </div>
);

export default FAQPage;
