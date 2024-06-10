import React from "react";
export const appUrl = "http://localhost:5000/api/";

const token = localStorage.getItem("token");
export const headers = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
