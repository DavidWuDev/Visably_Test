import React, { useState, useEffect } from 'react';

interface IProps {
  position: number;
  link: string;
  domain: string;
}

const SearchResultItem: React.FC<IProps> = (props) => {
  return (
    <div style={{ display: 'flex', padding: 10 }}>
      <div style={{ padding: '0px 4px', minWidth: 50 }}>{props.position}</div>
      <div>
        <div>{props.link}</div>
        <div>{props.domain}</div>
      </div>
    </div>
  );
}

const SearchResult = ({ onBack }: { onBack: () => void }) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('position');

  useEffect(() => {
    (async () => {
      const response = await fetch('https://visably-public.s3-us-west-2.amazonaws.com/serpresults.json').then(res => res.json());
      setData(response.organic_results);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (sortBy === 'position') {
      setData([...data].sort((a, b) => a.position - b.position));
    } else if (sortBy === 'domain') {
      const regex = /^www\./;
      setData([...data].sort((a, b) => {
        const d1 = a.domain.replace(regex, '');
        const d2 = b.domain.replace(regex, '');
        if (d1 < d2) {
          return -1;
        } else if (d1 > d2) {
          return 1;
        } else {
          return 0;
        }
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={onBack}>Go back</button>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="position">By Position</option>
          <option value="domain">By Domain</option>
        </select>
      </div>
      {data.map((item: any) => (
        <SearchResultItem
          key={item.position}
          position={item.position}
          link={item.link}
          domain={item.domain}
        />
      ))}
    </div>
  );
}

export default SearchResult;
