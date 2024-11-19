import React from 'react';
import styles from '../../styles/styles';
import ShopInfo from '../../components/Shop/ShopInfo';
import ShopProfileData from '../../components/Shop/ShopProfileData';

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex flex-col-reverse 800px:flex-row py-10 justify-between">
        {/* Shop Info Sidebar */}
        <div
          className="w-full 800px:w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-hidden 
            800px:overflow-y-scroll max-h-[300px] 800px:max-h-[90vh] 800px:sticky top-10 z-10"
        >
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
    </div>
  );
};

export default ShopPreviewPage;
