import { userService } from "../../polices/userService";
import MainDashboard from "./mainDashboard";

const Home = () => {
  const role = userService.currentRole;
  return (
    <div className="home-container">
      <div className="home-page">
        <MainDashboard />
      </div>
    </div>
  );
};

export default Home;
