import { Button, TextField } from "@mui/material";
import { Card } from "antd";
import { useState } from "react";
import values from "./value";
import axios from "axios";
import { appUrl } from "../../appurl";

const SampleExample = () => {
  const [inputOne, setInputOne] = useState<String>("");
  const [inPutTwo, setInputTwo] = useState("");
  const User = "user";

  const mokeDate = [
    {
      id: 1,
      name: "One",
    },
    {
      id: 2,
      name: "Two",
    },
  ];
  const onSubmit = () => {
    const jsonData = {
      username: inputOne,
      password: inPutTwo,
    };
    axios
      .post(appUrl + User, jsonData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <Card title="Sample Example">
          <form>
            <div>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={inputOne}
                onChange={(event: any) => setInputOne(event.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={inPutTwo}
                onChange={(event: any) => setInputTwo(event.target.value)}
              />
              <Button variant="contained" onClick={onSubmit}>
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SampleExample;
