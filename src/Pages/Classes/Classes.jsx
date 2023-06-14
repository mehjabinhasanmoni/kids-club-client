import Swal from "sweetalert2";
import useApprovedClasses from "../../hooks/useApprovedClasses";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Classes = () => {
  const [approvedclasses] = useApprovedClasses();
  console.log("approved Classes", approvedclasses);
  const { user  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('');

// get user info from localstroage

useEffect(() => {
  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(userInfoString);
  
  if (userInfo && userInfo.role) {
    setRole(userInfo.role);
  }
}, []);

// console.log('User Role is: ', role);


  const handleAddClass = (aClass) => {
    console.log("approved Classes in handle", aClass);
    if (user && role=='student') {
      const selectClass = {
        selectedClassId: aClass._id,
        classname: aClass.classname,
        photo: aClass.photo,
        insname: aClass.insname,
        price: aClass.price,
        availseats: aClass.availseats,
        status: 'pending',
        email: user.email,
      };
      fetch(
        "https://kids-club-server-production.up.railway.app/selectedclases",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectClass),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              title: "Class Added Successfull",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to select this Class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className=" grid grid-cols-4 gap-10 my-10">
      {approvedclasses.map((aClass, index) => {
        return (
          <div key={index} className={`card w-96 ${parseInt(aClass.availseats)>0?'bg-sky-200':'bg-red-400'}  shadow-xl`}>
            <figure className="px-10 pt-10">
              <img
                src={aClass.photo}
                alt="Classs Image"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{aClass.classname}</h2>
              <p>{aClass.insname}</p>
              <p>Available Seats : {aClass.availseats}</p>
              <p>Price : {aClass.price}</p>
           
             { ((role=='' || role=='student') && parseInt(aClass.availseats)>0)  ? <div className="card-actions">
                <button
                  onClick={() => handleAddClass(aClass)}
                  className="btn btn-secondary"
                >
                  Select Class
                </button>
              </div> : <> </>
              }
      
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Classes;
