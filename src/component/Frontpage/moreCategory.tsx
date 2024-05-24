import React, { useState } from "react";
import { Card } from "antd";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Grid } from "@mui/material";
import Images2 from "../../Images/pcs.jpg";
import Images3 from "../../Images/brad-pouncy.jpg";
import { List, Space } from "antd";

const itemModeData = [
  {
    id: 1,
    itemName: "Item One",
    itemDescription: "Item One Description",
    quantity: 4,
    brand: "New Brand",
  },
  {
    id: 2,
    itemName: "Item One",
    itemDescription: "Item One Description",
    quantity: 4,
    brand: "New Brand",
  },
  {
    id: 3,
    itemName: "Item One",
    itemDescription: "Item One Description",
    quantity: 4,
    brand: "New Brand",
  },
  {
    id: 4,
    itemName: "Item One",
    itemDescription: "Item One Description",
    quantity: 4,
    brand: "New Brand",
  },
];

const MoreCategory = ({ ...props }) => {
  const [selectedMore, setSelectedMore] = useState(props.selectedMore);

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
                    src={Images2}
                    alt="Category Image"
                    width="300"
                    height="250"
                    className="detail-img"
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* <Card title={<b>{selectedMore.categoryName}</b>}> */}
                  {/* <h5>{selectedMore.categoryDescription}</h5> */}
                  <h4>
                    <b>{selectedMore.categoryName}</b>
                  </h4>
                  <br />
                  <p>
                    We supply a series of design principles, practical patterns
                    and high quality design resources (Sketch and Axure), to
                    help people create their product prototypes beautifully and
                    efficiently.
                  </p>
                  {/* </Card> */}
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
                dataSource={itemModeData}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    extra={
                      <img
                        width="100"
                        height="100"
                        alt="Item Image"
                        src={Images3}
                      />
                    }
                  >
                    <List.Item.Meta
                      title={item.itemName}
                      description={item.itemDescription}
                    />
                    Brand: {item.brand}
                    <br/>
                    Quantity: {item.quantity}
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
