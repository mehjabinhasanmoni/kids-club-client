import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClass from "../Pages/Dashboard/MyClass/MyClass";
import SelectedClass from "../Pages/Dashboard/SelectedClass/SelectedClass";
import EnrolledClass from "../Pages/Dashboard/EnrolledClass/EnrolledClass";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../Pages/Dashboard/Home/AdminHome";
import InstructorHome from "../Pages/Dashboard/Home/InstructorHome";
import StuduntHome from "../Pages/Dashboard/Home/StuduntHome";
import PrivateRoute from "./PrivateRoute";
import AdminRoutes from "./AdminRoutes";
import InstructorRoutes from "./InstructorRoutes";
import StudentRoutes from "./StudentRoutes";
import Classes from "../Pages/Classes/Classes";


 export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/classes',
            element:<Classes></Classes>
        
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children : [
        {
          path: 'manageclasses',
          element: <AdminRoutes><ManageClasses></ManageClasses></AdminRoutes>
        },
        {
          path:'manageusers',
          element:<AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
        },
        {
          path: 'addclass',
          element: <InstructorRoutes><AddClass></AddClass></InstructorRoutes>
        },
        {
          path:'myclass',
          element:<InstructorRoutes><MyClass></MyClass></InstructorRoutes>
        },
        {
          path: 'seletedclass',
          element: <StudentRoutes><SelectedClass></SelectedClass></StudentRoutes>
        },
        {
          path:'enrolledclass',
          element:<StudentRoutes><EnrolledClass></EnrolledClass></StudentRoutes>
        },
        {
          path: 'payment/:id',
          element: <StudentRoutes><Payment></Payment></StudentRoutes>
        },
        {
          path: 'paymentshistory',
          element: <StudentRoutes><PaymentHistory></PaymentHistory></StudentRoutes>
        },
        {
          path:'adminhome',
          element:<AdminRoutes><AdminHome></AdminHome></AdminRoutes>
        },
        {
          path:'instructorhome',
          element:<InstructorRoutes><InstructorHome></InstructorHome></InstructorRoutes>
        },
        {
          path:'studenthome',
          element:<StudentRoutes><StuduntHome></StuduntHome></StudentRoutes>
        },
       
       
      ]
    }
  ]);
