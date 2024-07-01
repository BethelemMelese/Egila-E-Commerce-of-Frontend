import React, { useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { Form } from "../../../commonComponent/Form";
import { Grid, Avatar } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { appUrl, token } from "../../../appurl";

const DetailSalesPerson = ({ ...props }) => {
  const [detailMode, setDetailMode] = useState(props.detailMode);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState(
    props.selectedSalesPerson
  );

  return (
    <Card
      title={
        <h3 style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}>
          Detail for SalesPerson
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
            {selectedSalesPerson.profileImage != undefined ? (
              <Avatar
                src={
                  appUrl + `users/uploads/${selectedSalesPerson.profileImage}`
                }
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
                  required
                  id="fullName"
                  label="Full Name"
                  disabled
                  value={selectedSalesPerson.fullName}
                />
                <Controls.Input
                  id="email"
                  label="Email"
                  disabled
                  value={selectedSalesPerson.email}
                />
                <Controls.Input
                  id="username"
                  label="Username"
                  disabled
                  value={selectedSalesPerson.username}
                />
                <Controls.Input
                  id="phone"
                  label="Phone"
                  disabled
                  value={selectedSalesPerson.phone}
                />
                <Controls.Input
                  id="address"
                  label="Address"
                  disabled
                  value={selectedSalesPerson.address}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};

export default DetailSalesPerson;
