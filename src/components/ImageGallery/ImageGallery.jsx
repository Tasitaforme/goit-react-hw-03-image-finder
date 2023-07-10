import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types'

import{ImageGalleryUL} from './ImageGallery.styled'

import React, { Component } from 'react'
import { animateScroll as scroll} from 'react-scroll';

export default class ImageGallery extends Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, _) {
    if (prevProps.images.length < this.props.images.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(_, __, snapshot) {
    if (snapshot !== null) {
      scroll.scrollTo(snapshot);
    }
  }

  render() {
    const { images, onClickImage } = this.props;
    return (
      <ImageGalleryUL ref={this.listRef}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              alt={tags}
              largeImageURL={largeImageURL}
              onClickImage={onClickImage}
            />
          );
        })}
      </ImageGalleryUL>
    );
  }
}

ImageGallery.propTypes = {
  images:PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  onClickImage: PropTypes.func.isRequired,
};

    
