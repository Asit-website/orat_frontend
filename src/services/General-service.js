import { localAxios } from "./Axios";

export const bannerList = () => {
    return  localAxios.post('/banner_list').then((response) => response.data);
}
export const bottomsubbannerList = () => {
    return  localAxios.post('/bottom_subbanner_list').then((response) => response.data);
}
export const topsubbannerList = () => {
    return  localAxios.post('/top_subbanner_list').then((response) => response.data);
}
export const lastchanceList = (data) => {
    return  localAxios.post('/home_last_chance_list',data).then((response) => response.data);
}
export const categoryList = (data=null) => {
    return  localAxios.post('/category_list',data).then((response) => response.data);
}
export const celebMustHave = (data=null) => {
    return  localAxios.post('/home_celeb_musthave_list',data).then((response) => response.data);
}

export const designerList = (data) => {
    return  localAxios.post('/designer_list',data).then((response) => response.data);
}

export const menuList = (data) => {
    // If data is an object, use it as params, otherwise use as is
    const params = data && typeof data === 'object' ? data : {};
    return localAxios.get('/menu_list', { params }).then((response) => response.data);
}

export const homeshowhideList = (data) => {
    return localAxios.get('/home_showhide_list', { params: data }).then((response) => response.data);
}
export const countryList = (data) => {
    return  localAxios.get('/country_list',data).then((response) => response.data);
}
export const stateList = (data) => {
    return  localAxios.get('/state_list',data).then((response) => response.data);
}
export const blogsList = (data) => {
    return  localAxios.post('/blog_list',data).then((response) => response.data);
}
export const blogDetailsd = (data) => {
    return  localAxios.post('/blog_details',data).then((response) => response.data);
}