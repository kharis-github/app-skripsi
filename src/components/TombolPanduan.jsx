import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CircularButton from './CircularButton';

const listPanduan = [
  `Tekan tombol 'Select Excel'`,
  `Pilih salah satu antara dua file berikut: 'kaburajadulu_preprocessed' atau 'kaburajadulu_labelled'. File 'kaburajadulu_preprocessed' telah dijalankan proses preprocessing dan dapat langsung diklasifikasi oleh program dengan cepat. File 'kaburajadulu_labelled' belum di-preproses dan harus dijalankan proses preprocessing terlebih dahulu, yang dapat memakan waktu <5 menit.`,
  `Pilih opsi untuk menerapkan preprocessing. Jika data belum diterapkan proses preprocessing, maka pilih opsi 'With Preprocessing'. Jika data sudah di terapkan preprocessing, maka pilih opsi 'No Preprocessing'.`,
  `Klik tombol 'Upload' untuk mengupload data. Data akan diproses oleh program, sesuai dengan opsi penggunaan preprocessing yang dipilih oleh user.`,
  `Hasil usai pengolahan dan pengklasifikasian data akan langsung ditampilkan kepada anda. Informasi yang ditampilkan adalah sebagai berikut: Hasil setiap tahap preprocessing, Hasil klasifikasi data per-model, dan evaluasi kedua model.`,
]

const TombolPanduan = (props) => {
  const padding = props.padding
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  return (
    <>
      <CircularButton onClick={handleOpenDialog} padding={padding} />
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Panduan Pemakaian Aplikasi</DialogTitle>
        <DialogContent>
          <ol>
            {listPanduan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TombolPanduan;
