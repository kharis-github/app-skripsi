import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import AppNavbar from "./components/AppNavbar";
import SecondPage from "./views/SecondPage";
import Home from "./views/Home";
import ThirdPage from "./views/ThirdPage";
import NavBar from "./components/Navbar";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import toast, { Toaster } from 'react-hot-toast'
import Credits from "./views/Credits";
import FloatingButtonWithDialog from "./components/TombolPanduan";
import TombolPanduan from "./components/TombolPanduan";

const drawerWidth = 240

function App() {
  const [count, setCount] = useState(0);

  return (
    // <Box sx={{
    //   minHeight: '100vh',
    //   width: '100vw',
    //   backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundAttachment: 'fixed',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}>
    // </Box>
    <>
      <BrowserRouter>
        {/* TOMBOL PANDUAN */}
        <Toaster />
        <Box sx={{ display: "flex" }}>
          <Sidebar width={240} />
          <Box
            component="main"
            sx={{
              flexGrow: 1, // agar tidak tertindih sidebar
              p: 3, // padding agar komponen tidak menempel di tepi
              overflowY: "auto", // scroll vertikal jika konten panjang
            }}
          >
            <TombolPanduan padding={drawerWidth} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<SecondPage />} />
              <Route path="/upload" element={<ThirdPage />} />
              <Route path="/credits" element={<Credits />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
