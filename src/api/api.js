// fungsi-fungsi API

import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL

console.log("Url: ", url)

// TESTING: fetch data dari server
export const fetchData = async () => {
    // console.log("[DEBUG] Eksekusi fungsi fetchData")
    try {
        const response = await fetch(`${url}/text/get`);
        const result = await response.json();
        console.log("[DEBUG] Dataset: ", result)
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 1 | upload file raw text untuk disimpan di database
export const uploadRawText = async (file) => {
    if (!file) return; // jika tidak ada data yang dikembalikan
    const formData = new FormData();
    formData.append('file', file);

    try {
        await axios.post(`${url}/text/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Upload berhasil');
    } catch (err) {
        console.error(err);
        alert('Upload gagal');
    }
}

// 2 | send data untuk diklasifikasi
export const classifyDataset = async (file, type = 1) => {
    if (!file) return // batalkan jika data tidak ada
    const formData = new FormData()
    formData.append('file', file);
    formData.append('type', type); // jenis proses (1 : with preprocessing, lain: no preprocessing)

    try {
        const response = await axios.post(`${url}/text/classify`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return response.data
    } catch (error) {
        console.error(error);
        alert('Error! Proses upload gagal!', err);
    }
}