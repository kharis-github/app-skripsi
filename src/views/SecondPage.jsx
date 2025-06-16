import React, { useEffect, useState } from 'react'
import CustomizedTables from '../components/CustomizedTables'
import { fetchData } from '../api/api'

export default function SecondPage() {

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
    <>
      <CustomizedTables data={testData}/>
    </>
  )
}
