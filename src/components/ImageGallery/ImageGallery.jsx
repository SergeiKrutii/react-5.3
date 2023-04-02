import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Loader from "../components/Loader";
import { StyledList } from "./StyledImageGallery";
import ImageGalleryItem from "../components/ImageGalleryItem/ImageGalleryItem";
import Fetch from "../api/api";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getImage = new Fetch();

const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }
    setLoading(true);
    getImage.pagination = 1;
    try {
      (async () => {
        const { hits } = await getImage.dataFetch(query);
        setImages(hits);
        window.scrollTo(0, 0);
      })();
    } catch (error) {
      toast.error("Somthing went wrong");
    } finally {
      setLoading(false);
    }
  }, [query]);

  const onNextPage = useCallback(async () => {
    getImage.pagination += 1;
    try {
      setLoading(true);
      const { hits } = await getImage.dataFetch(query);
      setImages((prevState) => [...prevState, ...hits]);
    } catch (error) {
      toast.error("Somthing went wrong");
    } finally {
      setLoading(false);
    }
  }, [query]);

  const toogleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const closeModal = (e) => {
    if (e.target.nodeName === "DIV") {
      toogleModal();
    }
  };

  const getLargeImg = (e) => {
    const imgId = Number(e.currentTarget.id);
    const findLargeImg = images.find((elem) => elem.id === imgId);

    setLargeImage(findLargeImg.largeImageURL);
    toogleModal();
  };

  return (
    <>
      {showModal && (
        <Modal
          image={largeImage}
          keyCloseModal={toogleModal}
          openModal={closeModal}
        />
      )}
      <StyledList>
        <ImageGalleryItem images={images} getLargeImg={getLargeImg} />
      </StyledList>
      {loading && <Loader />}
      {images.length > 1 && <Button onBtnClick={onNextPage} />}
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
