import axios from 'axios';
import React, { Component } from 'react';

import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Button } from './Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    articles: [],
  };
  onSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  onLoadMore = page => {
    this.setState({ page });
  };

  addButton = articles => {
    this.setState({ articles });
  };

  render() {
    const { searchQuery, page, articles } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        <ImageGallery
          addButton={this.addButton}
          searchQuery={searchQuery}
          currentPage={page}
        />
        {articles.length === 12 ? (
          <Button onLoadMore={this.onLoadMore} />
        ) : null}
      </div>
    );
  }
}
