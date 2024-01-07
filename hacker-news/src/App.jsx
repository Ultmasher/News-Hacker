import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search !== '') {
      fetch(`http://hn.algolia.com/api/v1/search?query=${search}`)
        .then(response => response.json())
        .then(data => setStories(data.hits.slice(0, 20)));
    }
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={search} onChange={handleSearchChange} placeholder="Search stories..." />
      {stories.map(story => (
        <div key={story.objectID}>
          <a href={story.url}>{story.title}</a>
        </div>
      ))}
    </div>
  );
}

export default App;