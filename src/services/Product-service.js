import { localAxios } from "./Axios";

export const homeProducts = async (data) => {
  const response = await localAxios
    .get("home_products", data)
    .then((response) => response.data);
  return response;
};

export const products_list = async (params) => {
  try {
    const response = await localAxios.get("/products", { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const productColor = (data) => {
  return localAxios
    .post("/product-color", data)
    .then((response) => response.data);
};

export const productSize = (data) => {
  return localAxios
    .post("/product-size", data)
    .then((response) => response.data);
};

export const occassionList = (data) => {
  return localAxios
    .post("/occassion_list", data)
    .then((response) => response.data);
};

export const productDetails = (id) => {
  return localAxios
    .get(`/single-product/${id}`)
    .then((response) => response.data);
};

export const recentproductList = async (params) => {
  
  
  try {
    const response = await localAxios.post("/home_recent_products", { params });
    console.log("home recent products", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const homeweddingtaleList = (data) => {
  return localAxios
    .post("/home_wedding_tale", data)
    .then((response) => response.data);
};
export const homedesignerdiscountList = (data) => {
  return localAxios
    .post("/home_designer_discount", data)
    .then((response) => response.data);
};
export const homedesignerhighlightList = (data) => {
  return localAxios
    .post("/home_highlight_designer", data)
    .then((response) => response.data);
};
export const homedesignersareeList = (data) => {
  return localAxios
    .post("/home_designer_saree", data)
    .then((response) => response.data);
};
export const homeeidpicksList = (data) => {
  return localAxios
    .post("/home_eid_picks", data)
    .then((response) => response.data);
};
export const homehandpicksList = (data) => {
  return localAxios
    .post("/home_handpicked_designer", data)
    .then((response) => response.data);
};
export const giftaidList = (data) => {
  return localAxios
    .get("/giftcards_list", data)
    .then((response) => response.data);
};
export const giftDetails = (id) => {
  return localAxios.get(`/giftdetails/${id}`).then((response) => response.data);
};
export const placeorder = (data) => {
  return localAxios
    .post("/place_order", data)
    .then((response) => response.data);
};
export const searchDetails = (data) => {
  return localAxios
    .post("/search_products", data)
    .then((response) => response.data);
};
export const addCustomTailored = (data) => {
  return localAxios
    .post("/add_custom_tailored", data)
    .then((response) => response.data);
};
export const addDontKnowCustomTailored = (data) => {
  return localAxios
    .post("/add_custom_tailored_dontknow", data)
    .then((response) => response.data);
};
export const addBookAppointment = (data) => {
  return localAxios
    .post("/add_query_management", data)
    .then((response) => response.data);
};

export const getBookAppointmentImage = () => {
  return localAxios
    .get("/book_appointment_image")
    .then((response) => response.data);
};

export const getProductPageBanner = () => {
  return localAxios
    .get("/product-page-banner")
    .then((response) => response.data);
};
export const getReadyToShipProducts = (data) => {
  return localAxios
    .post("/readytoship_products", data)
    .then((response) => response.data);
};
export const getProductColorImage = (data) => {
  return localAxios
    .post("/get_productcolor_images", data)
    .then((response) => response.data);
};

export const best_seller = () => {
  return localAxios.get("/best-sellers").then((response) => response.data);
};

export const getBestSellerBanner = () => {
  return localAxios
    .get("/best-seller-banner")
    .then((response) => response.data);
};

export const getEditList = () => {
  return localAxios
    .get("/edit_list")
    .then((response) => response.data);
};
