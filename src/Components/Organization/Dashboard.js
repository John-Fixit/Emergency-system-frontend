
import "../../Styles/dashboard.css";
import { MdMessage } from "react-icons/md";
import Card from "./DashboardComponents/Card";

function Dashboard() {
  return (
    <>
      <div className="dashboard_component">
        <h2 className="fw-bold">Dashboard</h2>
        <div className="row">
          <div className="col-lg-4">
            <Card
              icon={<MdMessage size={60} color="blue" />}
              name={"Messages"}
              quality={1020}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
