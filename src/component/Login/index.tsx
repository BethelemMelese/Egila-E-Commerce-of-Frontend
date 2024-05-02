import { CssBaseline, Box, Button, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../Images/EGILA GRADIENT 1 JPEG-01.png";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";

const initialState: LOGINSTATE = {
  username: "",
  password: "",
};

interface LOGINSTATE {
  username: string;
  password: string;
}

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "A Password can't insert less than 8 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain at least 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character (!@#$%^&*)"
      )
      .required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {},
    validationSchema: validationSchema,
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  return (
    <>
      <div className="loginPage">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={2} className="loginForm">
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img
                    className="loginLogo"
                    alt="Egila"
                    src={Images}
                    style={{ width: 240, height: 152, marginTop: -60 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controls.Input
                        className="inputField"
                        required
                        id="email"
                        label="Username"
                        {...formik.getFieldProps("username")}
                        helperText="You can use Email or Phone Number to login !"
                        error={
                          formik.touched.username && formik.errors.username
                            ? formik.errors.username
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controls.Password
                        className="inputField"
                        required
                        id="password"
                        label="Password"
                        {...formik.getFieldProps("password")}
                        error={
                          formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <a href="/">Go to home</a>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        className="buttonField"
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Signing..." : "Sign In"}
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="registerLink"
                      justifyContent="flex-end"
                    >
                      <Link to="/register">Don't have an account? Sign Up</Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default Login;
