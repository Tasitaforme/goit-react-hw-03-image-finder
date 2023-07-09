import PropTypes from 'prop-types';
import { Overlay, ModalWrap } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlerEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerEscape);
  }

  handlerEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handlerBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handlerBackdropClick}>
        <ModalWrap>
          <img src={this.props.src} alt={this.props.alt} />
        </ModalWrap>
      </Overlay>,
      modalRoot
    );
  }
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
