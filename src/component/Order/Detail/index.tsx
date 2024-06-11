import { Card, List } from "antd";
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Avatar, Divider, Grid, Paper, Tooltip } from "@mui/material";
import { appUrl } from "../../../appurl";

const DetailOrder = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedOrder, setSelectedOrder] = useState<any>(props.selectedOrder);

  const CartList = [
    {
      id: 1,
      itemName: "Item One",
      itemDescription: "Item One Description",
      price: 200,
      quantity: 5,
      brand: "The First Item One Brand",
      itemImage: "carlos-muza.jpg",
    },
    {
      id: 2,
      itemName: "Item One",
      itemDescription: "Item One Description",
      price: 200,
      quantity: 5,
      brand: "The First Item One Brand",
      itemImage: "carlos-muza.jpg",
    },
    {
      id: 3,
      itemName: "Item One",
      itemDescription: "Item One Description",
      price: 200,
      quantity: 5,
      brand: "The First Item One Brand",
      itemImage: "carlos-muza.jpg",
    },
    {
      id: 4,
      itemName: "Item One",
      itemDescription: "Item One Description",
      price: 200,
      quantity: 5,
      brand: "The First Item One Brand",
      itemImage: "carlos-muza.jpg",
    },
  ];

  return (
    <div>
      <Card
        title="Assign Delivery Person for the Order"
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="medium" className="close-btn" />
          </a>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card title="Customer Info">
              <Grid item xs={12}>
                <p>
                  Order Owner: <b>{selectedOrder.orderOwner}</b>
                </p>
                <Divider
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
                <p>
                  Owner Phone: <b>{selectedOrder.orderPhone}</b>
                </p>
                <Divider
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
                <p>
                  Total Amount: <b>{selectedOrder.totalAmount}</b>
                </p>
                <Divider
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
                <p>
                  Shopping Address: <b>{selectedOrder.shoppingAddress}</b>
                </p>
                <Divider
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
                <p>
                  Order Date: <b>{selectedOrder.orderDate}</b>
                </p>
                <Divider
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
                <p>
                  Order Status: <b>{selectedOrder.orderStatus}</b>
                </p>
                <Divider
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card
              title="List of Item"
              style={{ height: 550, overflow: "auto" }}
            >
              {CartList.map((item: any) => {
                return (
                  <div style={{ marginTop: 10 }}>
                    <Card>
                      <Grid container spacing={4}>
                        <Grid item xs={4}>
                          <img
                            alt="Items Image"
                            src={appUrl + `items/uploads/${item.itemImage}`}
                            style={{
                              height: 100,
                              marginTop: 20,
                              width: 100,
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <h3>{item.itemName}</h3>
                          <p style={{ marginTop: -10 }}>
                            {item.itemDescription}
                          </p>
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
                  </div>
                );
              })}
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card title="To Assign Deliveries"></Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default DetailOrder;
