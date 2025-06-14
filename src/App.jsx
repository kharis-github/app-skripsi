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

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Box>
        <Sidebar />
        <div style={{ padding: 20 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<SecondPage />} />
            <Route path="/credits" element={<ThirdPage />} />
          </Routes>
        </div>
      </Box>
    </BrowserRouter>
  );
}

export default App;
