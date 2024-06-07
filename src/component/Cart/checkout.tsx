import { Card } from "antd";
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Grid } from "@mui/material";

const Checkout = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  
  return (
    <div>
      <Card
        title={
          <h4
            style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}
          >
            Checkout
          </h4>
        }
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="small" className="close-btn" />
          </a>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Card></Card>
          </Grid>
          <Grid item xs={3}>
            <Card></Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Checkout;
