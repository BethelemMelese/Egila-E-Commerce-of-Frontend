import { userService } from "../../polices/userService";
import MainDashboard from "./mainDashboard";
import CustomerDashboard from "./customerDashboard";

const Home = () => {
  const role = userService.currentRole;
  return (
    <div className="home-container">
      <div className="home-page">
        {role == "Customer" && <CustomerDashboard />}
        {role != "Customer" && <MainDashboard />}
      </div>
    </div>
  );
};

export default Home;
