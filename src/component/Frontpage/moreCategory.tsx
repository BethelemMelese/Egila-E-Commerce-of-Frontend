import React, { useEffect, useState } from "react";
import { Card } from "antd";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Grid, Paper } from "@mui/material";
import { List, Space } from "antd";
import axios from "axios";
import { appUrl } from "../../appurl";

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

  console.log("response...", response);

  useEffect(() => {
    axios
      .get(appUrl + `items/categoryId/${selectedMore.id}`)
      .then((response) => setResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, []);

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
