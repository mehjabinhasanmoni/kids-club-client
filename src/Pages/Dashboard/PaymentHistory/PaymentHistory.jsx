import React from 'react';
import usePaymentHistory from '../../../hooks/usePaymentHistory';

const PaymentHistory = () => {
    const [paymentshistory] = usePaymentHistory();
    return (
        <>
        <h2 className="text-center text-3xl tracking-wider mt-10">
          Payment History
        </h2>
  
        <div className="overflow-x-auto mt-20 p-10">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Class Name</th>
                <th>Price</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {paymentshistory.map((pHistory, index) => (
                <tr key={pHistory._id}>
                  <th> {index + 1}</th>
                  <td>{pHistory.date}</td>
                  <td>{pHistory.classname}</td>
                  <td>{pHistory.price}</td>
                  <td>{pHistory.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
};

export default PaymentHistory;