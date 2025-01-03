// import React, { useState } from 'react';
// import axiosInstance from '../../../axiosInstance';

// const PaymentPage = () => {
//   const [selectedPlan, setSelectedPlan] = useState('monthly'); // Default plan

//   const handlePayment = async () => {
//     try {
//       const { data } = await axiosInstance.post('/payment/create-checkout-session', {
//         plan: selectedPlan, 
//       });
  
//       // Redirect user to the payment URL received from the backend
//       if (data.paymentUrl) {
//         window.location.href = data.paymentUrl; // Redirect to Stripe payment page
//       }
//     } catch (error) {
//       console.error('Error redirecting to payment:', error);
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
//           <p className="text-gray-600 mb-4">₹1 per user one time only / trial (5 days)</p>
          
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
  const [selectedPlan, setSelectedPlan] = useState('monthly'); 

  const paymentLinks = {
    monthly: 'https://buy.stripe.com/test_fZe5nh9hc1uh3h6bIM',
    halfYearly: 'https://buy.stripe.com/test_fZe3f90KGc8V9Fu6op',
    yearly: 'https://buy.stripe.com/test_fZe02Xdxs6OB5pe28a',
  };

  const handlePaymentRedirect = (plan) => {
    if (paymentLinks[plan]) {
      window.location.href = paymentLinks[plan]; 
    } else {
      console.error('Invalid plan or payment link is missing');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-12 text-gray-800">Choose Your Subscription Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div
          onClick={() => setSelectedPlan('monthly')}
          className={`p-8 bg-white rounded-xl shadow-lg cursor-pointer border-2 ${
            selectedPlan === 'monthly' ? 'border-gray-400' : 'border-transparent'
          } hover:shadow-xl hover:border-gray-400 transition-transform duration-300`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Monthly</h2>
          <p className="text-gray-600 mb-6">₹20 per user / monthly </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePaymentRedirect('monthly');
            }}
            className="mt-6 bg-gray-800 text-white py-3 px-6 rounded-lg shadow hover:bg-gray-700 transition"
          >
            Buy Now
          </button>
        </div>


        <div
          onClick={() => setSelectedPlan('halfYearly')}
          className={`p-8 bg-white rounded-xl shadow-lg cursor-pointer border-2 ${
            selectedPlan === 'halfYearly' ? 'border-gray-400' : 'border-transparent'
          } hover:shadow-xl hover:border-gray-400 transition-transform duration-300`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Half-Yearly</h2>
          <p className="text-gray-600 mb-6">₹49 per user / 6 months</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePaymentRedirect('halfYearly');
            }}
            className="mt-6 bg-gray-800 text-white py-3 px-6 rounded-lg shadow hover:bg-gray-700 transition"
          >
            Buy Now
          </button>
        </div>

        <div
          onClick={() => setSelectedPlan('yearly')}
          className={`p-8 bg-white rounded-xl shadow-lg cursor-pointer border-2 ${
            selectedPlan === 'yearly' ? 'border-gray-400' : 'border-transparent'
          } hover:shadow-xl hover:border-gray-400 transition-transform duration-300`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Yearly</h2>
          <p className="text-gray-600 mb-6">₹149 per user / year</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePaymentRedirect('yearly');
            }}
            className="mt-6 bg-gray-800 text-white py-3 px-6 rounded-lg shadow hover:bg-gray-700 transition"
          >
            Buy Now
          </button>
        </div>
      </div>

      <p className="mt-16 text-gray-600 text-lg">
        Already purchased? Contact support for activation or issues.
      </p>
    </div>
  );
};

export default PaymentPage;
