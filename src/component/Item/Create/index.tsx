import React, { useState } from "react";
import { Button, Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl } from "../../../appurl";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface ItemState {
  itemName: string;
  itemDescription: string;
  brand: string;
  quantity: string;
  itemImage: string;
}

const initialState: ItemState = {
  itemName: "",
  itemDescription: "",
  brand: "",
  quantity: "",
  itemImage: "",
};

const CreateItem = ({ ...props }) => {
  const [viewMode, setViewMode] = useState("new");
  const [selectedItem, setSelectedItem] = useState(props.selectedItem);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onCreateSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const onCreateError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const onUpdateSucess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const onUpdateError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item Name is required"),
    brand: Yup.string().required("Brand is required"),
    quantity: Yup.string().required("Username is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(appUrl + "items", values)
        .then((response) => onCreateSuccess(response.data))
        .catch((error) => onCreateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="create-component">
      <Card
        title={
          <Typography variant="h6" style={{marginRight:"87%",marginTop:"2%",marginBottom:"1%"}} >
            <b>Add Item</b>
          </Typography>
        }
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="large" className="close-btn" />
          </a>
        }
      >
        <Card>
          <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controls.Input
                  required
                  id="itemName"
                  label="Item Name"
                  {...formik.getFieldProps("itemName")}
                  error={
                    formik.touched.itemName && formik.errors.itemName
                      ? formik.errors.itemName
                      : ""
                  }
                />
                <Controls.Input
                  id="itemDescription"
                  label="Description"
                  multiline
                  {...formik.getFieldProps("itemDescription")}
                  error={
                    formik.touched.itemDescription &&
                    formik.errors.itemDescription
                      ? formik.errors.itemDescription
                      : ""
                  }
                />
                <Controls.Input
                  required
                  id="brand"
                  label="Brand Name"
                  {...formik.getFieldProps("brand")}
                  error={
                    formik.touched.brand && formik.errors.brand
                      ? formik.errors.brand
                      : ""
                  }
                />
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
              <Grid item xs={12}></Grid>
            </Grid>
          </Form>
        </Card>
      </Card>
    </div>
  );
};

export default CreateItem;
