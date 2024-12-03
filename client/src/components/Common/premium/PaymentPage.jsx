import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../../../axiosInstance';

const stripePromise = loadStripe('your-publishable-key'); 

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly'); 

  const handlePayment = async () => {
    const stripe = await stripePromise;

    try {
      const { data } = await axiosInstance.post('/api/create-checkout-session', {
        plan: selectedPlan, // Send selected plan to backend
      });

      // Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly</h2>
          <p className="text-gray-600 mb-4">$40 per user / month</p>
          <ul className="text-gray-600 space-y-2">
            <li>Opportunity Tracking</li>
            <li>Team Collaboration</li>
            <li>Advanced Search</li>
          </ul>
        </div>

        {/* Half-Yearly Plan */}
        <div
          onClick={() => setSelectedPlan('halfYearly')}
          className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 ${
            selectedPlan === 'halfYearly' ? 'border-blue-500' : 'border-transparent'
          } hover:shadow-xl transition`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Half-Yearly</h2>
          <p className="text-gray-600 mb-4">$200 per user / 6 months</p>
          <ul className="text-gray-600 space-y-2">
            <li>All Historical Data</li>
            <li>Premium Customer Support</li>
            <li>Unlimited Data Exports</li>
          </ul>
        </div>

        {/* Yearly Plan */}
        <div
          onClick={() => setSelectedPlan('yearly')}
          className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 ${
            selectedPlan === 'yearly' ? 'border-blue-500' : 'border-transparent'
          } hover:shadow-xl transition`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Yearly</h2>
          <p className="text-gray-600 mb-4">$360 per user / year</p>
          <ul className="text-gray-600 space-y-2">
            <li>Market Research</li>
            <li>All Premium Data Points</li>
            <li>Unlimited Crew Members</li>
          </ul>
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
