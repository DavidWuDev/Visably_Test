import React, { useState } from 'react';
import './App.css';
import SearchPage from './pages/search.page';
import SearchResult from './pages/search-result.page';

function App() {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [showResult, setShowResult] = useState(false);

  const onSearch = (search: string, brand: string) => {
    setSearch(search);
    setBrand(brand);
    setShowResult(true);
  }

  if (showResult) {
    return <SearchResult onBack={() => setShowResult(false)} />;
  }

  return <SearchPage onSearch={onSearch} search={search} brand={brand} />
}

export default App;
