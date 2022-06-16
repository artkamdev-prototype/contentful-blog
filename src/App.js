import './App.css';
import useContentful from './hooks/useContentful';
import { useEffect, useState } from 'react';

function App() {
  const [ blogs, setBlogs] = useState([])
  const { getBlogs } = useContentful()

  useEffect(() => {
    getBlogs()
    .then(res => setBlogs(res))
    .catch(err => console.error("@@@@", err))
  }, [])

  const printBlog = (key, content) => (<div key={key}>
    <h1>{content.subject}</h1>
    <p>{content.content}</p>
  </div>)

  return (
    <div className="App">
      <div>Group-1</div>
      
      {
        blogs.map((blog, i) => printBlog(i, blog))
      }

    </div>
  );
}

export default App;
