export const api_base_url = process.env.REACT_APP_BASE_URL;

export const getApiUrl = (endpoint) => {
    return `${process.env.REACT_APP_BASE_URL}${endpoint}`;
};