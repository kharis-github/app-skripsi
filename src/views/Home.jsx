import React, { useEffect, useState } from 'react'
import { fetchData } from '../api/api'
import CircularProgress from '@mui/material/CircularProgress';

// Halaman ini memperkenalkan user ke program simulasi penelitian

export default function Home() {

  const [testData, setTestData] = useState(null)

  // test load data dari server
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchData()
        if (res) {
          setTestData(res)
        } else {
          setTestData("API belum aktif!")
        }
      } catch (error) {
        console.log("Fetching data gagal", error)
      }
    }

    loadData()
  }, [])

  return (
    <div>
      <h1>Welcome to My App!</h1>
      <p>{testData ? testData : <CircularProgress />}</p>
    </div>
  )
}
