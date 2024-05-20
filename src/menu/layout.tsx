import Topbar from "./TobBar";
import { Content } from "antd/es/layout/layout";

export default (props: any) => {
  return (
    <div>
      <Topbar />
      {/* <Content>{props.children}</Content> */}
    </div>
  );
};
