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
    // this.setState({ searchQuery });
  };
  const onLoadMore = page => {
    setPage(page);
    // this.setState({ page });
  };

  const addButton = articles => {
    setArticles(articles);
    // this.setState({ articles });
  };
  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery
        addButton={addButton}
        searchQuery={searchQuery}
        currentPage={page}
      />
      {articles.length === 12 ? <Button onLoadMore={onLoadMore} /> : null}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     articles: [],
//   };
//   onSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };
//   onLoadMore = page => {
//     this.setState({ page });
//   };

//   addButton = articles => {
//     this.setState({ articles });
//   };

//   render() {
//     const { searchQuery, page, articles } = this.state;
//     return (

//     );
//   }
// }
