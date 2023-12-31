import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ classInfo, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    console.log("payment intent", paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      var availseats = 0;
      var totalenrolledstudents = 0;
      //   available seat update
      fetch(
        `https://kids-club-server-production.up.railway.app/singleClass/${classInfo.selectedClassId}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("class data", data?.availseats);
          availseats = parseInt(data?.availseats) - 1;
          totalenrolledstudents = parseInt(data?.totalenrolledstudents) + 1;
          // save payment information to the server
          const payment = {
            paymentInfo: {
              email: user?.email,
              transactionId: paymentIntent.id,
              price,
              date: new Date(),
              classname: classInfo.classname,
              selectedClassesId: classInfo._id,
              paymentSelectClassId: classInfo.selectedClassId,
            },
            classInfo: { ...classInfo },
            classes: {
              availseats: availseats,
              totalenrolledstudents: totalenrolledstudents,
              selectedClassId: classInfo.selectedClassId,
            },
          };
          axiosSecure.post("/payments", payment).then((res) => {
            console.log(res.data);
            if (res.data.result.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment successfully Done",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        });
    }
  };

  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
