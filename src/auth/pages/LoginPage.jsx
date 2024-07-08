import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import {
  startGoogleSingIn,
  startLoginWithEmailAndPassword,
} from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
const initvalue = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const { formState, email, password, onInputChange } = useForm(initvalue);
  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    dispath(startLoginWithEmailAndPassword(formState));
  };
  const onGoogleSingIn = () => {
    console.log("google");
    dispath(startGoogleSingIn());
  };
  return (
    <AuthLayout title="Login">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type="email"
              placeholder="@gmail.com"
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={onInputChange}
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6} display={errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticated}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                onClick={onGoogleSingIn}
                variant="contained"
                fullWidth
                disabled={isAuthenticated}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={"row"} justifyContent={"end"} mt={2}>
            <Link component={RouterLink} to={"/auth/register"}>
              Crear nueva cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
