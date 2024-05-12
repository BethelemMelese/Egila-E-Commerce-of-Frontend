import { Box, Button, Grid, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Images from "../../Images/Logo 4.png";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";

const initialState: REGISTERSTATE = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  confirmPassword: "",
  password: "",
  address: "",
  subCity: "",
  neighborhood: "",
};

interface REGISTERSTATE {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  confirmPassword: string;
  password: string;
  address: string;
  subCity: string;
  neighborhood: string;
}

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName is required"),
    middleName: Yup.string().required("middleName is required"),
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
    onSubmit: (values) => {
      setIsSubmitting(true);
      navigate("/");
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
      <div className="registerPage">
        <Box
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={2} className="registerForm">
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <img
                    className="registerLogo"
                    alt="Egila"
                    src={Images}
                    style={{ width: 240, height: 152, marginTop: -60 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        required
                        id="firstName"
                        label="First Name"
                        {...formik.getFieldProps("firstName")}
                        error={
                          formik.touched.firstName && formik.errors.firstName
                            ? formik.errors.firstName
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        required
                        id="middleName"
                        label="Middle Name"
                        {...formik.getFieldProps("middleName")}
                        error={
                          formik.touched.middleName && formik.errors.middleName
                            ? formik.errors.middleName
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        id="lastName"
                        label="Last Name"
                        {...formik.getFieldProps("lastName")}
                        error={
                          formik.touched.lastName && formik.errors.lastName
                            ? formik.errors.lastName
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        id="email"
                        label="Email"
                        {...formik.getFieldProps("email")}
                        error={
                          formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        required
                        id="phone"
                        label="Phone"
                        {...formik.getFieldProps("phone")}
                        error={
                          formik.touched.phone && formik.errors.phone
                            ? formik.errors.phone
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={6}>
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

                    <Grid item xs={6}>
                      <Controls.Password
                        className="inputField"
                        required
                        id="confirmPassword"
                        label="Confirm Password"
                        {...formik.getFieldProps("confirmPassword")}
                        error={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        id="address"
                        label="Address"
                        required
                        {...formik.getFieldProps("address")}
                        error={
                          formik.touched.address && formik.errors.address
                            ? formik.errors.address
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        required
                        id="subCity"
                        label="Sub City"
                        {...formik.getFieldProps("subCity")}
                        error={
                          formik.touched.subCity && formik.errors.subCity
                            ? formik.errors.subCity
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        id="neighborhood"
                        label="Neighborhood"
                        {...formik.getFieldProps("neighborhood")}
                        error={
                          formik.touched.neighborhood &&
                          formik.errors.neighborhood
                            ? formik.errors.neighborhood
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        className="buttonField"
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                        // onClick={handleLogin}
                      >
                        {isSubmitting ? "Signing..." : "Sign Up"}
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="loginLink"
                      justifyContent="flex-end"
                    >
                      <Link to="/login">Already have an account? Sign In</Link>
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

export default Register;
