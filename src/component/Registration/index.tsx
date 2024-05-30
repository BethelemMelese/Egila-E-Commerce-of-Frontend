import { Box, Button, FormControl, Grid, MenuItem, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Images from "../../Images/Logo 4.png";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import axios from "axios";
import { appUrl } from "../../appurl";
import Notification from "../../commonComponent/notification";

interface REGISTERSTATE {
  firstName: String;
  middleName: String;
  lastName: String;
  email: String;
  phone: String;
  username: String;
  confirmPassword: String;
  password: String;
  address: String;
  subCity: String;
  town: String;
  roleId: String;
}

const initialState: REGISTERSTATE = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  username: "",
  confirmPassword: "",
  password: "",
  address: "",
  subCity: "",
  town: "",
  roleId: "",
};

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roleResponse, setRoleResponse] = useState<any>([]);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    username: Yup.string().required("Username is required"),
    address: Yup.string().required("Address is required"),
    subCity: Yup.string().required("Sub City is required"),
    roleId: Yup.string().required("Role is required"),
    password: Yup.string()
      .min(8, "A Password can't insert less than 8 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain at least 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character (!@#$%^&*)"
      )
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(8)
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onRegisterSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Registration is Successfully Done !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/");
    }, 2000);
  };

  const onRegisterError = (action: any) => {
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
      console.log("values...", values);
      setIsSubmitting(true);
      axios
        .post(appUrl + "users", values)
        .then((response) => onRegisterSuccess())
        .catch((error) => onRegisterError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    // axios
    //   .get(appUrl + "roles")
    //   .then((response) => setRoleResponse(response.data))
    //   .catch((error) => setRoleResponse(error.response.data.message));
  }, []);

  return (
    <>
      <div className="registerPage">
        <Box
          sx={{
            // mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0px auto",
            marginTop: "5%",
          }}
        >
          <Paper elevation={4} className="registerForm">
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                      <Controls.Input
                        className="inputField"
                        required
                        id="username"
                        label="Username"
                        {...formik.getFieldProps("username")}
                        error={
                          formik.touched.username && formik.errors.username
                            ? formik.errors.username
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
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

                    <Grid item xs={4}>
                      <Controls.Input
                        className="inputField"
                        id="town"
                        label="Town"
                        {...formik.getFieldProps("town")}
                        error={
                          formik.touched.town && formik.errors.town
                            ? formik.errors.town
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl variant="outlined" className="selectbox">
                        <Controls.Input
                          select
                          id="roleId"
                          required
                          label="Role"
                          {...formik.getFieldProps("roleId")}
                          error={
                            formik.touched.roleId && formik.errors.roleId
                              ? formik.errors.roleId
                              : ""
                          }
                        >
                          <MenuItem>Admin</MenuItem>
                          <MenuItem>Customer</MenuItem>
                          {/* {roleResponse.map((value: any) => {
                            return (
                              <MenuItem value={value.id}>
                                {value.roleName}
                              </MenuItem>
                            );
                          })} */}
                        </Controls.Input>
                      </FormControl>
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
                        >
                          Sign Up
                        </Button>
                      )}
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
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
};

export default Register;
