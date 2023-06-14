import { useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState({});
  // const price = classInfo?.price ? parseFloat(classInfo?.price) : 0;
  const price = classInfo?.price;
  fetch(
    `https://kids-club-server-production.up.railway.app/selectedclass/${id}`,
    {
        method : 'GET'
    })
    .then((res) => res.json())
    .then((data) => {
        setClassInfo(data);
    })
    .catch(error =>{
      console.log(error);
    })

  return (
    <>
      <h2 className="text-center text-3xl tracking-wider my-10 ">Payment for</h2>
      <div className="w-full p-5  border-2 border-black bg-blue-500 flex justify-around items-center">
        <p>Class Name : {classInfo.classname}</p>
        <p>Amount : {classInfo.price}</p>
      </div>

      <Elements stripe = {stripePromise}>
            <CheckoutForm classInfo={classInfo} price={price}></CheckoutForm>
      </Elements>
      

    </>
  );
};

export default Payment;
