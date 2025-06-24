import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

// sidebar menjabarkan link navigasi
const Sidebar = () => {
  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Simulasi Penelitian", icon: <InfoIcon />, path: "/about" },
    { text: "Upload Data", icon: <InfoIcon />, path: "/credits" },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
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
