import React, { useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { Form } from "../../../commonComponent/Form";
import { Grid, Avatar } from "@mui/material";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import { appUrl } from "../../../appurl";

const DetailAdmin = ({ ...props }) => {
  const [selectedAdmin, setSelectedAdmin] = useState(props.selectedAdmin);
  return (
    <Card
      title={
        <h3 style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}>
          Detail for Admin
        </h3>
      }
      extra={
        <a onClick={() => props.closeedit()}>
          <CancelOutlined fontSize="medium" className="close-btn" />
        </a>
      }
    >
      <Form autoCpmplete="off">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            {selectedAdmin.profileImage != undefined ? (
              <Avatar
                src={appUrl + `users/uploads/${selectedAdmin.profileImage}`}
                variant="rounded"
                sx={{ width: 200, height: 150, marginLeft: 5, marginBottom: 8 }}
              ></Avatar>
            ) : (
              <Avatar
                variant="rounded"
                sx={{ width: 200, height: 150, marginLeft: 5, marginBottom: 8 }}
              />
            )}
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controls.Input
                  id="fullName"
                  label="Full Name"
                  disabled
                  value={selectedAdmin.fullName}
                />
                <Controls.Input
                  id="email"
                  label="Email"
                  disabled
                  value={selectedAdmin.email}
                />
                <Controls.Input
                  id="username"
                  label="Username"
                  disabled
                  value={selectedAdmin.username}
                />
                <Controls.Input
                  id="phone"
                  label="Phone"
                  disabled
                  value={selectedAdmin.phone}
                />
                <Controls.Input
                  id="address"
                  label="Address"
                  disabled
                  value={selectedAdmin.address}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};

export default DetailAdmin;
