export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(amount);
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-MY", options);
};

export const getCategoryIcon = (category) => {
  const icons = {
    Food: "🍔",
    Transport: "🚗",
    Utilities: "💡",
    Entertainment: "🎬",
  };
  return icons[category] || "✨";
};
