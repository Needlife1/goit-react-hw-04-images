import { useEffect } from 'react';
import { StyledModal } from './Modal.styled';

export const Modal = ({ url, alt, closeModal }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return (
    <StyledModal className="overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={url} alt={alt} />
      </div>
    </StyledModal>
  );
};
