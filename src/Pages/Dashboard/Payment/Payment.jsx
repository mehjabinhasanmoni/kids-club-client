import { useState } from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState({})
  fetch(
    `https://kids-club-server-production.up.railway.app/selectedclass/${id}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      //   console.log("actual response",res());
      return res.json();
    })
    .then((data) => {
        setClassInfo(data);
    });

  return (
    <>
      <h2 className="text-center text-3xl tracking-wider my-10 ">Payment for</h2>
      <div className="w-full p-5  border-2 border-black bg-blue-500 flex justify-around items-center">
        <p>Class Name : {classInfo.classname}</p>
        <p>Amount : {classInfo.price}</p>
      </div>

    </>
  );
};

export default Payment;
