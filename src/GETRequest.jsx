import { useEffect, useState } from 'react';
import axios from 'axios';

function GETRequest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('i am here at the useEffect');

    getData();

    // axios
    //     .get("https://jsonplaceholder.typicode.com/posts")
    //     .then((response) => {
    //       setData(response.data);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       setError(err.message);
    //       setLoading(false);
    //     });

  }, []);

  async function getData() {
    try {
      const url = "https://jsonplaceholder.typicode.com/posts";

      const response = await axios.get(url);

      setData(response.data);
      setLoading(false);

    } catch(err) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div>
        <div>
          Loading...
        </div>
        
        {console.log('i am here at the if loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          Error {error}
        </div>
        
        {console.log('i am here at the if error')}
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>

      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      {console.log('i am here at the return')}

    </div>
  );
}

export default GETRequest;