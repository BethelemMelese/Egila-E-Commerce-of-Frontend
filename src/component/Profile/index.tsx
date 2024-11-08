import { Avatar, Button, Divider } from "@mui/material";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ ...props }) => {
  const [currentCustomer, setCurrentCustomer] = useState(props.currentCustomer);
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-image">
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={currentCustomer.profileImage}
        ></Avatar>
        <h3>@Username: {currentCustomer.username}</h3>
      </div>
      <Divider
        style={{
          color: "#f00538",
          height: 10,
        }}
      ></Divider>
      <div className="profile-personal">
        <h3>Personal Info</h3>
        <div className="info-date">
          <p>Name: {currentCustomer.fullName}</p>
          <p>Email: {currentCustomer.email}</p>
          <p>Phone: {currentCustomer.phone}</p>
        </div>
      </div>
      <Divider
        style={{
          color: "#f00538",
          height: 10,
        }}
      ></Divider>
      <div className="profile-personal">
        <h3>Address Info</h3>
        <div className="info-date">
          <p>Address: {currentCustomer.address}</p>
          <p>Sub-city: {currentCustomer.subCity}</p>
          {currentCustomer.town == "" ? (
            ""
          ) : (
            <p>Town: {currentCustomer.town}</p>
          )}
        </div>
      </div>
      <Divider
        style={{
          color: "#f00538",
          height: 10,
        }}
      ></Divider>
      <div className="profile-setting">
        <Button
          className="btn-setting"
          variant="outlined"
          color="error"
          size="small"
          startIcon={<SettingsIcon />}
          onClick={() => navigate("/profileSetting")}
        >
          Setting
        </Button>
      </div>
    </div>
  );
};

export default ProfileView;
