import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";



const Dashboard = () => {
  // const isAdmin = true;
  // const isInstructor = true;

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  console.log("Instructor check : ",isInstructor);


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}

        <Outlet></Outlet>

        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}

          {isAdmin ? (
            <>
            <li>
                <NavLink to="adminhome">Admin Home</NavLink>
              </li>
              <li>
                <NavLink to="manageclasses">Manage Classes</NavLink>
              </li>
              <li>
                <NavLink to="manageusers">Manage Users</NavLink>
              </li>
            </>
          ) : isInstructor ? (
            <>
            <li>
                <NavLink to="instructorhome">Instructor Home</NavLink>
              </li>
              <li>
                <NavLink to="addclass">Add a Classes</NavLink>
              </li>
              <li>
                <NavLink to="myclass">My Classes</NavLink>
              </li>
            </>
          ) : (
            <>
            <li>
                <NavLink to="studenthome">Student Home</NavLink>
              </li>
              <li>
                <NavLink to="seletedclass">Selected Classes</NavLink>
              </li>
              <li>
                <NavLink to="enrolledclass">Enrolled Classes</NavLink>
              </li>
              <li>
                <NavLink to="paymentshistory">Payment History</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
