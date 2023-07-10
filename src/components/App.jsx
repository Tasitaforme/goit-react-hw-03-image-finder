import React, { Component } from 'react'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
import Button from './Button/Button'
import Modal from './Modal/Modal'
import {Loader} from './Loader/Loader'

import { getGalleryImages } from './api/api'

import { AppWrap } from './App.styled';

import { Toaster, toast } from 'react-hot-toast';

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
    if (inputValue === '') {
      toast.success('Start by typing a word into the search', {
        duration: 2000,
        icon: '🙌',
        style: {
          backgroundColor: '#a56403',
          color: '#fff',
        },
      });
      return;
    }

    if (this.state.searchQuery === inputValue) {
      toast.success(
        `You have already searched for "${inputValue}", enter another word in the search`,
        {
          duration: 2000,
          icon: '👌',
          style: {
            backgroundColor: '#5f3a02',
            color: '#fff',
          },
        }
      );
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
      
      if (this.state.currentPage === 1){
        toast.success(`Found ${totalHits} images`, {
          duration: 1000,
          icon: '👏',
          style: {
            backgroundColor: '#3f51b5',
            color: '#fff',
          },
        });
      }

    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images, showloadMore, showModal, showImageModal, loading } =
      this.state;
    return (
      <AppWrap>
      <Toaster/>
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

