import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import { Card } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Notification from "../../commonComponent/notification";
import axios from "axios";
import { appUrl, token } from "../../appurl";
import { Grid, Avatar, Button, Paper } from "@mui/material";
import Images from "../../Images/Logo 4.png";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { userService } from "../../polices/userService";
import { useNavigate } from "react-router-dom";

interface ItemState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialState: ItemState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = ({ ...props }) => {
  const [response, setResponse] = useState<any>();
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      message: "Your Password is Changed Successfully !",
      type: "success",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/egila/home");
    }, 2000);
  };

  const onUpdateError = (error: any) => {
    setIsSubmitting(false);
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const onFetchSuccess = (response: any) => {
    setResponse(response);
  };

  const onFetchError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(8, "A Password can't insert less than 8 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain at least 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character (!@#$%^&*)"
      )
      .required("New Password is Required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(8)
      .oneOf([Yup.ref("newPassword")], "Password must be match"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      axios
        .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        .put(appUrl + `users/changePassword/${response.id}`, data)
        .then((response) => onUpdateSuccess())
        .catch((error) => onUpdateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    const userToken = userService.token;
    axios
      .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
      .get(appUrl + `users/UserInfo/${userToken}`)
      .then((response: any) => onFetchSuccess(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  return (
    <div className="setting-container">
      <div>
        <Paper elevation={3}>
          <Card
            title="Change Password"
            extra={
              <a onClick={() => props.closeedit()}>
                <CancelOutlinedIcon fontSize="medium" className="close-btn" />
              </a>
            }
          >
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <img
                    src={Images}
                    style={{ width: 200, height: 120 }}
                    className="profile-image"
                    onClick={() => setViewMode("info")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controls.Password
                    className="inputField"
                    required
                    label="Old Password"
                    {...formik.getFieldProps("oldPassword")}
                    error={
                      formik.touched.oldPassword && formik.errors.oldPassword
                        ? formik.errors.oldPassword
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controls.Password
                    className="inputField"
                    required
                    label="New Password"
                    {...formik.getFieldProps("newPassword")}
                    error={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? formik.errors.newPassword
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controls.Password
                    className="inputField"
                    required
                    label="Confirm Password"
                    {...formik.getFieldProps("confirmPassword")}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="chan-password-btn">
                    {isSubmitting ? (
                      <Button variant="contained" disabled>
                        Changing...
                      </Button>
                    ) : (
                      <Button
                        className="buttonField"
                        variant="contained"
                        type="submit"
                      >
                        Change Password
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Form>
          </Card>
        </Paper>

        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  );
};

export default ChangePassword;
