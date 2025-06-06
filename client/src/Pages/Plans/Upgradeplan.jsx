import React from 'react';

const plans = [
  { name: 'Free', time: 5, cost: 0 },
  { name: 'Bronze', time: 7, cost: 10 },
  { name: 'Silver', time: 10, cost: 50 },
  { name: 'Gold', time: -1, cost: 100 },
];

const UpgradePlan = () => {
  const handlePurchase = async (plan) => {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    alert(`Purchased ${plan.name} plan. Invoice sent to email.`);
  };

  return (
    <div>
      <h2>Upgrade Plan</h2>
      {plans.map((plan) => (
        <div key={plan.name}>
          <h4>{plan.name} Plan</h4>
          <p>Watch time: {plan.time === -1 ? 'Unlimited' : `${plan.time} mins`}</p>
          <button onClick={() => handlePurchase(plan)}>Buy for ₹{plan.cost}</button>
        </div>
      ))}
    </div>
  );
};

export default UpgradePlan;
