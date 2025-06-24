import React, { useState } from 'react';
import axios from 'axios';
import { uploadRawText } from '../api/api';

const ThirdPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    uploadRawText(file)
  };

  return (
    <div style={{ padding: 30 }}>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Excel</button>
    </div>
  );
}

export default ThirdPage;