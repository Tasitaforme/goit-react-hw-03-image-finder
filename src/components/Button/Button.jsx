import PropTypes from 'prop-types'
import {ButtonLoadMore} from './Button.styled'

const Button = ({ onClick }) => {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      <span className="button-label">Load more</span>
    </ButtonLoadMore>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};