import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { appUrl } from "../../appurl";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import Notification from "../../commonComponent/notification";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PersonalProfile = ({ ...props }) => {
  const [editProfile, setEditProfile] = useState<any>(props.editProfile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(()=>{
    setEditProfile(props.editProfile)
  },[props.editProfile])


  const onFetchSuccess = (response: any) => {
    setEditProfile(response);
  };

  const onFetchError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      message: "Your Profile is Updated Successfully !",
      type: "success",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/");
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
        {editProfile != undefined && (
          <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
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
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  required
                  id="address"
                  label="Address"
                  {...formik.getFieldProps("address")}
                  error={
                    formik.touched.address && formik.errors.address
                      ? formik.errors.address
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  required
                  id="subCity"
                  label="Sub-City"
                  {...formik.getFieldProps("subCity")}
                  error={
                    formik.touched.subCity && formik.errors.subCity
                      ? formik.errors.subCity
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  required
                  id="town"
                  label="Town"
                  {...formik.getFieldProps("town")}
                  error={
                    formik.touched.town && formik.errors.town
                      ? formik.errors.town
                      : ""
                  }
                />
              </Grid>
            </Grid>

            <div className="btn-form">
              {isSubmitting ? (
                <Button size="small" fullWidth variant="outlined" disabled>
                  Editing...
                </Button>
              ) : (
                <Button
                  color="error"
                  size="small"
                  fullWidth
                  variant="outlined"
                  type="submit"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </Form>
        )}

        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  );
};

export default PersonalProfile;
