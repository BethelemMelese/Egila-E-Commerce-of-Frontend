import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Navmenu from "../Frontpage/mainLayout";
import axios from "axios";
import { appUrl } from "../../appurl";
import { Button, Grid, TextField } from "@mui/material";
import { Card } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import location from "../../Images/MyCurrent_Map.png";
import Footer from "../Frontpage/footerSide";
import Notification from "../../commonComponent/notification";

interface ContactUsState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const initialState: ContactUsState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

interface FeedBackState {
  name: string;
  email: string;
}

const feedBackInitialState: FeedBackState = {
  name: "",
  email: "",
};

const ContactUs = () => {
  const [getKey, setGetKey] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSecondSubmitting, setIsSecondSubmitting] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Thank You , We will contact you soon !",
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

  const onFeedbackSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Thank You for your feedback, it means a lot to us !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onFeedbackError = (response: any) => {
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
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    message: Yup.string().required("Message is required"),
  });

  const feedBackValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .post(appUrl + "contactUs", values)
        .then(() => onCreateSuccess())
        .catch((error) => onCreateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const FeedBackformik = useFormik({
    initialValues: feedBackInitialState,
    onSubmit: (values) => {
      setIsSecondSubmitting(true);
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .post(appUrl + "comments", values)
        .then(() => onFeedbackSuccess())
        .catch((error) => onFeedbackError(error.response.data.message));
    },
    validationSchema: feedBackValidationSchema,
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Navmenu inputValue={(value: any) => setGetKey(value)} />
      </AppBar>

      <div className="contactus-container">
        <section className="contact-form">
          <Grid container spacing={0}>
            <Grid item xs={7}>
              <div className="contact-title">
                <h1>Contact Us</h1>
                <p>
                  Email, call, or complete the form to learn how Snappy can
                  solve your messaging problem.
                </p>
                <p>egila@ecommecrece.et</p>
                <p>+251941202673</p>
              </div>
              <div className="contact-info">
                <div className="info">
                  <h4 className="info-title">Customer Support</h4>
                  <p className="info-desc">
                    Out Support team is available around the clock to address
                    any concerns or queries you may have.
                  </p>
                </div>
                <div className="info">
                  <h4 className="info-title">Feedback and Suggestions</h4>
                  <p className="info-desc">
                    We value your feedback and are continuously working to
                    improve Snappy. Your input is crucial in shaping the future
                    of Snappy.
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={5}>
              <Card className="contact-field">
                <h2>Get In Touch</h2>
                <p>you can reach us anytime</p>
                <Grid item xs={12} className="contact-inputs">
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          className="contactInputFiled name"
                          required
                          id="firstName"
                          label="Your First Name"
                          {...formik.getFieldProps("firstName")}
                          {...(formik.touched.firstName &&
                          formik.errors.firstName ? (
                            <div className="error">
                              {formik.errors.firstName}
                            </div>
                          ) : (
                            ""
                          ))}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className="contactInputFiled name"
                          required
                          id="lastName"
                          label="Your Last Name"
                          {...formik.getFieldProps("lastName")}
                          {...(formik.touched.lastName &&
                          formik.errors.lastName ? (
                            <div className="error">
                              {formik.errors.lastName}
                            </div>
                          ) : (
                            ""
                          ))}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className="contactInputFiled"
                          required
                          id="email"
                          label="Your Email"
                          {...formik.getFieldProps("email")}
                          {...(formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                          ) : (
                            ""
                          ))}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className="contactInputFiled"
                          required
                          id="phone"
                          label="Your Phone"
                          {...formik.getFieldProps("phone")}
                          {...(formik.touched.phone && formik.errors.phone ? (
                            <div className="error">{formik.errors.phone}</div>
                          ) : (
                            ""
                          ))}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <textarea
                          id="message"
                          rows={5}
                          cols={30}
                          placeholder="How can we help?"
                          className="contact-textarea"
                          {...formik.getFieldProps("message")}
                          {...(formik.touched.message &&
                          formik.errors.message ? (
                            <div className="error">{formik.errors.message}</div>
                          ) : (
                            ""
                          ))}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div className="contact-btn">
                          {isSubmitting ? (
                            <Button
                              className="contact-btn clicked-btn"
                              variant="contained"
                              disabled={isSubmitting}
                            >
                              Submitting...
                            </Button>
                          ) : (
                            <Button
                              className="contact-btn send-btn"
                              variant="contained"
                              type="submit"
                            >
                              Submit
                            </Button>
                          )}
                          <p>
                            By Contacting us, you agree to our{" "}
                            <b>Terms of service</b> and <b>Privacy policy</b>
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Notification notify={notify} setNotify={setNotify} />
        </section>
        <section className="contact-location">
          <Grid container spacing={0}>
            <Grid item xs={7}>
              <div className="map-location">
                {/* <LoadScript googleMapsApiKey={apiKey}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript> */}
                <img src={location} className="location" />
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className="current-location">
                <h5>Our Loaction</h5>
                <h2>Connecting Near and Far</h2>
                <p>Ayer Tena,</p>
                <p>Addis Ababa,</p>
                <p>Ethiopia</p>
              </div>
              <div className="feedback-content">
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        className="contactInputFiled name"
                        required
                        id="name"
                        label="Name"
                        {...FeedBackformik.getFieldProps("name")}
                        {...(FeedBackformik.touched.name &&
                        FeedBackformik.errors.name ? (
                          <div className="error">
                            {FeedBackformik.errors.name}
                          </div>
                        ) : (
                          ""
                        ))}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        className="contactInputFiled name"
                        required
                        id="email"
                        label="Email"
                        {...FeedBackformik.getFieldProps("email")}
                        {...(FeedBackformik.touched.email &&
                        FeedBackformik.errors.email ? (
                          <div className="error">
                            {FeedBackformik.errors.email}
                          </div>
                        ) : (
                          ""
                        ))}
                      />
                    </Grid>
                    <div className="feedback-btn">
                      {isSecondSubmitting ? (
                        <Button
                          className="contact-btn clicked-btn"
                          variant="contained"
                          disabled={isSecondSubmitting}
                        >
                          Sending...
                        </Button>
                      ) : (
                        <Button
                          className="contact-btn send-btn"
                          variant="contained"
                          onClick={()=>FeedBackformik.handleSubmit()}
                        >
                          Send
                        </Button>
                      )}
                    </div>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </Box>
  );
};

export default ContactUs;
