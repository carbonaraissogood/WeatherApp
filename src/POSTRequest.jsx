import { useState } from "react";
import axios from 'axios';

function POSTRequest() {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      title,
      body
    }

    postData(newPost);
  }

  async function postData(newPost) {
    try {

      console.log('i am at the postData function');

      const url = "https://jsonplaceholder.typicode.com/posts";

      const response = await axios.post(url, newPost);

      console.log('Server response:', response.data);

      setResponseMessage('Post created successfully!');

    } catch(error) {

      if (error.response) {
        console.log(`Response error: ${error.response}`);
        return;
      }

      if (error.request) {
        console.log(`Request error: ${error.request}`);
        return;
      }

      setResponseMessage('Error creating post');
    }
  };

  return (
    <div>

      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>

        <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Post Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button type="submit">Create Post</button>

      </form>

      {responseMessage && <p>{responseMessage}</p>}

    </div>
  );

};

export default POSTRequest;