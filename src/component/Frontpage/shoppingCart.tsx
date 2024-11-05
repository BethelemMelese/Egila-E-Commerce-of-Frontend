import { Button, Grid, Paper } from "@mui/material";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { appUrl } from "../../appurl";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState<any>([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onFetchError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  useEffect(() => {
    const uuId = localStorage.getItem("UUCartId");
    axios
      .get(appUrl + "carts/viewCart/" + uuId)
      .then((response) => setResponse(response.data.cartList))
      .catch((error) => onFetchError(error.response.data.message));
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ height: 550, overflow: "auto" }}>
          {response.map((item: any) => {
            return (
              <div style={{ marginTop: 20 }}>
                <Paper>
                  <Card>
                    <Grid container spacing={4}>
                      <Grid item xs={4}>
                        <img
                          alt="Items Image"
                          src={item.itemImage}
                          style={{
                            height: 100,
                            marginTop: 20,
                            width: 100,
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <h3>{item.itemName}</h3>
                        {/* <p style={{ marginTop: -10 }}>{item.itemDescription}</p> */}
                        <b>
                          <p style={{ marginTop: -10 }}>
                            Quantity: {item.quantity}
                          </p>
                        </b>
                        <b>
                          <p style={{ float: "right", marginTop: -10 }}>
                            Price: {item.price}
                          </p>
                          <br />
                          <p
                            style={{
                              float: "right",
                              marginTop: -10,
                              marginLeft: "18%",
                            }}
                          >
                            Sub Total: {item.subTotal}
                          </p>
                        </b>
                      </Grid>
                    </Grid>
                  </Card>
                </Paper>
              </div>
            );
          })}
        </Grid>
        {response.length != 0 && (
          <Grid item xs={12}>
            <Button
              className="send-btn"
              variant="contained"
              fullWidth
              onClick={() => navigate("/viewCart")}
            >
              View Cart
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ShoppingCart;
