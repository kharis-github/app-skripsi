import React, { useEffect, useRef, useState } from "react";
import CustomizedTables from "../components/CustomizedTables";
import { classifyDataset, fetchData } from "../api/api";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { data } from "react-router";
import toast, { Toaster } from 'react-hot-toast'
import Heatmap from "../components/Heatmap";

export default function SecondPage() {
  const full_headers = [
    "id",
    "conversation_id_str",
    "created_at",
    "favorite_count",
    "full_text",
    "id_str",
    "image_url",
    "in_reply_to_screen_name",
    "lang",
    "location",
    "quote_count",
    "reply_count",
    "retweet_count",
    "tweet_url",
    "user_id_str",
    "username",
  ];

  const [show, setShow] = useState(false) // menampilkan proses text preprocessing, hasil klasifikasi dan evaluasi

  const [testData, setTestData] = useState(null); // testing data

  const [rawDataFields, setRawDataFields] = useState(null) // array fields raw data

  const [rawData, setRawData] = useState(null) // raw data

  const [file, setFile] = useState(null);

  // klasifikasi NB
  const [csfNB, setCsfNB] = useState(null)
  // klasifikasi SVM
  const [csfSVM, setCsfSVM] = useState(null)
  // data klasifikasi
  const [classification, setClassification] = useState(null)
  // evaluasi NB
  const [evalNB, setEvalNB] = useState(null)
  // evaluasi SVM
  const [evalSVM, setEvalSVM] = useState(null)
  // message error (jika user mengupload file yang tidak valid)
  const [error, setError] = useState(null)
  // jenis preprocessing yang digunakan
  const [processingType, setProcessingType] = useState(1)
  // heatmap confusion matrix naive bayes
  const [confusionMatrixNB, setConfusionMatrixNB] = useState(null)
  // heatmap confusion matrix svm
  const [confusionMatrixSVM, setConfusionMatrixSVM] = useState(null)

  const fileInputRef = useRef() // untuk mengubah ref file upload

  // const callToast = (text) => toast.success(text) // panggil toast

  // proses file yang diupload user
  const handleFileChange = (e) => {
    const file = e.target.files[0] // ambil data file dari parameter

    if (!file) {
    } // batalkan proses jika data invalid

    // cek validitas file upload
    const isExcel =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";

    // batalkan proses upload jika file yang diinput tidak valid
    if (!isExcel) {
      toast.error('File harus berupa file Excel!') // tampilkan pesan gagal upload
      setFile(null);
    } else {
      toast.success('File berhasil di-upload!') // tampilkan pesan success upload
      setFile(file); // insert file dalam state
    }
  };

  const handleUpload = async () => {
    const res = await classifyDataset(file, processingType || 1);
    // deconstruct data
    const {
      data,
      raw_data,
      // nb_classification, 
      // svm_classification,
      classification,
      nb_evaluation,
      svm_evaluation,
      nb_confusion_image,
      svm_confusion_image,
    } = res
    console.log("Data: ", data);
    setTestData(data) // Set Test Data
    setRawDataFields(Object.keys(raw_data[0])) // field raw data
    setRawData(raw_data) // raw data

    // console.log("Klasifikasi NB: ", nb_classification);
    // setCsfNB(nb_classification) // Hasil Klasifikasi NB
    // console.log("Klasifikasi SVM: ", svm_classification);
    // setCsfSVM(svm_classification) // Hasil Klasifikasi SVM

    setClassification(classification) // Hasil Klasifikasi NB dan SVM
    console.log("Evaluasi NB: ", nb_evaluation);
    setEvalNB(nb_evaluation) // Evaluasi NB
    console.log("Evaluasi SVM: ", svm_evaluation);
    setEvalSVM(svm_evaluation) // Evaluasi SVM

    // console.log("[DEBUG] Gambar Confusion Matrix")
    // console.log(nb_confusion_image)
    // console.log(svm_confusion_image)

    // gambar confusion matrix
    setConfusionMatrixNB(nb_confusion_image) // naive bayes
    setConfusionMatrixSVM(svm_confusion_image) // svm

    // tampilkan workflow
    setShow(true)
  };

  // hapus file yang sudah diupload
  const deleteUpload = () => {
    setFile(null)
    // hapus isi file ref agar user dapat mengupload file yang sama lagi (jika mau)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
    toast.success('File berhasil di hapus.')
  }

  // CONFUSION MATRIX HEATMAP

  const xLabels = ["Col 1", "Col 2"];
  const yLabels = ["Row 1", "Row 2"];

  // Data heatmap
  const heatmapData = [
    [0, 1],
    [1, 2]
  ];



  // test load data dari server
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const res = await fetchData()
  //       if (res) {
  //         // set text data agar memotong data text
  //         const data = res.map((item) => ({
  //           ...item,
  //           full_text: item.full_text.length > 40 ? item.full_text.slice(0, 40) + "..." : item.full_text
  //         }))
  //         setTestData(data)
  //       } else {
  //         setTestData("API belum aktif!")
  //       }
  //     } catch (error) {
  //       console.log("Fetching data gagal", error)
  //     }
  //   }

  //   loadData()
  // }, [])

  return (
    <>
      {/* FORM UPLOAD FILE */}
      {/* <div style={{ padding: 30 }}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Excel</button>
      </div> */}
      <Box sx={{ p: 4, maxWidth: 400, mx: "auto", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Simulasi Penelitian
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
            <Box sx={{ paddingBottom: '20px' }}>
              <Stack direction="row" spacing={2} justifyContent={'space-between'} style={{ padding: '20px' }}>
                <Button variant="outlined" component="span" onClick={handleUpload} color="success">Upload</Button>
                <Button variant="outlined" component="span" onClick={deleteUpload} color="error">Remove</Button>
              </Stack>
              <FormControl>
                <InputLabel id="process-type-select-label">Processing</InputLabel>
                <Select
                  labelId="process-type-select-label"
                  id="process-type-select"
                  value={processingType}
                  label="Process Type"
                  onChange={(event) => {
                    setProcessingType(event.target.value) // ubah type berdasarkan pilihan user
                  }}
                >
                  <MenuItem value={1}>With Preprocessing</MenuItem>
                  <MenuItem value={2}>No Preprocessing</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
      {
        show && <div>
          <Box p={2}>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <CustomizedTables data={rawData} headers={rawDataFields} />
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="right"
                  >
                    Data Scraping
                  </Typography>
                  <Typography
                    variant="body2"
                    align="right"
                    sx={{ maxWidth: "1000px", color: "text.secondary" }}
                  >
                    data hasil scraping dari twitter/x menggunakan program
                    tweet-harvest karya helmi satria. data ini belum terlabelisasi,
                    dan terdiri dari kolom-kolom yang tidak akan dibutuhkan
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <CustomizedTables data={testData} headers={['full_text', 'cleaning']} />
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                  >
                    Data Cleaning
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ maxWidth: "1000px", color: "text.secondary" }}
                  >
                    membersihkan teks dari artefak dan karakter-karakter yang bukan huruf abjad
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <CustomizedTables data={testData} headers={['cleaning', 'normalized']} />
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="right"
                  >
                    Normalization
                  </Typography>
                  <Typography
                    variant="body2"
                    align="right"
                    sx={{ maxWidth: "1000px", color: "text.secondary" }}
                  >
                    mengkonversi teks tidak baku seperti singkatan, slang, dan typo ke bentuk yang baku
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <CustomizedTables data={testData} headers={['normalized', 'stopwords']} />
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                  >
                    Stopwords Removal
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ maxWidth: "1000px", color: "text.secondary" }}
                  >
                    menghapus kata-kata yang tidak mengandung nilai sentimen tinggi
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <CustomizedTables data={testData} headers={['stopwords', 'stemming']} />
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="right"
                  >
                    Stemming
                  </Typography>
                  <Typography
                    variant="body2"
                    align="right"
                    sx={{ maxWidth: "1000px", color: "text.secondary" }}
                  >
                    mengkonversi kata-kata dengan imbuhan ke bentuk akarnya
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <CustomizedTables data={classification} headers={['text', 'true_label', 'pred_nb', 'pred_svm']} />
            </Paper>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="left"
                  >
                    Classification
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ maxWidth: "1000px", color: "text.secondary" }}
                  >
                    perbandingan hasil klasifikasi antara naive bayes dan support vector machine
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </Paper>
          </Box>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            {/* Naive Bayes */}
            <Grid item xs={12} md={6}>
              <h2>Naive Bayes</h2>
              {/* Accuracy */}
              <p>Accuracy: {evalNB ? evalNB.accuracy : null}</p>
              {/* Classification Report */}
              <CustomizedTables data={evalNB ? [evalNB.classification_report['macro avg']] : null} headers={['f1-score', 'precision', 'recall', 'support']} />
              {/* Confusion Matrix */}
              {/* <p>{evalNB ? evalNB.confusion_matrix : null}</p> */}
              {/* <Heatmap values={evalNB.confusion_matrix} /> */}
              <img src={`data:image/png;base64,${confusionMatrixNB}`} />
            </Grid>
            {/* Support Vector Machine */}
            <Grid item xs={12} md={6}>
              <h2>Support Vector Machine</h2>
              {/* Accuracy */}
              <p>Accuracy: {evalSVM ? evalSVM.accuracy : null}</p>
              {/* Classification Report */}
              <CustomizedTables data={evalSVM ? [evalSVM.classification_report['macro avg']] : null} headers={['f1-score', 'precision', 'recall', 'support']} />
              {/* Confusion Matrix */}
              {/* <p>{evalSVM ? evalSVM.confusion_matrix : null}</p> */}
              {/* <Heatmap values={evalSVM.confusion_matrix} /> */}
              <img src={`data:image/png;base64,${confusionMatrixSVM}`} />
            </Grid>
          </Box>
        </div>
      }
    </>
  );
}
