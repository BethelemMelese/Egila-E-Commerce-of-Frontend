import React, { useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { Form } from "../../../commonComponent/Form";
import { Grid } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { appUrl } from "../../../appurl";

const DetailItemCategory = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedItemCategory, setSelectedItemCategory] = useState(
    props.selectedItemCategory
  );

  return (
    <Card
      title={
        <h3 style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}>
          Detail for Category
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
          alt="Category Image"
          src={
            appUrl +
            `itemCategorys/uploads/${selectedItemCategory.categoryImage}`
          }
          width="20%"
          style={{ maxHeight: "50%", borderRadius: "5%", float: "left" }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controls.Input
              required
              id="categoryName"
              label="Category"
              disabled
              value={selectedItemCategory.categoryName}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              id="categoryDescription"
              label="Description"
              multiline
              disabled
              value={selectedItemCategory.categoryDescription}
            />
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};

export default DetailItemCategory;
