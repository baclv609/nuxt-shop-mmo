// composables/useCurrency.js
export const useCurrency = () => {
  return (amount = 0, locale = "vi-VN", currency = "VND") => {
    const number = Number(amount);
    if (isNaN(number)) return "0 ₫"; // fallback nếu không phải số
    return number.toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
};
