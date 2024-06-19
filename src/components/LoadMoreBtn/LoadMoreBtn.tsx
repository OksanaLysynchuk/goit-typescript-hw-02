import React from "react";
import CSS from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  const handleClick = async () => {
    await onClick();
    scrollToBottom();
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <button onClick={handleClick} className={CSS.loadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
