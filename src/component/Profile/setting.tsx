import {
  Box,
  AppBar,
  Grid,
  Divider,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import Navmenu from "../Frontpage/mainLayout";
import { useEffect, useState } from "react";
import { Card, Upload, List } from "antd";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { appUrl } from "../../appurl";
import axios from "axios";
import { userService } from "../../polices/userService";
import PersonalProfile from "./personalProfile";
import CustomerChangePaw from "./changePassword";
import DeleteAccount from "./deleteAccount";
import { useNavigate } from "react-router-dom";
import Notification from "../../commonComponent/notification";

const ProfileSetting = ({ ...props }) => {
  const [getKey, setGetKey] = useState(null);
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();
  const [validFormat, setValidFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
  const [isFileSubmitting, setIsFileSubmitting] = useState(false);
  const [imageSize, setImageSize] = useState(false);
  const [viewMode, setViewMode] = useState("personal");
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setResponse(props.response);
  }, [props.response]);

  const onFetchSuccess = (response: any) => {
    setResponse(response);
  };

  const onFetchError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const onDeleteSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const onDeleteError = (response: any) => {
    setNotify({
      isOpen: true,
      message: response,
      type: "error",
    });
  };

  const onUploadSuccess = () => {
    setIsFileSubmitting(false);
    window.location.reload();
  };

  const onUploadError = (error: any) => {
    setIsFileSubmitting(false);
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const beforeUpload = (file: any) => {
    setFileRequired(false);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      setValidFormat(false);
      setLoading(false);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        setImageSize(true);
        setLoading(false);
      } else {
        setImageSize(false);
        setLoading(false);
        setImageUrl(file);
      }
    } else {
      setLoading(false);
      setValidFormat(true);
    }
  };

  const onUploadPhoto = () => {
    if (imageUrl == null) {
      setFileRequired(true);
    } else {
      setFileRequired(false);
      setIsFileSubmitting(true);
      const formDate = new FormData();
      formDate.append("file", imageUrl);
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .put(appUrl + `users/profile/${response.id}`, formDate)
        .then((response: any) => onUploadSuccess())
        .catch((error: any) => onUploadError(error));
    }
  };

  useEffect(() => {
    const userToken = userService.token;
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `users/userInfo/${userToken}`)
      .then((response: any) => onFetchSuccess(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  const settingMenu = [
    {
      id: 1,
      title: "Personal",
      value: "personal",
    },
    {
      id: 2,
      title: "Change Password",
      value: "changePassword",
    },
    {
      id: 3,
      title: "Delete Account",
      value: "deleteAccount",
    },
    {
      id: 4,
      title: "Logout",
      value: "logout",
    },
  ];

  const onLogout = () => {
    localStorage.removeItem("controller");
    localStorage.removeItem("permission");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };

  const deleteProfilePhoto = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .delete(appUrl + `users/deleteProfile/${response.id}`)
      .then((response: any) => onDeleteSuccess(response.data))
      .catch((error: any) => onDeleteError(error));
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Navmenu inputValue={(value: any) => setGetKey(value)} />
        </AppBar>
      </Box>
      <Box sx={{ backgroundColor: "#efefef" }}>
        <div className="setting-container">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card className="setting-title">
                    <h2>Setting</h2>
                    <Divider
                      style={{
                        color: "#f00538",
                        height: 10,
                        marginTop: "-20px",
                      }}
                    ></Divider>
                    <p>
                    Update your personal information and other data by using this setting.
                    </p>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <List
                      className="profile-menu"
                      dataSource={settingMenu}
                      renderItem={(item) => (
                        <List.Item>
                          <button
                            className="btn-menu"
                            onClick={() => {
                              item.value == "logout"
                                ? onLogout()
                                : setViewMode(item.value);
                            }}
                          >
                            {item.title}
                          </button>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card title="Profile">
                    <div className="setting-profile">
                      <div className="img-pp">
                        <Upload
                          className="profile-upload"
                          listType="picture"
                          onChange={(response: any) =>
                            beforeUpload(response.file)
                          }
                          beforeUpload={() => false}
                          onRemove={() => setImageUrl("")}
                        >
                          {response != undefined && (
                            <Tooltip title="Click here to upload">
                              <Avatar
                                sx={{ width: 100, height: 100 }}
                                className="profile-image"
                                src={response.profileImage}
                              ></Avatar>
                            </Tooltip>
                          )}
                          {response == undefined && (
                            <Tooltip title="Click here to upload">
                              <Avatar
                                sx={{ width: 100, height: 100 }}
                                className="profile-image"
                              ></Avatar>
                            </Tooltip>
                          )}
                          <br />
                        </Upload>
                        {validFormat ? (
                          <p className="text-danger pp-upload">
                            Invalid file format, Only jpg, jpeg and png files
                            are allowed!
                          </p>
                        ) : null}
                        {fileRequired ? (
                          <p className="text-danger pp-upload">
                            Please upload new picture first !
                          </p>
                        ) : null}
                      </div>
                      <div className="photo-content">
                        <div className="upload-photo">
                          <Button
                            variant="contained"
                            size="small"
                            color="warning"
                            startIcon={<FileUploadIcon />}
                            onClick={onUploadPhoto}
                            disabled={isFileSubmitting}
                          >
                            {isFileSubmitting
                              ? "Uploading..."
                              : "Upload Picture"}
                          </Button>
                        </div>
                        <div className="remove-photo">
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<DeleteOutlineIcon />}
                            onClick={deleteProfilePhoto}
                          >
                            Delete Picture
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  {viewMode == "personal" && (
                    <Card title="Personal Profile">
                      <div>
                        <PersonalProfile editProfile={response} />
                      </div>
                    </Card>
                  )}
                  {viewMode == "changePassword" && (
                    <Card title="Change Password">
                      <div>
                        <CustomerChangePaw editProfile={response} />
                      </div>
                    </Card>
                  )}
                  {viewMode == "deleteAccount" && (
                    <Card title="Delete Account">
                      <div>
                        <DeleteAccount />
                      </div>
                    </Card>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>
      <Box>
        <div className="copyrightholder">
          <p>&copy; 2024 Egila Gadgets. All rights reserved</p>
        </div>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ProfileSetting;
