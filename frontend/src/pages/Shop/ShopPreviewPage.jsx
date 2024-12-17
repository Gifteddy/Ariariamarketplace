import React from 'react';
import styles from '../../styles/styles';
import ShopInfo from '../../components/Shop/ShopInfo';
import ShopProfileData from '../../components/Shop/ShopProfileData';
import FooterNav from '../../components/Layout/FooterNav';

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex flex-col-reverse 800px:flex-row py-10 justify-between">
        {/* Shop Info Sidebar */}
        <div
  className="w-full bg-[#fff] rounded-[4px] shadow-sm overflow-hidden 
    max-h-[300px] sm:max-h-[400px] lg:max-h-[90vh] 
    sm:w-full md:w-[60%] lg:w-[25%] 
    sm:sticky sm:top-10 sm:z-10 
    transition-all duration-300 ease-in-out transform 
    sm:overflow-y-auto lg:overflow-y-scroll">
  <ShopInfo isOwner={false} />
</div>


        {/* Shop Profile Content */}
        <div
          className="w-full mt-5 800px:mt-0 800px:w-[72%] bg-[#fff] rounded-[4px] 
            shadow-sm p-4"
        >
          <ShopProfileData isOwner={false} />
        </div>
      </div>
      <FooterNav />
    </div>
  );
};

export default ShopPreviewPage;
