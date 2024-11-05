import { Card } from "antd";
import { useState } from "react";
import { Button, Divider, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import { appUrl } from "../../appurl";
import axios from "axios";
import Controls from "../../commonComponent/Controls";
import Notification from "../../commonComponent/notification";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationPicker from "./locationPicker";

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
  uuId: any;
  shoppingAddress:any;
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
  uuId: "",
  shoppingAddress:""
};

const Checkout = ({ ...props }) => {
  const [isSubmitting, setIsSubmitting] = useState(props.isSubmitting);
  const [cartDatas, setCartDatas] = useState(props.cartDatas);
  const [payMethod, setPayMethod] = useState<any>("");
  const [isPayMethod, setIsPayMethod] = useState(false);
  const [userLocation, setUserLocation] = useState<any>();

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

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    subCity: Yup.string().required("Sub City is required"),
  });

  const onValid = () => {
    if (payMethod == "") {
      setIsPayMethod(true);
    } else {
      setIsPayMethod(false);
    }
  };

  const handleLocationSelect = (selectedLocation: any) => {
    setUserLocation((prevInfo: any) => ({
      ...prevInfo,
      location: selectedLocation,
    }));
  };

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      if (payMethod == "") {
        setIsPayMethod(true);
      } else {
        setIsPayMethod(false);
        setIsSubmitting(true);
        values.uuId = uuId;
        values.paymentMethod = payMethod;
        values.shoppingAddress=userLocation.location;
        axios
          .post(appUrl + "orders", values)
          .then(() => onCreateSuccess())
          .catch((error) => onCreateError(error.response.data.message));
      }
    },
    validationSchema: validationSchema,
  });

  const paymentMethod = [
    {
      id: 1,
      name: "Back Transfer",
      value: "Back_Transfer",
    },
    {
      id: 2,
      name: "Cash on Delivery",
      value: "Cash_on_Delivery",
    },
    {
      id: 3,
      name: "telebirr",
      value: "telebirr",
    },
    {
      id: 4,
      name: "helloCash",
      value: "helloCash",
    },
  ];

  const handleClick = (newValue: any) => {
    setPayMethod(newValue);
  };

  return (
    <div>
      <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="cart-title">
                  <h3>Checkout</h3>
                </div>
              </Grid>
              <Grid item xs={12}>
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
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <LocationPicker onLocationSelect={handleLocationSelect} />
              </Grid>
              <Grid item xs={12}>
                <Card title="Payment Methods">
                  <Grid container spacing={0}>
                    <Grid item xs={12} className="pay-main">
                      {paymentMethod.map((item: any) => {
                        return (
                          <a
                            className={payMethod === item.value ? "active" : ""}
                            onClick={() => handleClick(item.value)}
                            defaultValue={item.value}
                          >
                            {item.name}
                          </a>
                        );
                      })}
                      <br />
                      {isPayMethod ? (
                        <p className="text-danger">
                          Payment Method is required
                        </p>
                      ) : (
                        ""
                      )}
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
                      <Button
                        className="send-btn"
                        variant="contained"
                        type="submit"
                        onClick={onValid}
                      >
                        Send
                      </Button>
                    )}
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Card
              title="Summary"
              extra={
                <Button
                  variant="text"
                  color="warning"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => props.closeedit()}
                >
                  Back
                </Button>
              }
            >
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
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Checkout;
