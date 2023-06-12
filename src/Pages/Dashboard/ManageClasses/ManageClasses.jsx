import Swal from "sweetalert2";
import useAllClass from "../../../hooks/useAllClass";
import { useState } from "react";

const ManageClasses = () => {
  const [allClass, refetch] = useAllClass();
  const [clickedItem, setClickedItem] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState(""); //Submit success hole eta empty kore diba 
  console.log("allClass", allClass);

  const handleModal = (item) => {
    setClickedItem(item);
    window.my_modal_3.showModal();
  };
  const handleFeedback = async (id) => {
    console.log("ID and Message",id,feedbackMessage);
    fetch(`http://localhost:5000/classes/feedback/${id}/${feedbackMessage}`, {
      method: "PUT",
    })
    .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Feedback Done',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

    

    setClickedItem({})
    setFeedbackMessage("")
  };

  const handleBtnApproved = (aClass) => {
    fetch(`http://localhost:5000/classes/status/approved/${aClass._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${aClass.classname} is Approved Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleBtnDeny = (aClass) => {
    fetch(`http://localhost:5000/classes/status/deny/${aClass._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${aClass.classname} is Deny !`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  console.log("clickedId", clickedItem);
  return (
    <>
      <h2 className="text-center text-3xl tracking-wider mt-10">
        All Classes Here
      </h2>

      <div className="overflow-x-auto mt-20 p-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Cover</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Approved / Deny </th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {allClass.map((aClass, index) => (
              <tr key={aClass._id}>
                <th> {index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={aClass.photo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{aClass.classname}</td>
                <td>{aClass.insname}</td>
                <td>{aClass.email}</td>
                <td>{aClass.availseats}</td>
                <td>{aClass.price}</td>
                <td>{aClass.classstatus}</td>
                <td>
                  <button
                    onClick={() => handleBtnApproved(aClass)}
                    className="btn btn-ghost bg-lime-800  text-white"
                    disabled={aClass.classstatus === "pending" ? false : true}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleBtnDeny(aClass)}
                    className="btn btn-ghost bg-red-800  text-white mt-5"
                    disabled={aClass.classstatus === "pending" ? false : true}
                  >
                    Deny
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-ghost bg-blue-700  text-white"
                    onClick={() => handleModal(aClass)}
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* You can open the modal using ID.showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-3xl text-center m-5">
            Feedback for {clickedItem?.classname}
          </h3>
          <textarea
            className="w-full "
            cols={6}
            rows={4}
            placeholder="Write feedback"
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
          ></textarea>
          <button onClick={() => handleFeedback(clickedItem._id)} className="btn btn-secondary">
            Submit
          </button>
        </form>
      </dialog>
    </>
  );
};

export default ManageClasses;
