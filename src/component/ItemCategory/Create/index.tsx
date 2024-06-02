import React, { useEffect, useState } from "react";
import { Card, Button as ButtonAnt } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl } from "../../../appurl";
import axios from "axios";
import { Grid, Button, Avatar } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Notification from "../../../commonComponent/notification";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface ItemState {
  categoryName: string;
  categoryDescription: string;
}

const initialState: ItemState = {
  categoryName: "",
  categoryDescription: "",
};

const CreateItemCategory = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedItemCategory, setSelectedItemCategory] = useState(
    props.selectedItemCategory
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any>();
  const [validFileFormat, setValidFileFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setViewMode(props.viewMode);
    setSelectedItemCategory(props.selectedItemCategory);
    if (props.viewMode === "new") {
      formik.resetForm({
        values: initialState,
      });
    }
  }, [props.viewMode, props.selectedItemCategory]);

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Category is Successfully Added !",
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
      message: "Category is Successfully Updated !",
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
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category is required"),
  });

  const validFile = () => {
    if (fileList == null) {
      setFileRequired(true);
    } else {
      setFileRequired(false);
    }
  };
  const formik = useFormik({
    initialValues: selectedItemCategory,
    onSubmit: (values) => {
      if (viewMode == "new") {
        if (fileList == null) {
          setFileRequired(true);
        } else {
          setFileRequired(false);
          setIsSubmitting(true);
          const formData = new FormData();
          formData.append("file", fileList);
          formData.append("categoryName", values.categoryName);
          formData.append("categoryDescription", values.categoryDescription);
          axios
            .post(appUrl + "itemCategorys", formData)
            .then(() => onCreateSuccess())
            .catch((error) => onCreateError(error.response.data.message));
        }
      } else {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append(
          "file",
          fileList == null ? selectedItemCategory.categoryImage : fileList
        );
        formData.append("categoryName", values.categoryName);
        formData.append("categoryDescription", values.categoryDescription);
        axios
          .put(appUrl + `itemCategorys/${selectedItemCategory.id}`, formData)
          .then(() => onUpdateSuccess())
          .catch((error) => onUpdateError(error.response.data.message));
      }
    },
    validationSchema: validationSchema,
  });

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
    <div className="create-card">
      <Card
        title={
          <h3
            style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}
          >
            {viewMode == "new" ? <b>Add Category</b> : <b>Modify Category</b>}
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
            {/* {viewMode != "new" && (
              <Grid item xs={12}>
                <Avatar
                  variant="rounded"
                  style={{width:"100%", height:"10%"}}
                  src={
                    appUrl +
                    `itemCategorys/uploads/${selectedItemCategory.categoryImage}`
                  }
                ></Avatar>
              </Grid>
            )} */}
            <Grid item xs={6}>
              <Controls.Input
                required
                id="categoryName"
                label="Category"
                {...formik.getFieldProps("categoryName")}
                error={
                  formik.touched.categoryName && formik.errors.categoryName
                    ? formik.errors.categoryName
                    : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                id="categoryDescription"
                label="Description"
                multiline
                {...formik.getFieldProps("categoryDescription")}
                error={
                  formik.touched.categoryDescription &&
                  formik.errors.categoryDescription
                    ? formik.errors.categoryDescription
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Upload
                listType="picture"
                onChange={(response: any) => beforeUpload(response.file)}
                beforeUpload={() => false}
              >
                <ButtonAnt icon={<UploadOutlined translate={undefined} />}>
                  Category Image
                </ButtonAnt>
                <br />
                {validFileFormat ? (
                  <span className="text-danger">
                    Invalid file format, Only jpg, jpeg and png files are
                    allowed!
                  </span>
                ) : null}
                {fileRequired ? (
                  <span className="text-danger">
                    Category Image is required
                  </span>
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

export default CreateItemCategory;
