import React from "react";
import commonStyle from "@/css/common.module.scss"
export const Title = ({ title }) => {
  return (
    <div>
      <h2 className={commonStyle["medium-title"]}>{title}</h2>
    </div>
  );
};
