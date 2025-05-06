
import { format } from "date-fns";

// Calculate the end date based on start date and duration
export const calculateEndDate = (startDate: Date, durationMonths: string) => {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + parseInt(durationMonths));
  return endDate;
};

// Get default price based on service type
export const getServicePrice = (serviceType: string) => {
  const prices: {[key: string]: number} = {
    "Netflix": 3500,
    "Disney+": 2500,
    "Amazon Prime Video": 2000,
    "Canal+": 5000,
    "Spotify": 1500,
    "Apple Music": 1500,
    "Xbox Game Pass": 4000,
    "PlayStation Plus": 4500,
    "IPTV Standard": 5000,
    "IPTV Premium": 7500,
    "IPTV Ultra": 10000
  };
  return prices[serviceType] || 2500;
};

// Calculate price with discounts based on duration
export const calculateTotalPrice = (serviceType: string, durationMonths: string) => {
  const basePrice = getServicePrice(serviceType);
  let discount = 0;
  
  switch (durationMonths) {
    case "3": discount = 0.05; break; // 5% discount
    case "6": discount = 0.10; break; // 10% discount
    case "12": discount = 0.20; break; // 20% discount
    default: discount = 0; break;
  }
  
  return Math.round(basePrice * parseInt(durationMonths) * (1 - discount));
};
