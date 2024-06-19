import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import CSS from "./ImageGallery.module.css";

interface Image {
  id: string;
  smallUrl: string;
  regularUrl: string; // Ensure regularUrl is included
  alt: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void; // Ensure onImageClick expects Image type with regularUrl
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className={CSS.listContainer}>
      <ul className={CSS.list}>
        {images.map((image) => (
          <li
            key={image.id}
            onClick={() => onImageClick(image)}
            className={CSS.listItem}
          >
            <ImageCard src={image.smallUrl} alt={image.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
