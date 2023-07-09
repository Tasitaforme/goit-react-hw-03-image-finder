// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem'
import Button from './Button/Button'
import { getGalleryImages } from './api/api'
import { Loader } from './Loader/Loader'
import Modal from './Modal/Modal'

import { AppWrap } from './App.styled';


export default class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    showloadMore: false,
    showModal: false,
    loading: false,
    currentPage: 1,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.apiImages();
    }
  }

  handlerSearch = inputValue => {
    if (inputValue === '' || this.state.searchQuery === inputValue) {
      return;
    }

    this.setState({ searchQuery: inputValue, images: [], currentPage: 1 });
  };

  handlerLoadMore = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };

  handlerImage = (src, alt) => {
    this.setState({ showModal: true, showImageModal: { src, alt } });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  apiImages = async () => {
    try {
      this.setState({ loading: true });
      const imagePerPage = 12;
      const { hits, totalHits } = await getGalleryImages(
        this.state.searchQuery,
        this.state.currentPage,
        imagePerPage
      );

      this.setState(prev => ({
        images: [...prev.images, ...hits],
        showloadMore:
          this.state.currentPage < Math.ceil(totalHits / imagePerPage),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images, showloadMore, showModal, showImageModal, loading } =
      this.state;
    return (
      <AppWrap>
        <Searchbar onSubmit={this.handlerSearch} />
        {images && (
          <ImageGallery images={images} onClickImage={this.handlerImage} />
        )}
        {loading && <Loader />}
        {showloadMore && <Button onClick={this.handlerLoadMore} />}
        {showModal && (
          <Modal
            src={showImageModal.src}
            alt={showImageModal.alt}
            onClose={this.toggleModal}
          />
        )}
      </AppWrap>
    );
  }
}

