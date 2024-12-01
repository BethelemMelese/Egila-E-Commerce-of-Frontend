import { Button, Grid } from "@mui/material";
import axios from "axios";
import { appUrl } from "../../appurl";
import { useEffect, useState } from "react";
import { userService } from "../../polices/userService";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({ ...props }) => {
  const [response, setResponse] = useState<any>();
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const userToken = userService.token;
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `users/userInfo/${userToken}`)
      .then((response: any) => onFetchSuccess(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  const onFetchSuccess = (response: any) => {
    setResponse(response);
  };

  const onFetchError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const onDeleteSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      localStorage.removeItem("controller");
      localStorage.removeItem("permission");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  const onDeleteError = (response: any) => {
    setNotify({
      isOpen: true,
      message: response,
      type: "error",
    });
  };

  const onDelete = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .delete(appUrl + `users/deleteAccount/${response.id}`)
      .then((response) => {
        onDeleteSuccess(response.data);
      })
      .catch((error) => onDeleteError(error.response.data.message));
  };

  return (
    <div className="deleteAcc-container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Are you sure you want to delete this account?</h3>
          <p>
            We are so sorry for losing you. Once you delete your account, you
            can't able to access it again
          </p>
        </Grid>
        <Grid item xs={12}>
          <Button
            className="btn-delete-account"
            color="error"
            size="small"
            variant="contained"
            onClick={onDelete}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeleteAccount;
