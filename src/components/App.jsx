import axios from 'axios';
import React, { useState } from 'react';

import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Button } from './Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const onSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };
  const onLoadMore = page => {
    setPage(page);
  };

  const addButton = articles => {
    setArticles(articles);
  };
  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery
        addButton={addButton}
        searchQuery={searchQuery.trim()}
        currentPage={page}
      />
      {articles.length % 12 === 0 && articles.length !== 0 ? (
        <Button page={page} onLoadMore={onLoadMore} />
      ) : null}
    </div>
  );
};
