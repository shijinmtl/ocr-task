import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const fileInputRef = useRef(null);  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      if (file.size <= 5 * 1024 * 1024) { // 5 MB size limit
        setSelectedFile(file);
        setError('');
      } else {
        setError('File size exceeds 5 MB');
      }
    } else {
      setError('Invalid file type. Only JPEG and PNG are allowed.');
    }
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('text', inputText);

    try {
      setBtnDisabled(true)
      const response = await axios.post('http://localhost:5001/upload', formData);
      setResult(response.data.text);
      setError('');
      // Reset the form and file input
      setSelectedFile(null);
      setInputText('');
      fileInputRef.current.value = '';  // Clear the file input
      setBtnDisabled(false)
    } catch (error) {
      console.error(error);
      setError('Error uploading the file');
      setBtnDisabled(false)
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setInputText('');
    setResult('');
    setError('');
    fileInputRef.current.value = '';  // Clear the file input
  };

  return (
    <div className="App">
      <h1>Image Upload and OCR</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            ref={fileInputRef}  // Attach the ref to the file input
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter some text"
            value={inputText}
            onChange={handleTextChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={btnDisabled}>Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {result && (
        <div className="result">
          <h2>OCR Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;