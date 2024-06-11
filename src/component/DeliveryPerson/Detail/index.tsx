import React, { useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { Form } from "../../../commonComponent/Form";
import { Grid, Avatar } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { appUrl } from "../../../appurl";

const DetailDeliveryPerson = ({ ...props }) => {
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(
    props.selectedDeliveryPerson
  );

  return (
    <Card
      title={
        <h3 style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}>
          Detail for Deliveries
        </h3>
      }
      extra={
        <a onClick={() => props.closeedit()}>
          <CancelOutlinedIcon fontSize="medium" className="close-btn" />
        </a>
      }
    >
      <Form autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar
              src={
                appUrl + `users/uploads/${selectedDeliveryPerson.profileImage}`
              }
              variant="rounded"
              sx={{ width: 20, height: 150, marginLeft: 5, marginBottom: 8 }}
            >
              {" "}
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controls.Input
                  required
                  id="fullName"
                  label="Full Name"
                  disabled
                  value={selectedDeliveryPerson.fullName}
                />
                <Controls.Input
                  id="email"
                  label="Email"
                  disabled
                  value={selectedDeliveryPerson.email}
                />
                <Controls.Input
                  id="username"
                  label="Username"
                  disabled
                  value={selectedDeliveryPerson.username}
                />
                <Controls.Input
                  id="phone"
                  label="Phone"
                  disabled
                  value={selectedDeliveryPerson.phone}
                />
                <Controls.Input
                  id="address"
                  label="Address"
                  disabled
                  value={selectedDeliveryPerson.address}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};

export default DetailDeliveryPerson;
