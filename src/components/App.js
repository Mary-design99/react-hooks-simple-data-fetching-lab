// create your App component here
import React, { useState, useEffect } from 'react';

const App = () => {
  const [dogImageUrl, setDogImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDogImageUrl(data.message);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDogImage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {dogImageUrl && (
        <img src={dogImageUrl} alt="A Random Dog" style={{ maxWidth: '500px', height: 'auto' }} />
      )}
    </div>
  );
};

export default App;
