import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const [btnDisabled, setBtnDisabled] = useState(false);

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  // handle Admin button

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          setBtnDisabled(true);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  // handle Instructor button

  const handleMakeInstructor = (user) => {
    fetch(`http://localhost:5000/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          setBtnDisabled(true);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an nstructor Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  console.log("users",users);

  return (
    <div className="w-full p-10">
      <h2 className="text-3xl text-bold text-center">
        Total users : {users.length}{" "}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <td>Role</td>
              <td>Change Role</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    disabled={user.role === 'admin'?true:false}
                    className="btn btn-ghost bg-orange-600  text-white mr-5"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleMakeInstructor(user)}
                    disabled={user.role === 'instructor'?true:false}
                    className="btn btn-ghost bg-purple-600  text-white"
                  >
                    Make Instractor
                  </button>
                </td>
                <td>
                  <button className="btn btn-ghost bg-red-600  text-white">
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
