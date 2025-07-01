import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Simulasi Penelitian", icon: <InfoIcon />, path: "/about" },
    { text: "Upload Data", icon: <FileUploadIcon />, path: "/upload" },
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
        },
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
