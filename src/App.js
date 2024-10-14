// src/App.js
import React, { useState } from 'react';
import ImageSearch from './components/ImageSearch';
import ImageEditor from './components/ImageEditor';
import '../src/App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      
      {!selectedImage ? (
        <ImageSearch onSelectImage={setSelectedImage} />
      ) : (
        <ImageEditor imageUrl={selectedImage} />
      )}
    </div>
  );
}

export default App;
