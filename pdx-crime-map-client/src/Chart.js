import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chart = () => {
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://localhost:5432/tweets',
      );
      setData(result.data);
    }
    fetchData();
  }, []);
  
  return (
    <ul>
      {data.map(item => (
        <li key={item.tweet_id}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export default Chart;
