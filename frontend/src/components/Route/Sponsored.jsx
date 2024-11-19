import React from "react";
import styles from "../../styles/styles";
import ub from "./ub.jpg";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl overflow-hidden`}
      style={{ position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          animation: "scroll 15s linear infinite",
          gap: "1rem",
          width: "max-content",
        }}
      >
        {/* Image 1 */}
        <div style={{ display: "flex", marginInline: "1rem" }}>
          <img
            src={ub}
            alt=""
            style={{
              width: "150px",
              objectFit: "contain",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Image 2 */}
        <div style={{ display: "flex", marginInline: "1rem" }}>
          <img
            src={ub}
            alt=""
            style={{
              width: "150px",
              objectFit: "contain",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Image 3 */}
        <div style={{ display: "flex", marginInline: "1rem" }}>
          <img
            src={ub}
            alt=""
            style={{
              width: "150px",
              objectFit: "contain",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Repeat Images for Loop */}
        <div style={{ display: "flex", marginInline: "1rem" }}>
          <img
            src={ub}
            alt=""
            style={{
              width: "150px",
              objectFit: "contain",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        <div style={{ display: "flex", marginInline: "1rem" }}>
          <img
            src={ub}
            alt=""
            style={{
              width: "150px",
              objectFit: "contain",
            BlendMode: "overlay",
            }}
          />
        </div>

        <div style={{ display: "flex", marginInline: "1rem" }}>
          <img
            src={ub}
            alt=""
            style={{
              width: "150px",
              objectFit: "contain",
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-1%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Sponsored;
