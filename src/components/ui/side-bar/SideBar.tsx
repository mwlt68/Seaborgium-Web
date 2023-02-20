import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import LogoutIcon from "@mui/icons-material/Logout";
import AttractionsIcon from "@mui/icons-material/Attractions";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { ProjectConsts } from "../../../utils/consts/ProjectConsts";
import { NavigationConsts } from "../../../utils/consts/NavigationConsts";
import { styles } from "./SideBarStyle";
import { AuthManager } from "../../../utils/helpers/AuthManager";

export default function SideBar(props:any) {
  
  const menuItems = { home: "Home", contact: "Contacts" };

  const { collapseSidebar, toggleSidebar, collapsed, toggled } =
    useProSidebar();

  const toggle = () => {
    toggleSidebar();
    collapseSidebar();
  };
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Sidebar style={styles.sideBar}>
        <Box sx={styles.sideBarContainer}>
          <SideBarHeader />
          <hr style={styles.sideBarHR} />
          <SideBarMenu />
          <SideBarFooter />
        </Box>
      </Sidebar>
      <main style={styles.main}>
        {props.children}
      </main>
    </Box>
  );

  function SideBarHeader() {
    return (
      <Box sx={styles.sideBarHeader}>
        <IconButton onClick={toggle}>
          <AttractionsIcon style={styles.sideBarHeaderIcon} fontSize="large" />
        </IconButton>
        {!toggled && (
          <h1 style={styles.sideBarHeaderTitle}>{ProjectConsts.Name}</h1>
        )}
      </Box>
    );
  }

  function SideBarMenu() {
    return (
      <Menu>
        <MenuItem
          component={<Link to={NavigationConsts.HomePage} />}
          icon={<HomeOutlinedIcon />}
        >
          {menuItems.home}
        </MenuItem>
        <MenuItem icon={<ContactsOutlinedIcon fontSize="small" />}>
          {menuItems.contact}
        </MenuItem>
      </Menu>
    );
  }

  function SignOutClickHandle(){
    AuthManager.logout();
    navigate(NavigationConsts.LoginPage)
  }

  function SideBarFooter() {
    return (
      <Button
        style={styles.signOutButton}
        variant="contained"
        startIcon={!toggled && <LogoutIcon style={styles.signOutButtonIcon} />}
        onClick= {SignOutClickHandle}
      >
        Sign Out
      </Button>
    );
  }
}
