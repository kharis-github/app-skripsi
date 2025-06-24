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

// fetch contoh data dari server

// send data untuk diklasifikasi

// tampilkan performansi dari aplikasi