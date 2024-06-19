import React from "react";
import { ThreeDots } from "react-loader-spinner";
import CSS from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={CSS.loader}>
      <ThreeDots color="#4fa94d" height={80} width={80} />
    </div>
  );
};

export default Loader;
