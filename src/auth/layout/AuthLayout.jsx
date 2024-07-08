/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";

const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", p: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { xs: 450 },
          backgroundColor: "white",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
