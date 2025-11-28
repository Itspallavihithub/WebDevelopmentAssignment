// Topics:

// RESTful web services concept

// JSON, Fetch API / Axios

// GET, POST, DELETE, PUT using Axios

// Form handling

// Idea: TODO List / Posts using JSONPlaceholder

// Simple app:

// Show posts from https://jsonplaceholder.typicode.com/posts

// Add new post (fake – API response)

// Delete post

// Update (PUT)

// Example Axios snippet:



import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setPosts(res.data.slice(0, 5)));
  }, []);

  const addPost = async (e) => {
    e.preventDefault();
    const res = await axios.post(API_URL, {
      title,
      body: "Demo body",
      userId: 1,
    });
    setPosts((prev) => [res.data, ...prev]);
    setTitle("");
  };

  const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>React Axios CRUD – Your Name (CS-A)</h1>

      <form onSubmit={addPost}>
        <input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {posts.map((p) => (
        <div key={p.id}>
          <h4>
            {p.id}. {p.title}
          </h4>
          <button onClick={() => deletePost(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
 