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
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children : [
        {
          path: 'manageclasses',
          element: <ManageClasses></ManageClasses>
        },
        {
          path:'manageusers',
          element:<ManageUsers></ManageUsers>
        },
        {
          path: 'addclass',
          element: <AddClass></AddClass>
        },
        {
          path:'myclass',
          element:<MyClass></MyClass>
        },
        {
          path: 'seletedclass',
          element: <SelectedClass></SelectedClass>
        },
        {
          path:'enrolledclass',
          element:<EnrolledClass></EnrolledClass>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path:'myclass',
          element:<PaymentHistory></PaymentHistory>
        },
        {
          path:'adminhome',
          element:<AdminHome></AdminHome>
        },
        {
          path:'instructorhome',
          element:<InstructorHome></InstructorHome>
        },
        {
          path:'studenthome',
          element:<StuduntHome></StuduntHome>
        },
       
       
      ]
    }
  ]);
