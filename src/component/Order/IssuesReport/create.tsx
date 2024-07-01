import { useState } from "react";
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

interface IssueReport {
  issueName: string;
  issueDescription: string;
  orderId: any;
}

const initialState: IssueReport = {
  issueName: "",
  issueDescription: "",
  orderId: "",
};

const CreateIssueReport = ({ ...props }) => {
  const [selectedOrder, setSelectedOrder] = useState(props.selectedOrder);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Issue Report is Successfully Done !",
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

  const validationSchema = Yup.object().shape({
    issueName: Yup.string().required("Issue Name is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      values.orderId = selectedOrder.id;
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .post(appUrl + "issuesReports", values)
        .then(() => onCreateSuccess())
        .catch((error) => onCreateError(error.response.data.message));
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
            Report Issue
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
                id="issueName"
                label="Name"
                {...formik.getFieldProps("issueName")}
                error={
                  formik.touched.issueName && formik.errors.issueName
                    ? formik.errors.issueName
                    : ""
                }
              />

              <Controls.Input
                id="issueDescription"
                label="Description"
                multiline
                {...formik.getFieldProps("issueDescription")}
                error={
                  formik.touched.issueDescription &&
                  formik.errors.issueDescription
                    ? formik.errors.issueDescription
                    : ""
                }
              />
            </Grid>
          </Grid>

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
        </Form>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default CreateIssueReport;
