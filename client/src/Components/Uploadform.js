import { useState } from 'react';
import React from "react";
import axios from 'axios';

const Uploadform = () => {
    
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('song', file);

    try {
      await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Song uploaded successfully');
    } catch (error) {
      console.error('Error uploading song:', error);
      console.log(error);
      alert('Failed to upload song');
    }
  };

  return (
    <form action="http://localhost:3001/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="song" accept="audio/mp3" onChange={handleFileChange} />
      <button type="submit">Upload Song</button>
    </form>
  );
};

export default Uploadform ;