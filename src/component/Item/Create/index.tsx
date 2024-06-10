import React, { useEffect, useState } from "react";
import { Card, Button as ButtonAnt } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl, headers } from "../../../appurl";
import axios from "axios";
import { FormControl, Grid, MenuItem, Typography, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Notification from "../../../commonComponent/notification";

interface ItemState {
  itemName: string;
  itemDescription: string;
  brand: string;
  quantity: string;
  price: string;
  categoryId: string;
  itemImage: string;
}

const initialState: ItemState = {
  itemName: "",
  itemDescription: "",
  brand: "",
  quantity: "",
  price: "",
  itemImage: "",
  categoryId: "",
};

const CreateItem = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedItem, setSelectedItem] = useState(props.selectedItem);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any>();
  const [validFileFormat, setValidFileFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
  const [categoryResponse, setCategoryResponse] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setViewMode(props.viewMode);
    setSelectedItem(props.selectedItem);
    if (props.viewMode === "new") {
      formik.resetForm({
        values: initialState,
      });
    }
  }, [props.viewMode, props.selectedItem]);

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Item is Successfully Added !",
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
      message: response,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Item is Successfully Updated !",
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

  const stringRegExp = /^[a-zA-Z_-_ ]*$/;
  const numberRegExp = /^[0-9]*$/;
  const validationSchema = Yup.object().shape({
    itemName: Yup.string()
      .required("Item Name is required")
      .matches(
        stringRegExp,
        "Please insert using alphabet letters and character(_-) ! "
      ),
    brand: Yup.string()
      .required("Brand is required")
      .matches(
        stringRegExp,
        "Please insert using alphabet letters and character(_-) ! "
      ),
    quantity: Yup.string()
      .required("Quantity is required")
      .matches(numberRegExp, "Please insert using number only ! "),
    price: Yup.string()
      .required("Price is required")
      .matches(numberRegExp, "Please insert using number only ! "),
    categoryId: Yup.string().required("Category is required"),
  });

  const validFile = () => {
    if (fileList == null) {
      setFileRequired(true);
    } else {
      setFileRequired(false);
    }
  };

  const formik = useFormik({
    initialValues: selectedItem,
    onSubmit: (values) => {
      if (viewMode == "new") {
        if (fileList == null) {
          setFileRequired(true);
        } else {
          setFileRequired(false);
          setIsSubmitting(true);
          const formData = new FormData();
          formData.append("file", fileList);
          formData.append("itemName", values.itemName);
          formData.append("itemDescription", values.itemDescription);
          formData.append("brand", values.brand);
          formData.append("quantity", values.quantity);
          formData.append("price", values.price);
          formData.append("categoryId", values.categoryId);
          axios
            .create({
            headers: {
              Authorization: `Bearer ${headers}`,
            },
          })
            .post(appUrl + "items", formData)
            .then(() => onCreateSuccess())
            .catch((error) => onCreateError(error.response.data.message));
        }
      } else {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append(
          "file",
          fileList == null ? selectedItem.itemImage : fileList
        );
        formData.append("itemName", values.itemName);
        formData.append("itemDescription", values.itemDescription);
        formData.append("brand", values.brand);
        formData.append("quantity", values.quantity);
        formData.append("price", values.price);
        formData.append("categoryId", values.categoryId);
        axios
          .create({
            headers: {
              Authorization: `Bearer ${headers}`,
            },
          })
          .put(appUrl + `items/${selectedItem.id}`, formData)
          .then(() => onUpdateSuccess())
          .catch((error) => onUpdateError(error.response.data.message));
      }
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    axios
      .create({
            headers: {
              Authorization: `Bearer ${headers}`,
            },
          })
      .get(appUrl + "itemCategorys")
      .then((response) => setCategoryResponse(response.data))
      .catch((error) => setCategoryResponse(error.response.data.message));
  }, []);

  const beforeUpload = (file: any): any => {
    if (
      file.type === "image/jpg" ||
      file.type == "image/jpeg" ||
      file.type == "image/png"
    ) {
      setValidFileFormat(false);
      setFileRequired(false);
      setFileList(file);
    } else {
      setValidFileFormat(true);
    }
  };

  return (
    <div className="create-component">
      <Card
        title={
          <h3
            style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}
          >
            {viewMode == "new" ? <b>Add Item</b> : <b>Modify Item</b>}
          </h3>
        }
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="medium" className="close-btn" />
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
                  label="Brand"
                  {...formik.getFieldProps("brand")}
                  error={
                    formik.touched.brand && formik.errors.brand
                      ? formik.errors.brand
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
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
                <Controls.Input
                  required
                  id="price"
                  label="Price (ETB)"
                  {...formik.getFieldProps("price")}
                  error={
                    formik.touched.price && formik.errors.price
                      ? formik.errors.price
                      : ""
                  }
                />

                <FormControl variant="outlined" className="selectbox">
                  <Controls.Input
                    select
                    id="categoryId"
                    required
                    label="Category"
                    {...formik.getFieldProps("categoryId")}
                    error={
                      formik.touched.categoryId && formik.errors.categoryId
                        ? formik.errors.categoryId
                        : ""
                    }
                  >
                    {categoryResponse.map((value: any) => {
                      return (
                        <MenuItem value={value.id}>
                          {value.categoryName}
                        </MenuItem>
                      );
                    })}
                  </Controls.Input>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Upload
                  listType="picture"
                  onChange={(response: any) => beforeUpload(response.file)}
                  beforeUpload={() => false}
                >
                  <ButtonAnt icon={<UploadOutlined translate={undefined} />}>
                    Item Image
                  </ButtonAnt>
                  <br />
                  {validFileFormat ? (
                    <span className="text-danger">
                      Invalid file format, Only jpg, jpeg and png files are
                      allowed!
                    </span>
                  ) : null}
                  {fileRequired ? (
                    <span className="text-danger">Item Image is required</span>
                  ) : null}
                </Upload>
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
                  <Button
                    className="send-btn"
                    variant="contained"
                    type="submit"
                  >
                    Update
                  </Button>
                )}
              </div>
            )}
          </Form>
        </Card>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default CreateItem;
