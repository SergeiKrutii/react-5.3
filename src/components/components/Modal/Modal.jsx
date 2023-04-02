import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { StyledModal } from "./StyledModal";
import { createPortal } from "react-dom";

const Modal = ({ openModal, image, keyCloseModal }) => {
  const modalRoot = useRef(document.querySelector("#modal-root"));

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Escape") {
        keyCloseModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [keyCloseModal]);

  return createPortal(
    <StyledModal onClick={openModal}>
      <div className="modal">
        <img src={image} alt="" />
      </div>
    </StyledModal>,
    modalRoot.current
  );
};

Modal.propTypes = {
  openModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};

export default Modal;
