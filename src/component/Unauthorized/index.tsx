import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Grid, Button } from "@mui/material";

const Unauthorized = ({ ...props }) => {
  const navigate = useNavigate();
  const goBack = () => navigate("/login");

  return (
    <div className="error-message">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            id="message"
            variant="h1"
            component="div"
            color="red"
            gutterBottom
          >
            404
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" color="red">
            Page Not Found
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            startIcon={<LoginIcon />}
            variant="contained"
            color="error"
            onClick={goBack}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Unauthorized;
