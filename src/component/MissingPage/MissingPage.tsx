import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Grid } from "@mui/material";

const Missing = ({ ...props }) => {
  const navigate = useNavigate();
  const goBack = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  const goBackHome = () => {
    navigate("/egila/home");
  };

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
          <Typography variant="h3" color="red">
            PAGE NOT FOUND
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            The page you are looking for might have been removed
          </Typography>
          <Typography variant="h6">
            had its name changed or is unavailable.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button color="error" onClick={goBack} variant="contained">
            Go To Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={goBackHome} color="error" variant="outlined">
            Go To Home
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Missing;
