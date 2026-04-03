// src/lib/formatters.ts

export const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getShorthand = (amount: number) => {
  if (amount >= 10000000) return `(${(amount / 10000000).toFixed(2)} Cr)`;
  if (amount >= 100000) return `(${(amount / 100000).toFixed(2)} Lakh)`;
  return "";
};