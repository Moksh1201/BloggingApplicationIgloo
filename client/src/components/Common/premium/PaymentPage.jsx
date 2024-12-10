// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import axiosInstance from '../../../axiosInstance';

// const stripePromise = loadStripe('pk_test_51O2ZkNSCIg3CTOdnyBPcG5RHKK3RvzuCK6QMR1uMNbuiO18ZeaP1DiXfJ0Qty4vds25OknNjrX94yqWsOjb7RQiq00vDSKE1KF'); 

// const PaymentPage = () => {
//   const [selectedPlan, setSelectedPlan] = useState('monthly'); 

//   const handlePayment = async () => {
//     const stripe = await stripePromise;

//     try {
//       const { data } = await axiosInstance.post('/create-checkout-session', {
//         plan: selectedPlan, 
//       });

//       // Redirect to Stripe Checkout
//       await stripe.redirectToCheckout({ sessionId: data.id });
//     } catch (error) {
//       console.error('Error redirecting to checkout:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">Choose Your Subscription Plan</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Monthly Plan */}
//         <div
//           onClick={() => setSelectedPlan('monthly')}
//           className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 ${
//             selectedPlan === 'monthly' ? 'border-blue-500' : 'border-transparent'
//           } hover:shadow-xl transition`}
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trial</h2>
//           <p className="text-gray-600 mb-4">₹1 trial</p>
//           <ul className="text-gray-600 space-y-2">
//             <li>Opportunity Tracking</li>
//             <li>Team Collaboration</li>
//             <li>Advanced Search</li>
//           </ul>
//         </div>

//         {/* Half-Yearly Plan */}
//         <div
//           onClick={() => setSelectedPlan('halfYearly')}
//           className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 ${
//             selectedPlan === 'halfYearly' ? 'border-blue-500' : 'border-transparent'
//           } hover:shadow-xl transition`}
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Half-Yearly</h2>
//           <p className="text-gray-600 mb-4">₹49 per user / 6 months</p>
//           <ul className="text-gray-600 space-y-2">
//             <li>All Historical Data</li>
//             <li>Premium Customer Support</li>
//             <li>Unlimited Data Exports</li>
//           </ul>
//         </div>

//         {/* Yearly Plan */}
//         <div
//           onClick={() => setSelectedPlan('yearly')}
//           className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 ${
//             selectedPlan === 'yearly' ? 'border-blue-500' : 'border-transparent'
//           } hover:shadow-xl transition`}
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Yearly</h2>
//           <p className="text-gray-600 mb-4">₹149 per user / year</p>
//           <ul className="text-gray-600 space-y-2">
//             <li>Market Research</li>
//             <li>All Premium Data Points</li>
//             <li>Unlimited Crew Members</li>
//           </ul>
//         </div>
//       </div>

//       <button
//         onClick={handlePayment}
//         className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg shadow hover:bg-blue-600 transition"
//       >
//         Subscribe Now
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // Default plan

  const handlePayment = async () => {
    try {
      const { data } = await axiosInstance.post('/payment/create-checkout-session', {
        plan: selectedPlan, 
      });
  
      // Redirect user to the payment URL received from the backend
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl; // Redirect to Stripe payment page
      }
    } catch (error) {
      console.error('Error redirecting to payment:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Choose Your Subscription Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Monthly Plan */}
        <div
          onClick={() => setSelectedPlan('monthly')}
          className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 ${
            selectedPlan === 'monthly' ? 'border-blue-500' : 'border-transparent'
          } hover:shadow-xl transition`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trial</h2>
          <p className="text-gray-600 mb-4">₹1 per user one time only / trial (5 days)</p>
          
        </div>

        {/* Half-Yearly Plan */}
        <div
          onClick={() => setSelectedPlan('halfYearly')}
          className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 ${
            selectedPlan === 'halfYearly' ? 'border-blue-500' : 'border-transparent'
          } hover:shadow-xl transition`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Half-Yearly</h2>
          <p className="text-gray-600 mb-4">₹49 per user / 6 months</p>
         
        </div>

        {/* Yearly Plan */}
        <div
          onClick={() => setSelectedPlan('yearly')}
          className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 ${
            selectedPlan === 'yearly' ? 'border-blue-500' : 'border-transparent'
          } hover:shadow-xl transition`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Yearly</h2>
          <p className="text-gray-600 mb-4">₹149 per user / year</p>
        
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="mt-8 bg-blue-500 text-white py-3 px-8 rounded-lg shadow hover:bg-blue-600 transition"
      >
        Subscribe Now
      </button>
    </div>
  );
};

export default PaymentPage;
