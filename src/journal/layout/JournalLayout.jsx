/* eslint-disable react/prop-types */
import { Box, Toolbar } from "@mui/material";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const drawerWidth = 240;
const JournalLayout = ({ children }) => {
  return (
    <Box className="animate__animated animate__fadeIn animate__faster" sx={{ display: "flex" }}>
      {/* NAVBAR drawerWidth*/}
      <NavBar drawerWidth={drawerWidth} />
      {/* SIDEBAR */}
      <SideBar drawerWidth={drawerWidth} />
      <Box component={"main"} sx={{ flexGrow: 1, padding: 3 }}>
        {/* TOOLBAR */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default JournalLayout;
