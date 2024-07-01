import { useEffect, useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { Form } from "../../../commonComponent/Form";
import { Grid } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { appUrl, token } from "../../../appurl";
import axios from "axios";

const ViewIssueReport = ({ ...props }) => {
  const [selectedOrder, setSelectedOrder] = useState(props.selectedOrder);
  const [response, setResponse] = useState<any>();
  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `issuesReports/${selectedOrder.id}`)
      .then((response: any) => setResponse(response.data))
      .catch((error) => setResponse(error.response.data.message));
  }, []);

  return (
    <Card
      title={
        <h3 style={{ marginRight: "87%", marginTop: "2%", marginBottom: "1%" }}>
          Detail of Issue Report
        </h3>
      }
      extra={
        <a onClick={() => props.closeedit()}>
          <CancelOutlinedIcon fontSize="medium" className="close-btn" />
        </a>
      }
    >
      {response != undefined && (
        <Form autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Controls.Input
                required
                id="issuesName"
                label="Issue Name"
                disabled
                value={response.issueName}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                id="issueDescription"
                label="Description"
                multiline
                disabled
                value={response.issueDescription}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Card>
  );
};

export default ViewIssueReport;
