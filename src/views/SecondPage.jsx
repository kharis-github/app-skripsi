import React, { useEffect, useState } from 'react'
import CustomizedTables from '../components/CustomizedTables'
import { fetchData } from '../api/api'
import { Box, Button, Card, CardActions, CardContent, Paper, Typography } from '@mui/material'

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
    <Box p={2}>
      <Paper elevation={4} sx={{mb: 4}}>
        <CustomizedTables data={testData} />
      </Paper>
      <Paper elevation={4}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align='right'>
              Data Scraping
            </Typography>
            <Typography variant="body2" align='right' sx={{maxWidth: '1000px', color: 'text.secondary'}}>
              data hasil scraping dari twitter/x menggunakan program tweet-harvest karya helmi satria. data ini belum terlabelisasi, dan terdiri dari kolom-kolom yang tidak akan dibutuhkan.
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Paper>
    </Box>
  )
}
