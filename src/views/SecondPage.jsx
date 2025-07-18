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
import DropdownCard from "../components/DropdownCard";

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
  const [processingType, setProcessingType] = useState(2)
  // heatmap confusion matrix naive bayes
  const [confusionMatrixNB, setConfusionMatrixNB] = useState(null)
  // heatmap confusion matrix svm
  const [confusionMatrixSVM, setConfusionMatrixSVM] = useState(null)
  // menentukan tombol upload/remove aktif atau tidak
  const [isDisabled, setIsDisabled] = useState(false)

  const fileInputRef = useRef() // untuk mengubah ref file upload

  // penjelasan setiap metrik evaluasi yang digunakan
  const description = {
    'accuracy': 'Akurasi adalah proporsi dari klasifikasi yang benar. Secara matematis, nilai akurasi didapatkan dengan membagi jumlah pengklasifikasian benar dengan jumlah total klasifikasi.',
    'precision': 'Precision merupakan proporsi dari pengklasifikasian positif yang benar positif. Nilai ini didapatkan dengan membagi jumlah pengklasifikasian positif yang benar dibandingkan total jumlah pengklasifikasian positif.',
    'recall': 'Recall adalah proporsi dari True Positif (benar positif) yang diklasifikasi dengan benar. Metrik ini dihitung dengan membagi jumlah pengklasifikasian positif yang benar dengan total jumlah data bernilai positif.',
    'f1-score': 'Skor F1 merupakan rata-rata harmonik antara nilai Precision dan Recall. Secara fungsional, metrik ini digunakan untuk mendapatkan keseimbangan antara nilai Precision dan Recall.',
    'confusion-matrix': `Confusion matrix adalah matriks yang membandingkan nilai asli dataset dengan hasil pengklasifikasian model. Kolom merepresentasi nilai asli, dan baris merepresentasi hasil klasifikasi. 
    \nKiri Atas - TN (True Negative): Nilai negatif diklasifikasi dengan benar
    \nKiri Bawah - FN (False Negative): Nilai negatif diklasifikasi dengan salah
    \nKanan Atas - TP (True Positive): Nilai positif diklasifikasi dengan benar
    \nKanan Bawah - FP (False Positive): Nilai positif diklasifikasi dengan salah
    `
  }

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
    const toastId = toast.loading("Memproses data...")
    setIsDisabled(true) // non aktifkan tombol remove/upload
    try {
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
      // konversi label menjadi true atau false
      const raw_data_labelled = raw_data.map((item) => ({
        ...item,
        label: item.label === 1 ? 'true' : 'false',
      }))
      setRawData(raw_data_labelled) // raw data

      // console.log("Klasifikasi NB: ", nb_classification);
      // setCsfNB(nb_classification) // Hasil Klasifikasi NB
      // console.log("Klasifikasi SVM: ", svm_classification);
      // setCsfSVM(svm_classification) // Hasil Klasifikasi SVM

      console.log(classification)

      // konversi label menjadi true atau false
      const labelled_classification = classification.map((item, index) => ({
        ...item,
        true_label: item.true_label === 1 ? 'true' : 'false',
        pred_nb: item.pred_nb === 1 ? 'true' : 'false',
        pred_svm: item.pred_svm === 1 ? 'true' : 'false',
      }))

      setClassification(labelled_classification) // Hasil Klasifikasi NB dan SVM
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

      toast.success('Pemrosesan data berhasil!', { id: toastId })
      // tampilkan workflow
      setShow(true)
    } catch (error) {
      console.log("ERROR! ", error)
      toast.error('Proses data gagal!')
    } finally {
      setIsDisabled(false) // aktifkan kembali tombol upload/remove
    }
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
                <Button disabled={isDisabled} variant="outlined" component="span" onClick={handleUpload} color="success">⬆️Upload</Button>
                <Button disabled={isDisabled} variant="outlined" component="span" onClick={deleteUpload} color="error">🗑️Remove</Button>
              </Stack>
              <FormControl>
                <InputLabel id="process-type-select-label">Preprocessing</InputLabel>
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
              <CustomizedTables data={testData} headers={['full_text', 'cleaned']} />
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
              <CustomizedTables data={testData} headers={['cleaned', 'normalized']} />
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
          <Box sx={{ flexGrow: 1, p: 2, justifyContent: 'center' }}>
            {/* Naive Bayes */}
            <Grid item xs={12} md={6}>
              <h2>Naive Bayes</h2>
              {/* Accuracy */}
              <Box justifyContent="center" display="flex" alignItems="center" paddingBottom={2}>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" gap={2} width={300}>
                  <DropdownCard title="Accuracy" description={description['accuracy']} score={evalNB ? evalNB.accuracy.toFixed(2) : null} />
                </Box>
              </Box>
              {/* Classification Report */}
              <Box display="flex" flexDirection="row" gap={2} paddingBottom={2}>
                <DropdownCard title="Precision" description={description['precision']} score={evalNB.classification_report['weighted avg'].precision.toFixed(2)} />
                <DropdownCard title="Recall" description={description['recall']} score={evalNB.classification_report['weighted avg'].recall.toFixed(2)} />
                <DropdownCard title="F1-Score" description={description['f1-score']} score={evalNB.classification_report['weighted avg']['f1-score'].toFixed(2)} />
              </Box>
              {/* Confusion Matrix */}
              <Box justifyContent="center" display="flex" alignItems="center">
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" gap={2} width={300} paddingBottom={2}>
                  <DropdownCard title="Confusion Matrix" description={description['confusion-matrix']} img={`data:image/png;base64,${confusionMatrixNB}`} />
                </Box>
              </Box>
              {/* <img src={`data:image/png;base64,${confusionMatrixNB}`} /> */}
            </Grid>
            {/* Support Vector Machine */}
            <Grid item xs={12} md={6}>
              <h2>Support Vector Machine</h2>
              {/* Accuracy */}
              <Box justifyContent="center" display="flex" alignItems="center" paddingBottom={2}>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" gap={2} width={300}>
                  <DropdownCard title="Accuracy" description="ACCURACY DESCRIPTION" score={evalSVM ? evalSVM.accuracy.toFixed(2) : null} />
                </Box>
              </Box>
              {/* Classification Report */}
              <Box display="flex" flexDirection="row" gap={2} paddingBottom={2}>
                <DropdownCard title="Precision" description={description['precision']} score={evalSVM.classification_report['weighted avg'].precision.toFixed(2)} />
                <DropdownCard title="Recall" description={description['recall']} score={evalSVM.classification_report['weighted avg'].recall.toFixed(2)} />
                <DropdownCard title="F1-Score" description={description['f1-score']} score={evalSVM.classification_report['weighted avg']['f1-score'].toFixed(2)} />
              </Box>
              {/* Confusion Matrix */}
              <Box justifyContent="center" display="flex" alignItems="center">
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" gap={2} width={300} paddingBottom={2}>
                  <DropdownCard title="Confusion Matrix" description={description['confusion-matrix']} img={`data:image/png;base64,${confusionMatrixSVM}`} />
                </Box>
              </Box>
            </Grid>
          </Box>
          {/* KONKLUSI (penjelasan mana antara dua model yang memberikan hasil lebih baik) */}
          <Box>
            <Paper elevation={4} sx={{ mb: 4 }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                  >
                    Hasil Evaluasi
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ maxWidth: "1000px", color: "text.secondary" }}
                  >
                    <Typography variant="body1">
                      Berdasarkan perbandingan nilai Accuracy hasil kinerja antara model Naive Bayes dan Support Vector Machine,
                      ditemukan bahwa model <span style={{ fontWeight: 'bold' }}>Support Vector Machine</span> merupakan model yang lebih unggul dengan nilai Accuracy{' '}
                      <span style={{ fontWeight: 'bold' }}>{evalSVM ? evalSVM.accuracy.toFixed(2) : null}</span>,
                      dibandingkan model <span style={{ fontWeight: 'bold' }}>Naive Bayes</span> dengan nilai Accuracy{' '}
                      <span style={{ fontWeight: 'bold' }}>{evalNB ? evalNB.accuracy.toFixed(2) : null}</span>.
                    </Typography>
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </Paper>
          </Box>
        </div>
      }
    </>
  );
}
