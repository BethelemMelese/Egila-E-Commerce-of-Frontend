import { useEffect, useState } from "react";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import { appUrl } from "../../appurl";
import axios from "axios";
import { Card, Button as ButtonAnt } from "antd";
import Notification from "../../commonComponent/notification";
import { Button, Grid, InputLabel } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const EditCart = ({ ...props }) => {
  const [selectedCart, setSelectedCart] = useState(props.selectedCart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setSelectedCart(props.selectedCart);
  }, [props.selectedCart]);

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Cart is Successfully Updated !",
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
    quantity: Yup.string().required("Quantity is required"),
  });

  const formik = useFormik({
    initialValues: selectedCart,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .put(appUrl + `carts/${selectedCart.id}`, values)
        .then(() => onUpdateSuccess())
        .catch((error) => onUpdateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  return (
    <div>
      <Card
        title="Modify the Order"
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="medium" className="close-btn" />
          </a>
        }
      >
        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controls.Input
                required
                id="itemName"
                label="Item"
                {...formik.getFieldProps("itemName")}
                disabled
              />
              <Controls.Input
                required
                id="brand"
                label="Brand"
                {...formik.getFieldProps("brand")}
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <Controls.Input
                required
                id="price"
                label="Price"
                {...formik.getFieldProps("price")}
                disabled
              />
              <Controls.Input
                required
                id="subTotal"
                label="Sub Total"
                {...formik.getFieldProps("subTotal")}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>You want to change the quantity of item?</InputLabel>
              <Controls.Input
                required
                id="quantity"
                label="Quantity"
                {...formik.getFieldProps("quantity")}
                error={
                  formik.touched.quantity && formik.errors.quantity
                    ? formik.errors.quantity
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
                Updating...
              </Button>
            ) : (
              <Button className="send-btn" variant="contained" type="submit">
                Update
              </Button>
            )}
          </div>
        </Form>
        <Notification notify={notify} setNotify={setNotify} />
      </Card>
    </div>
  );
};

export default EditCart;
