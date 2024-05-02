import { createBrowserHistory } from "history";

const baseUrl = document
  .getElementsByTagName("base")[0]
  .getAttribute("href") as string;
export const browserHistory = createBrowserHistory({});
