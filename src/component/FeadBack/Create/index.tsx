import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl, headers } from "../../../appurl";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Notification from "../../../commonComponent/notification";

interface FeedBackState {
  name: string;
  description: string;
}

const initialState: FeedBackState = {
  name: "",
  description: "",
};

const CreateFeedBack = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedFeedBack, setSelectedFeedBack] = useState(
    props.selectedFeedBack
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setViewMode(props.viewMode);
    setSelectedFeedBack(props.selectedFeedBack);
    if (props.viewMode === "new") {
      formik.resetForm({
        values: initialState,
      });
    }
  }, [props.viewMode, props.selectedFeedBack]);

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "FeedBack is Successfully Added !",
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
      message: "FeedBack is Successfully Updated !",
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
    name: Yup.string().required("Your Name is required"),
    description: Yup.string().required("Your Comment is required"),
  });

  const formik = useFormik({
    initialValues: selectedFeedBack,
    onSubmit: (values) => {
      if (viewMode == "new") {
        setIsSubmitting(true);
        axios
          .create({
            headers: {
              Authorization: `Bearer ${headers}`,
            },
          })
          .post(appUrl + "comments", values)
          .then(() => onCreateSuccess())
          .catch((error) => onCreateError(error.response.data.message));
      } else {
        setIsSubmitting(true);
        axios
          .create({
            headers: {
              Authorization: `Bearer ${headers}`,
            },
          })
          .put(appUrl + `comments/${selectedFeedBack.id}`, values)
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
            {viewMode == "new" ? <b>Add Your Feed Back</b> : <b>Modify Your Feed Back</b>}
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
                id="name"
                label="Your Name"
                {...formik.getFieldProps("name")}
                error={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ""
                }
              />

              <Controls.Input
                required
                id="description"
                label="Your Comment"
                multiline
                {...formik.getFieldProps("description")}
                error={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
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

export default CreateFeedBack;
