import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types'

import{ImageGalleryUL} from './ImageGallery.styled'

import React, { Component } from 'react'

export default class ImageGallery extends Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, _) {
    // Добавляются ли в список новые элементы?
    // Запоминаем значение прокрутки, чтобы использовать его позже.
    if (prevProps.images.length < this.props.images.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(_, __, snapshot) {
    // Если снимок (snapshot) передан, значит элементы добавлены.
    // Выравниваем прокрутку так, чтобы новые элементы не выталкивали старые.
    // (снимок – значение, переданное из getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    const { images, onClickImage } = this.props;
    return (
      <div ref={this.listRef}>
        <ImageGalleryUL>
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
      </div>
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

    
