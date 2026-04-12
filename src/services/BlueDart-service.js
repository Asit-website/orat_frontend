import { localAxios } from "./Axios";

// Blue Dart API Configuration
const BLUE_DART_CONFIG = {
  loginId: "HOW22810",
  customerName: "JMD TEXTILES:COD-PREP",
  licenseKey: "hgrgrjqsiuiv0i0mfri9gnrnkhtgvnmj",
  version: "1.3",
  originPincode: "700001", // Default origin pincode (Kolkata - as mentioned in shipping policy)
};

/**
 * Calculate shipping time and expected delivery date using Blue Dart API
 * @param {string} destinationPincode - Destination pincode
 * @param {number} weight - Weight in kg (default: 0.5kg)
 * @returns {Promise} Shipping time and expected delivery date
 */
export const getBlueDartShippingInfo = async (destinationPincode, weight = 0.5) => {
  try {
    const requestData = {
      login_id: BLUE_DART_CONFIG.loginId,
      customer_name: BLUE_DART_CONFIG.customerName,
      license_key: BLUE_DART_CONFIG.licenseKey,
      version: BLUE_DART_CONFIG.version,
      origin_pincode: BLUE_DART_CONFIG.originPincode,
      destination_pincode: destinationPincode,
      weight: weight,
    };

    // Call backend API endpoint for Blue Dart
    const response = await localAxios.post("/bluedart/shipping-info", requestData);
    
    if (response.data && response.data.success) {
      return {
        success: true,
        shippingTime: response.data.shipping_time || "3-5 working days",
        expectedDeliveryDate: response.data.expected_delivery_date || null,
        transitTime: response.data.transit_time || null,
        serviceType: response.data.service_type || "Standard",
      };
    } else {
      // Fallback calculation if API fails
      return calculateFallbackShipping(destinationPincode);
    }
  } catch (error) {
    console.error("Blue Dart API Error:", error);
    // Return fallback calculation on error
    return calculateFallbackShipping(destinationPincode);
  }
};

/**
 * Fallback calculation for shipping time when API is unavailable
 * @param {string} destinationPincode - Destination pincode
 * @returns {Object} Shipping information
 */
const calculateFallbackShipping = (destinationPincode) => {
  // Calculate expected delivery date (3-5 working days from today)
  const today = new Date();
  const shippingDays = 3; // Minimum shipping days
  const maxShippingDays = 5; // Maximum shipping days
  
  // Add working days (excluding weekends)
  const addWorkingDays = (date, days) => {
    let result = new Date(date);
    let addedDays = 0;
    while (addedDays < days) {
      result.setDate(result.getDate() + 1);
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        addedDays++;
      }
    }
    return result;
  };

  const minDeliveryDate = addWorkingDays(today, shippingDays);
  const maxDeliveryDate = addWorkingDays(today, maxShippingDays);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    // Add ordinal suffix
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    return `${getOrdinal(day)} of ${month}`;
  };

  return {
    success: true,
    shippingTime: "3-5 working days",
    expectedDeliveryDate: formatDate(minDeliveryDate),
    expectedDeliveryDateRange: `${formatDate(minDeliveryDate)} - ${formatDate(maxDeliveryDate)}`,
    transitTime: "3-5 working days",
    serviceType: "Standard",
    isFallback: true,
  };
};

/**
 * Get shipping information for checkout/address page
 * @param {string} zipcode - Destination zipcode/pincode
 * @param {number} weight - Total weight in kg
 * @returns {Promise} Shipping information
 */
export const getShippingTimeAndDeliveryDate = async (zipcode, weight = 0.5) => {
  if (!zipcode || zipcode.length < 6) {
    return {
      success: false,
      message: "Please enter a valid pincode",
    };
  }

  return await getBlueDartShippingInfo(zipcode, weight);
};

