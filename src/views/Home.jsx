import React, { useEffect, useState } from 'react'
import { fetchData } from '../api/api'
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

// Halaman ini memperkenalkan user ke program simulasi penelitian

export default function Home() {

  // const [testData, setTestData] = useState(null)

  // // test load data dari server
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const res = await fetchData()
  //       if (res) {
  //         setTestData(res)
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
    <Box>
      <h1>Welcome to My App!</h1>
      <h2>PERBANDINGAN METODE NAIVE BAYES CLASSIFIER DAN SUPPORT VECTOR MACHINE PADA ANALISIS SENTIMEN TANGGAPAN NETIZEN TERHADAP FENOMENA #KABURAJADULU</h2>
    </Box>
  )
}
