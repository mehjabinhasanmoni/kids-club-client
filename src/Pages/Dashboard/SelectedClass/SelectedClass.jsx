import Swal from "sweetalert2";
import useAllSelectedClass from "../../../hooks/useAllSelectedClass";
import { FaTrashAlt } from "react-icons/fa";

const SelectedClass = () => {
    const [selectedclases, refetch] = useAllSelectedClass();

    const handleBtnDelete = aClass => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://kids-club-server-production.up.railway.app/selectedclases/${aClass._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
        }
    })

    }

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
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Pay </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedclases.map((aClass, index) => (
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
                <td>{aClass.availseats}</td>
                <td>{aClass.price}</td>
                <td>{aClass.classstatus}</td>
                <td>
                  <button
                    onClick={() => handleBtnPay(aClass)}
                    className="btn btn-ghost bg-lime-800  text-white"
                  >
                    Pay
                  </button>
                  
                </td>
                <td>
                <button
                    onClick={() => handleBtnDelete(aClass)}
                    className="btn btn-ghost bg-red-800  text-white mt-5"
                    
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* You can open the modal using ID.showModal() method */}
      {/* <dialog id="my_modal_3" className="modal">
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
      </dialog> */}
    </>
    );
};

export default SelectedClass;