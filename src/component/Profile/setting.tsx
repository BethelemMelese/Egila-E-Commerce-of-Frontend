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
import { Card, Upload, Button as ButtonAnt, List, Typography } from "antd";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { appUrl } from "../../appurl";
import axios from "axios";
import { userService } from "../../polices/userService";
import PersonalProfile from "./personalProfile";
import CustomerChangePaw from "./changePassword";
import DeleteAccount from "./deleteAccount";
import { useNavigate } from "react-router-dom";

const ProfileSetting = () => {
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
                      use to this setting to update your personal info and other
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
                          {validFormat ? (
                            <span className="text-danger">
                              Invalid file format, Only jpg, jpeg and png files
                              are allowed!
                            </span>
                          ) : null}
                          {fileRequired ? (
                            <span className="text-danger">
                              Please upload new picture first !
                            </span>
                          ) : null}
                        </Upload>
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
                              : "Change Picture"}
                          </Button>
                        </div>
                        <div className="remove-photo">
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<DeleteOutlineIcon />}
                            onClick={() => window.location.reload()}
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
                        <DeleteAccount/>
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
    </div>
  );
};

export default ProfileSetting;
