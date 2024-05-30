import React, { useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { Form } from "../../../commonComponent/Form";
import { Grid, Avatar } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { appUrl } from "../../../appurl";

const DetailCustomer = ({ ...props }) => {
  const [detailMode, setDetailMode] = useState(props.detailMode);
  const [selectedCustomer, setSelectedCustomer] = useState(
    props.selectedCustomer
  );

  return (
    <Card
      title={
        <h3 style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}>
          Detail for Customer
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
              src={appUrl + `users/uploads/${selectedCustomer.profileImage}`}
              variant="rounded"
              sx={{ width: 200, height: 150, marginLeft: 5, marginBottom: 8 }}
            ></Avatar>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controls.Input
                  required
                  id="fullName"
                  label="Full Name"
                  disabled
                  value={selectedCustomer.fullName}
                />
                <Controls.Input
                  id="email"
                  label="Email"
                  disabled
                  value={selectedCustomer.email}
                />
                <Controls.Input
                  id="phone"
                  label="Phone"
                  disabled
                  value={selectedCustomer.phone}
                />
                <Controls.Input
                  id="address"
                  label="Address"
                  disabled
                  value={selectedCustomer.address}
                />
                <Controls.Input
                  id="subCity"
                  label="Sub City"
                  disabled
                  value={selectedCustomer.subCity}
                />
                <Controls.Input
                  id="town"
                  label="Town"
                  disabled
                  value={selectedCustomer.town}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};

export default DetailCustomer;
