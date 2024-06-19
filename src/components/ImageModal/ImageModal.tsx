import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CSS from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  imageUrl,
  imageAlt,
}) => {
  const [modalStyle, setModalStyle] = useState({
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  });

  useEffect(() => {
    const updateModalStyle = () => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const { naturalWidth, naturalHeight } = img;

        setModalStyle((prevStyle) => ({
          content: {
            ...prevStyle.content,
            width: naturalWidth,
            height: naturalHeight,
            marginTop: "20px",
            maxWidth: "80vw",
            maxHeight: "80vh",
          },
        }));
      };
    };

    if (isOpen) {
      updateModalStyle();
    }
  }, [isOpen, imageUrl]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      className={CSS.modalWindow}
      overlayClassName={CSS.overlay}
    >
      <div className={CSS.imageContainer} onClick={onRequestClose}>
        <img src={imageUrl} alt={imageAlt} className={CSS.image} />
      </div>
    </Modal>
  );
};

export default ImageModal;
