import React, { useEffect, useState } from "react";
import { Card } from "antd";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Button, Grid, Paper, Tooltip } from "@mui/material";
import { List, Space } from "antd";
import axios from "axios";
import { appUrl } from "../../appurl";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { v4 as uuidv4 } from "uuid";

const MoreCategory = ({ ...props }) => {
  const [selectedMore, setSelectedMore] = useState(props.selectedMore);
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
    axios
      .get(appUrl + `items/categoryId/${selectedMore.id}`)
      .then((response) => setResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, []);

  const OnAddCart = (item: any) => {
    const uuid = uuidv4();
    const sessionCartId = localStorage.getItem("UUCartId");
    let data;
    if (sessionCartId == null) {
      data = {
        itemId: item,
        quantity: 1,
        uuId: uuid,
      };
      localStorage.setItem("UUCartId", uuid);
    } else {
      data = {
        itemId: item,
        quantity: 1,
        uuId: sessionCartId,
      };
    }
    axios
      .post(appUrl + "carts", data)
      .then((response) => window.location.reload())
      .catch((error) => onFetchError(error.response.data.message));
  };

  return (
    <div>
      <Card
        title="More"
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="medium" className="close-btn" />
          </a>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <img
                    src={
                      appUrl +
                      `itemCategorys/uploads/${selectedMore.categoryImage}`
                    }
                    alt="Category Image"
                    width="300"
                    height="200"
                    className="detail-img"
                  />
                </Grid>
                <Grid item xs={6}>
                  <h4>
                    <b>{selectedMore.categoryName}</b>
                  </h4>
                  <br />
                  <p>{selectedMore.categoryDescription}</p>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card title="Items in this Category">
              <List
                itemLayout="vertical"
                size="small"
                pagination={{
                  pageSize: 2,
                }}
                dataSource={response}
                renderItem={(item: any) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Tooltip title="Add To Cart">
                        <Button
                          variant="text"
                          size="small"
                          className="more-btn"
                          color="warning"
                          onClick={() => OnAddCart(item.id)}
                        >
                          <AddShoppingCartIcon />
                        </Button>
                      </Tooltip>,
                    ]}
                    extra={
                      <Paper elevation={1}>
                        <img
                          width={272}
                          height={200}
                          alt="Item Image"
                          src={appUrl + `items/uploads/${item.itemImage}`}
                        />
                      </Paper>
                    }
                  >
                    <List.Item.Meta
                      title={item.itemName}
                      description={item.itemDescription}
                    />
                    Brand: {item.brand}
                    <br />
                    Quantity: {item.quantity}
                    <br />
                    <h4>
                      <b>Price: {item.price}</b>{" "}
                    </h4>
                  </List.Item>
                )}
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default MoreCategory;
