import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { Toaster } from "react-hot-toast";
import "./App.css";

interface Image {
  id: string;
  smallUrl: string;
  regularUrl: string; // Ensure regularUrl is included
  alt: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const fetchImages = async (query: string, page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query,
            page,
            per_page: 16,
          },
          headers: {
            Authorization: `Client-ID yRgzzKjwsHP9IbmfLrWTVSVCGLag4qcCavdoO3LBqvk`,
          },
        }
      );

      const newImages: Image[] = response.data.results.map((image: any) => ({
        id: image.id,
        smallUrl: image.urls.small,
        regularUrl: image.urls.regular,
        alt: image.alt_description || "Image",
      }));

      setImages((prevImages) => [...prevImages, ...newImages]);

      if (page > 1) {
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    } catch (err) {
      setError("Failed to load images.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query === "") return;
    fetchImages(query, page);
  }, [page, query]);

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {!isLoading && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          imageUrl={selectedImage ? selectedImage.regularUrl : ""}
          imageAlt={selectedImage ? selectedImage.alt : ""}
        />
      )}
      <Toaster />
    </div>
  );
};

export default App;
