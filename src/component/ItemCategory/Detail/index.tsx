import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { Form } from "../../../commonComponent/Form";
import { Grid, Typography, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const DetailItemCategory = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedItemCategory, setSelectedItemCategory] = useState(
    props.selectedItemCategory
  );


  const image=selectedItemCategory.categoryImage;
  return (
    <div className="create-card">
      <Card
        title={
          <h3
            style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}
          >
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controls.Input
                required
                id="categoryName"
                label="Category"
                disabled
                value={selectedItemCategory.categoryName}
              />

              <Controls.Input
                id="categoryDescription"
                label="Description"
                multiline
                disabled
                value={selectedItemCategory.categoryDescription}
              />
            </Grid>

            <Grid item xs={12}>
                <img alt="Category Image" src={image}/>
            </Grid>
          </Grid>
        </Form>
      </Card>
    </div>
  );
};

export default DetailItemCategory;
