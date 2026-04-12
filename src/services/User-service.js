import { localAxios, privateAxios } from "./Axios";

export const userSignUp = (user) => {
  const response = localAxios
    .post("register", user)
    .then((response) => response.data);
  return response;
};
export const userLogin = (loginDetails) => {
  return localAxios
    .post("login", loginDetails)
    .then((response) => response.data);
};

export const loginUser = async (userData) => {
  const response = await localAxios.post("/login", userData);
  return response.data;
};

export const userOtpLogin = (loginDetails) => {
  return localAxios
    .post("otp_verify", loginDetails)
    .then((response) => response.data);
};

export const userUpdate = (updateData) => {
  return privateAxios
    .post("profile_update", updateData)
    .then((response) => response.data);
};

export const forgotPassword = (updateData) => {
  return localAxios
    .post("forgotpassword", updateData)
    .then((response) => response.data);
};

export const resetPassword = (updateData) => {
  return privateAxios
    .post("reset_password", updateData)
    .then((response) => response.data);
};
export const changeUserPassword = (updateData) => {
  return privateAxios
    .post("change_password", updateData)
    .then((response) => response.data);
};

export const orderhistory = (userData) => {
  return privateAxios
    .post("order_history", userData)
    .then((response) => response.data);
};

export const addressList = (userData) => {
  return privateAxios
    .post("address_list", userData)
    .then((response) => response.data);
};
export const addaddress = (userData) => {
  return privateAxios
    .post("add_address", userData)
    .then((response) => response.data);
};
export const deleteaddress = (userData) => {
  return privateAxios
    .post("delete_address", userData)
    .then((response) => response.data);
};
export const geteaddress = (userData) => {
  return privateAxios
    .post("get_address", userData)
    .then((response) => response.data);
};
export const addWishList = (userData) => {
  return privateAxios
    .post("add_wishlist", userData)
    .then((response) => response.data);
};
export const getWishList = (userData) => {
  return privateAxios
    .post("get_wishlist", userData)
    .then((response) => response.data);
};
export const removeWishList = (userData) => {
  return privateAxios
    .post("remove_wishlist", userData)
    .then((response) => response.data);
};
export const getallWishList = (userData) => {
  return privateAxios
    .post("get_wishlist_list", userData)
    .then((response) => response.data);
};
export const getTotalDiscount = (userData) => {
  console.log("userDatass", userData);

  return privateAxios
    .post("get_total_discount", userData)
    .then((response) => response.data);
};
export const addCart = (userData) => {
  console.log("userData", userData);
  return privateAxios
    .post("add_cart", userData)
    .then((response) => response.data);
};
export const getAllCart = (userData) => {
  // console.log("user data cart", userData);

  return privateAxios
    .post("get_allcarts", userData)
    .then((response) => response.data);
};
export const getCartCount = (userData) => {
  return privateAxios
    .post("get_cart_wishlist_count", userData)
    .then((response) => response.data);
};
export const removeCart = (userData) => {
  console.log("userData", userData);
  return privateAxios
    .post("remove_cart", userData)
    .then((response) => response.data);
};

export const changeProductSize = (userData) => {
  return privateAxios
    .post("change_product_size", userData)
    .then((response) => response.data);
};
export const addNewsletter = (userData) => {
  return privateAxios
    .post("addnewsletter", userData)
    .then((response) => response.data);
};
