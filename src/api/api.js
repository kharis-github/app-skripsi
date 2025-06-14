// fungsi-fungsi API

const API_BASE_URL = `https://localhost:3000`

// TESTING: fetch data dari server
export const fetchData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/data`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// fetch contoh data dari server

// send data untuk diklasifikasi

// tampilkan performansi dari aplikasi