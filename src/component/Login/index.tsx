import { Box, Button, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../Images/Logo 4.png";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import { appUrl } from "../../appurl";
import axios from "axios";
import Notification from "../../commonComponent/notification";

const initialState: LOGINSTATE = {
  username: "",
  password: "",
};

interface LOGINSTATE {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onLoginSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("permission", response.userPermissions);
      navigate("/egila/home");
      setIsSubmitting(false);
    }, 2000);
  };

  const onLoginError = (action: any) => {
    setNotify({
      isOpen: true,
      message: action,
      type: "error",
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(appUrl + "users/login", values)
        .then((response) => onLoginSuccess(response.data))
        .catch((error) => onLoginError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  return (
    <>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0px auto",
            marginTop: "10%",
          }}
        >
          <Paper elevation={4} className="loginForm">
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
                      <Button variant="text" onClick={() => navigate("/")}>
                        <u>Go to home</u>
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      {isSubmitting ? (
                        <Button variant="contained" disabled>
                          Signing...
                        </Button>
                      ) : (
                        <Button
                          className="buttonField"
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Sign In
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="registerLink"
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="text"
                        onClick={() => navigate("/register")}
                      >
                        <u> Don't have an account? Sign Up</u>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Paper>
        </Box>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
};

export default Login;
