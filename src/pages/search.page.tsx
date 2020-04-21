import React, { useState } from 'react';
import TextInput from '../components/text-input.component';
import './search.css';

interface IProps {
  search: string;
  brand: string;
  onSearch: (search: string, brand: string) => void
}

const SearchPage: React.FC<IProps> = (props) => {
  const [search, setSearch] = useState(props.search);
  const [brand, setBrand] = useState(props.brand);

  const fetchSearchResult = async () => {
    const response = await fetch('https://visably-public.s3-us-west-2.amazonaws.com/serpresults.json').then(res => res.json());
    setSearch(response.search_parameters.q);
    setBrand(response.search_parameters.engine);
    props.onSearch(response.search_parameters.q, response.search_parameters.engine)
  };



  return (
    <div className="search-page">
      <div className="search-container">
        <img alt="logo" className="logo" src="https://visably.com/static/assets/logo/global-logo-large-white@1x.svg" />
        <TextInput className="mt-2" placeholder="Enter your search phrase" style={{ alignSelf: 'stretch' }} value={search} onChange={event => setSearch(event.target.value)} />
        <TextInput className="mt-2" placeholder="Enter your brand or product name" style={{ alignSelf: 'stretch' }} showSearch onSearch={fetchSearchResult} value={brand} onChange={event => setBrand(event.target.value)} />
        <p className="search-title">Smarter search strategy starts here.</p>
      </div>
    </div>
  )
}

export default SearchPage;
