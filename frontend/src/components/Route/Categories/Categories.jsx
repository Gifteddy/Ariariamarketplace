import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null); // Track expanded category

  const handleCategoryClick = (category) => {
    setExpandedCategory(
      expandedCategory === category.id ? null : category.id // Toggle subcategory visibility
    );
  };

  const handleSubcategoryClick = (category, subCategory) => {
    navigate(`/products?category=${category.title}&subCategory=${subCategory.title}`);
  };

  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md">
          {brandingData.map((item, index) => (
            <div className="flex items-start" key={index}>
              {item.icon}
              <div className="px-3">
                <h3 className="font-bold text-sm md:text-base">{item.title}</h3>
                <p className="text-xs md:text-sm">{item.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id="categories">
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData.map((category) => (
            <div key={category.id} className="w-full">
              {/* Category Header */}
              <div
                className="h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                onClick={() => handleCategoryClick(category)}
              >
                <h5 className="text-[18px] leading-[1.3]">{category.title}</h5>
                <img
                  src={category.image_Url}
                  className="w-[120px] object-cover"
                  alt={category.title}
                />
              </div>

              {/* Subcategories Section */}
              {expandedCategory === category.id && (
                <div className="bg-gray-100 p-4 rounded-lg mt-2">
                  {category.subCategories.map((subCategory) => (
                    <div
                      key={subCategory.id}
                      className="cursor-pointer hover:text-blue-600 mb-2"
                      onClick={() => handleSubcategoryClick(category, subCategory)}
                    >
                      {subCategory.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
