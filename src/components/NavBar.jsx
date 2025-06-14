import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Kharis' App
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">Home</Button>
        <Button color="inherit" component={RouterLink} to="/secondpage">About</Button>
        <Button color="inherit" component={RouterLink} to="/thirdpage">Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
