import React, { useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { Form } from "../../../commonComponent/Form";
import { Grid } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { appUrl, token } from "../../../appurl";

const DetailItem = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedItem, setSelectedItem] = useState(props.selectedItem);

  return (
    <Card
      title={
        <h3 style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}>
          Detail for Item
        </h3>
      }
      extra={
        <a onClick={() => props.closeedit()}>
          <CancelOutlinedIcon fontSize="medium" className="close-btn" />
        </a>
      }
    >
      <Form autoComplete="off">
        <img
          alt="Item Image"
          src={selectedItem.itemImage}
          width="20%"
          style={{ maxHeight: "50%", borderRadius: "5%", float: "left" }}
        />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Controls.Input
              required
              id="itemName"
              label="Item"
              disabled
              value={selectedItem.itemName}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              id="categoryName"
              label="Category"
              multiline
              disabled
              value={selectedItem.categoryName}
            />
          </Grid>

          <Grid item xs={6}>
            <Controls.Input
              id="brand"
              label="Brand"
              multiline
              disabled
              value={selectedItem.brand}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              id="quantity"
              label="Quantity"
              multiline
              disabled
              value={selectedItem.quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              id="price"
              label="Price (ETB)"
              multiline
              disabled
              value={selectedItem.price}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              id="itemDescription"
              label="Description"
              multiline
              disabled
              value={selectedItem.itemDescription}
            />
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};

export default DetailItem;
