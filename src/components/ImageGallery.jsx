import React, { useEffect, useState } from 'react';
import api from './services/api';
import { Loader } from './Loader';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';

export const ImageGallery = ({ currentPage, searchQuery, addButton }) => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(true);
  useEffect(() => {
    const searchText = searchQuery.trim();
    if (!searchText) return;
    async function getImages() {
      try {
        setIsLoading(true);
        setIsLoadMore(true);
        const articles = await api.fetchArticlesWithQuery(searchText, 1);
        const images = articles.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        setImages(images);
        addButton(images);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [searchQuery]);
  useEffect(() => {
    const searchText = searchQuery.trim();
    if (!searchText) return;
    async function getImages() {
      if (currentPage !== 1) {
        setIsLoading(true);
        try {
          const articles = await api.fetchArticlesWithQuery(
            searchText,
            currentPage
          );
          const images = articles.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );
          if (currentPage !== 1) {
            setImages(prev => [...prev, ...images]);
          } else {
            setImages(images);
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getImages();
  }, [currentPage]);
  const imageClick = e => {
    const imageSrc = e.target.src;
    const index = images.findIndex(image => image.webformatURL === imageSrc);
    const largeImage = images[index].largeImageURL;
    setLargeImageURL(largeImage);
    setIsShowModal(true);
  };
  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isShowModal && (
        <Modal largeImageURL={largeImageURL} closeModal={closeModal} />
      )}
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && currentPage === 1 && <Loader />}
      <ul className="ImageGallery" onClick={e => imageClick(e)}>
        {images &&
          images.map(({ id, webformatURL, tags }) => (
            <li className="ImageGalleryItem" key={id}>
              <ImageGalleryItem webformatURL={webformatURL} tags={tags} />
            </li>
          ))}
      </ul>
      {isLoading && <Loader />}
    </>
  );
};

ImageGallery.propTypes = {
  addButton: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};
