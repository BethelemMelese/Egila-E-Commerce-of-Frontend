import { Card, Button as ButtonAnt } from "antd";
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import { appUrl } from "../../appurl";
import axios from "axios";
import Controls from "../../commonComponent/Controls";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Notification from "../../commonComponent/notification";

interface CheckOutState {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  subCity: string;
  town: string;
  totalAmount: string;
  cartIds: any;
  paymentMethod: string;
  paymentSlip: string;
}

const initialState: CheckOutState = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  subCity: "",
  town: "",
  totalAmount: "",
  cartIds: "",
  paymentMethod: "",
  paymentSlip: "",
};

const Checkout = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [isSubmitting, setIsSubmitting] = useState(props.isSubmitting);
  const [cartDatas, setCartDatas] = useState(props.cartDatas);
  const [fileList, setFileList] = useState<any>();
  const [validFileFormat, setValidFileFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
  const uuId: any = localStorage.getItem("UUCartId");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "You make order successfully, Your Item will delivered soon !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 4000);
  };

  const onCreateError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validFile = () => {
    if (fileList == null) {
      setFileRequired(true);
    } else {
      setFileRequired(false);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    subCity: Yup.string().required("Sub City is required"),
    paymentMethod: Yup.string().required("Payment Method is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      if (fileList == null) {
        setFileRequired(true);
      } else {
        setFileRequired(false);
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("file", fileList);
        formData.append("firstName", values.firstName);
        formData.append("middleName", values.middleName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("address", values.address);
        formData.append("subCity", values.subCity);
        formData.append("town", values.town);
        formData.append("paymentMethod", values.paymentMethod);
        formData.append("uuId", uuId);
        axios
          .post(appUrl + "orders", formData)
          .then(() => onCreateSuccess())
          .catch((error) => onCreateError(error.response.data.message));
      }
    },
    validationSchema: validationSchema,
  });

  const beforeUpload = (file: any): any => {
    console.log("file...", file.type);
    if (
      file.type === "image/jpg" ||
      file.type == "image/jpeg" ||
      file.type == "image/png" ||
      file.type == "application/pdf"
    ) {
      setValidFileFormat(false);
      setFileRequired(false);
      setFileList(file);
    } else {
      setValidFileFormat(true);
    }
  };

  return (
    <div>
      <Card
        title={
          <h4
            style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}
          >
            Checkout
          </h4>
        }
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="small" className="close-btn" />
          </a>
        }
      >
        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Card title="Personal Info">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Controls.Input
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
                  <Grid item xs={4}>
                    <Controls.Input
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
                  <Grid item xs={4}>
                    <Controls.Input
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
                  <Grid item xs={4}>
                    <Controls.Input
                      id="email"
                      label="Email Address"
                      {...formik.getFieldProps("email")}
                      error={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Controls.Input
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
                  <Grid item xs={4}>
                    <Controls.Input
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
                  <Grid item xs={4}>
                    <Controls.Input
                      required
                      id="subCity"
                      label="Sub City"
                      {...formik.getFieldProps("subCity")}
                      error={
                        formik.touched.subCity && formik.errors.subCity
                          ? formik.errors.subCity
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Controls.Input
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

                  <Grid item xs={4}>
                    <FormControl variant="outlined" className="selectbox">
                      <Controls.Input
                        select
                        id="paymentMethod"
                        required
                        label="Payment Method"
                        {...formik.getFieldProps("paymentMethod")}
                        error={
                          formik.touched.paymentMethod &&
                          formik.errors.paymentMethod
                            ? formik.errors.paymentMethod
                            : ""
                        }
                      >
                        <MenuItem value="In Cash">In Cash</MenuItem>
                        <MenuItem value="Online Banking">
                          Online Mobile Banking
                        </MenuItem>
                      </Controls.Input>
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card title="Your Order total price and items">
                <Grid item xs={12}>
                  <p>
                    Total Item: <b>{cartDatas.totalItem}</b>
                  </p>
                  <Divider
                    orientation="horizontal"
                    variant="middle"
                    flexItem
                    style={{ color: "#fff" }}
                  />
                  <p>
                    Total Price: <b>{cartDatas.totalPrice}</b>
                  </p>
                  <Divider
                    orientation="horizontal"
                    variant="middle"
                    flexItem
                    style={{ color: "#fff" }}
                  />
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card title="Payment Process">
                <InputLabel>
                  Please attach the transaction slip in pdf or image format
                </InputLabel>
                <br />
                <Upload
                  listType="picture"
                  onChange={(response: any) => beforeUpload(response.file)}
                  beforeUpload={() => false}
                >
                  <ButtonAnt icon={<UploadOutlined translate={undefined} />}>
                    Transaction Slip
                  </ButtonAnt>
                  <br />
                  {validFileFormat ? (
                    <span className="text-danger">
                      Invalid file format, Only jpg, jpeg, png and pdf files are
                      allowed!
                    </span>
                  ) : null}
                  {fileRequired ? (
                    <span className="text-danger">
                      Transaction Slip is required
                    </span>
                  ) : null}
                </Upload>
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
                    <Button
                      className="send-btn"
                      variant="contained"
                      type="submit"
                      onClick={validFile}
                    >
                      Send
                    </Button>
                  )}
                </div>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Checkout;
