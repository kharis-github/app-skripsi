// fungsi-fungsi API

const API_BASE_URL = `http://127.0.0.1:8000`

// TESTING: fetch data dari server
export const fetchData = async () => {
    // console.log("[DEBUG] Eksekusi fungsi fetchData")
    try {
        const response = await fetch(`${API_BASE_URL}/text/`);
        const result = await response.json();
        // console.log("[DEBUG] Dataset: ", result)
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// fetch contoh data dari server

// send data untuk diklasifikasi

// tampilkan performansi dari aplikasi