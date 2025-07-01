import React, { useRef, useState } from 'react';
import axios from 'axios';
import { uploadRawText } from '../api/api';
import { Box, Button, Stack, Typography } from '@mui/material';

const ThirdPage = () => {
  const fileInputRef = useRef() // untuk mengubah ref file upload

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    uploadRawText(file)
  };

  return (
    // <div style={{ padding: 30 }}>
    //   <input type="file" accept=".xlsx" onChange={handleFileChange} />
    //   <button onClick={handleUpload}>Upload Excel</button>
    // </div>
    <Box sx={{ p: 4, maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Upload Data
      </Typography>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{ marginBottom: 16, display: "none" }}
        id="upload-excel"
        disabled={file ? true : false}
        ref={fileInputRef}
      />
      <label htmlFor="upload-excel">
        <Button variant="outlined" component="span" disabled={file ? true : false}>
          Select Excel
        </Button>
      </label>{
        file && (
          <Stack direction="row" spacing={2} justifyContent={'space-between'} style={{ padding: '20px' }}>
            <Button variant="outlined" component="span" onClick={handleUpload} color="success">Upload</Button>
            {/* <Button variant="outlined" component="span" onClick={deleteUpload} color="error">Remove</Button> */}
          </Stack>
        )
      }
      {/* <button onClick={() => {
          toast.success('TEST TOAST!!!')
        }}>Test Toast</button> */}
      {file && (
        <Typography color="success.main">
          File dipilih: {file.name}
        </Typography>
      )}
      {/* {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )} */}
    </Box>

  );
}

export default ThirdPage;