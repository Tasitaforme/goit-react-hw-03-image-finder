import PropTypes from 'prop-types'
import React, { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchIcon,
  SearchFormInput,
} from './Searchbar.styled';

  
export default class Searchbar extends Component {
    state = {
        searchInput: '',
    };
    
    handleSearchChange = e => {
        this.setState({ searchInput: e.target.value.trim() });
    }
  
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.searchInput);
        this.setState({ searchInput: '' });
    };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchIcon />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="search"
            value={this.state.searchInput}
            onChange={this.handleSearchChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

