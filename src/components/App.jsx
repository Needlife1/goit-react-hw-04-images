import React, { useEffect, useMemo, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getAllPictures } from '../picturse/pictures';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [pictures, setPictures] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);

  const handleChangeInputValue = newInputValue => {
    if (inputValue !== newInputValue) {
      setPage(1);
      setPictures([]);
      setInputValue(newInputValue);
    } else {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const getPictures = async () => {
      if (inputValue.trim() === '') {
        return;
      }

      setLoading(true);

      try {
        const data = await getAllPictures(inputValue, page);

        setPictures(prevPictures => {
          const newPictures = [...prevPictures, ...data.hits];

          if (data.total <= newPictures.length) {
            alert('Картинки закончились =(');
          }

          return newPictures;
        });
      } catch (error) {
        alert('Что-то пошло не так...');
        console.error('Error fetching pictures:', error);
      } finally {
        setLoading(false);
      }
    };

    getPictures();
  }, [inputValue, page]);

  const unblockModal = (url, alt) => {
    setModalAlt(alt);
    setModalUrl(url);
    setOpenModal(true);

    document.addEventListener('keydown', blockModal);
  };

  const blockModal = e => {
    if (e.target.tagName !== 'DIV' && e.key !== 'Escape') {
      return;
    }
    setModalAlt('');
    setModalUrl('');
    setOpenModal(false);

    document.removeEventListener('keydown', blockModal);
  };

  return (
    <>
      <Searchbar getPictures={handleChangeInputValue} inputValue={inputValue} />
      <ImageGallery pictures={pictures} openModal={unblockModal} />
      {loading ? (
        <Loader />
      ) : (
        pictures.length >= 12 && (
          <Button onClick={() => handleChangeInputValue(inputValue)} />
        )
      )}
      {openModal && (
        <Modal url={modalUrl} alt={modalAlt} closeModal={blockModal} />
      )}
    </>
  );
}
