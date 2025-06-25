import React, { useEffect, useState } from "react";
import CustomizedTables from "../components/CustomizedTables";
import { classifyDataset, fetchData } from "../api/api";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { data } from "react-router";

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

  const [testData, setTestData] = useState(null); // testing data

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const res = await classifyDataset(file);
    alert(res.message);
    // deconstruct data
    const {
      data,
      raw_data,
      // nb_classification, 
      // svm_classification,
      classification,
      nb_evaluation,
      svm_evaluation
    } = res
    console.log("Data: ", data);
    setTestData(data) // Set Test Data
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
  };

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
      <div style={{ padding: 30 }}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Excel</button>
      </div>
      <Box p={2}>
        <Paper elevation={4} sx={{ mb: 4 }}>
          <CustomizedTables data={rawData} headers={full_headers} />
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
          <CustomizedTables data={testData} headers={['full_text', 'normalized']} />
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
          <CustomizedTables data={testData} headers={['full_text', 'stopwords']} />
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
          <CustomizedTables data={testData} headers={['full_text', 'stemming']} />
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
      {/* TODO: Evaluasi Aplikasi */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {/* Naive Bayes */}
        <Grid item xs={12} md={6}>
          <h2>Naive Bayes</h2>
          {/* Accuracy */}
          <p>Accuracy: {evalNB ? evalNB.accuracy : null}</p>
          {/* Classification Report */}
          <CustomizedTables data={evalNB ? [evalNB.classification_report['macro avg']] : null} headers={['f1-score', 'precision', 'recall', 'support']} />
          {/* Confusion Matrix */}
          <p>{evalNB ? evalNB.confusion_matrix : null}</p>
        </Grid>
        {/* Support Vector Machine */}
        <Grid item xs={12} md={6}>
          <h2>Support Vector Machine</h2>
          {/* Accuracy */}
          <p>Accuracy: {evalSVM ? evalSVM.accuracy : null}</p>
          {/* Classification Report */}
          <CustomizedTables data={evalSVM ? [evalSVM.classification_report['macro avg']] : null} headers={['f1-score', 'precision', 'recall', 'support']} />
          {/* Confusion Matrix */}
          <p>{evalSVM ? evalSVM.confusion_matrix : null}</p>
        </Grid>
      </Box>
    </>
  );
}
