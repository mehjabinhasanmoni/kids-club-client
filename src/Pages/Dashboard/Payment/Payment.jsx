import { useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState({})
  const price = parseFloat((classInfo.price).toFixed(2))
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

      <Elements stripe = {stripePromise}>
            <CheckoutForm price={price}></CheckoutForm>
      </Elements>
      

    </>
  );
};

export default Payment;
