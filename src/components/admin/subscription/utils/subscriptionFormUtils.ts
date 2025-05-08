
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
    "Netflix": 2500,
    "Disney+": 2500,
    "Amazon Prime Video": 2500,
    "Apple TV+": 2500,
    "Paramount+": 2500,
    "Max (ex-HBO Max)": 2500,
    "Spotify": 2500,
    "Apple Music": 2500,
    "Deezer": 2500,
    "Amazon Music": 2500,
    "Xbox Game Pass": 2500,
    "PlayStation Plus": 2500,
    "Nintendo Switch Online": 2500,
    "EA Play": 2500,
    "IPTV Standard": 2500,
    "IPTV Premium": 2500,
    "IPTV Ultra": 2500,
    "Xtreme HD IPTV": 2500,
    "Nexott": 2500,
    "Netfly TV": 2500,
    "ReflexSat": 2500
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
