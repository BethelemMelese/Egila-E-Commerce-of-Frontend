import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Notification from "../../../commonComponent/notification";

interface RoleState {
  roleName: string;
  roleDescription: string;
}

const initialState: RoleState = {
  roleName: "",
  roleDescription: "",
};

const CreateRole = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedRole, setSelectedRole] = useState(props.selectedRole);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setViewMode(props.viewMode);
    setSelectedRole(props.selectedRole);
    if (props.viewMode === "new") {
      formik.resetForm({
        values: initialState,
      });
    }
  }, [props.viewMode, props.selectedRole]);

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Role is Successfully Added !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onCreateError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Role is Successfully Updated !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onUpdateError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    roleName: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: selectedRole,
    onSubmit: (values) => {
      if (viewMode == "new") {
        setIsSubmitting(true);
        axios
          .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .post(appUrl + "roles", values)
          .then(() => onCreateSuccess())
          .catch((error) => onCreateError(error.response.data.message));
      } else {
        setIsSubmitting(true);
        axios
          .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .put(appUrl + `roles/${selectedRole.id}`, values)
          .then(() => onUpdateSuccess())
          .catch((error) => onUpdateError(error.response.data.message));
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="create-card">
      <Card
        title={
          <h3
            style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}
          >
            {viewMode == "new" ? <b>Add Role</b> : <b>Modify Role</b>}
          </h3>
        }
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="medium" className="close-btn" />
          </a>
        }
      >
        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controls.Input
                required
                id="roleName"
                label="Role"
                {...formik.getFieldProps("roleName")}
                error={
                  formik.touched.roleName && formik.errors.roleName
                    ? formik.errors.roleName
                    : ""
                }
              />

              <Controls.Input
                id="roleDescription"
                label="Description"
                multiline
                {...formik.getFieldProps("roleDescription")}
                error={
                  formik.touched.roleDescription &&
                  formik.errors.roleDescription
                    ? formik.errors.roleDescription
                    : ""
                }
              />
            </Grid>
          </Grid>

          {viewMode == "new" ? (
            <div className="btn-form">
              {isSubmitting ? (
                <Button
                  className="clicked-btn"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Sending...
                </Button>
              ) : (
                <Button className="send-btn" variant="contained" type="submit">
                  Send
                </Button>
              )}
            </div>
          ) : (
            <div className="btn-form">
              {isSubmitting ? (
                <Button
                  className="clicked-btn"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Updating...
                </Button>
              ) : (
                <Button className="send-btn" variant="contained" type="submit">
                  Update
                </Button>
              )}
            </div>
          )}
        </Form>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default CreateRole;
