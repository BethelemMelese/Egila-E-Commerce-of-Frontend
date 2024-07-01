import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { appUrl, token } from "../../appurl";
import axios from "axios";
import { Card } from "antd";
import { Grid, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Notification from "../../commonComponent/notification";
import { useState } from "react";
import Images from "../../Images/Logo 4.png";

interface ItemState {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  subCity: string;
  town: string;
}

const initialState: ItemState = {
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  phone: "",
  email: "",
  address: "",
  subCity: "",
  town: "",
};

const EditProfile = ({ ...props }) => {
  const [editProfile, setEditProfile] = useState(props.editProfile);
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      message: "Your Profile is Updated Successfully !",
      type: "success",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onUpdateError = (error: any) => {
    setIsSubmitting(false);
    setNotify({
      isOpen: true,
      message: "error",
      type: "error",
    });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    username: Yup.string().required("Username is required"),
    address: Yup.string().required("Address is required"),
    subCity: Yup.string().required("Sub City is required"),
  });

  const formik = useFormik({
    initialValues: editProfile,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        .put(appUrl + `users/updateProfile/${editProfile.id}`, values)
        .then(() => onUpdateSuccess())
        .catch((error) => onUpdateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });
  return (
    <div>
      <div>
        <Card
          title="Edit Profile"
          extra={
            <a onClick={() => props.closeedit()}>
              <CancelOutlinedIcon fontSize="medium" className="close-btn" />
            </a>
          }
        >
          <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img
                  src={Images}
                  style={{ width: 200, height: 120 }}
                  className="profile-image"
                  onClick={() => setViewMode("info")}
                />
              </Grid>
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
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  id="username"
                  label="Username"
                  {...formik.getFieldProps("username")}
                  error={
                    formik.touched.username && formik.errors.username
                      ? formik.errors.username
                      : ""
                  }
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
                />
              </Grid>
            </Grid>

            <div className="btn-form">
              {isSubmitting ? (
                <Button variant="contained" disabled>
                  Editing...
                </Button>
              ) : (
                <Button
                  className="buttonField"
                  variant="contained"
                  type="submit"
                >
                  Edit
                </Button>
              )}
            </div>
          </Form>
        </Card>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  );
};

export default EditProfile;
