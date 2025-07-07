import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation } from "react-router-dom";

// const drawerWidth = 240;

const Sidebar = (props) => {
  const drawerWidth = props.width
  const location = useLocation() // mendapatkan lokasi page yang sedang dibuka

  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Simulasi Penelitian", icon: <InfoIcon />, path: "/about" },
    // { text: "Upload Data", icon: <FileUploadIcon />, path: "/upload" },
    { text: "Credits", icon: <PersonIcon />, path: "/credits" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, #0061ff, #1E3C72)', // gradient biru muda ke biru tua
          color: '#fff',
        },
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
          #kaburajadulu
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => {
          // determine lokasi
          const isActive = location.pathname === item.path; // jika benar kembalikan true: else false 

          // render komponen
          return (

            <ListItem button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                // highlight tombol jika user berada di laman tersebut
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'white' }} />
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
